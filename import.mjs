import dotenv from 'dotenv'
import fetch from 'node-fetch';
import sanityClient from '@sanity/client';

dotenv.config();

const client = sanityClient({
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: false, // We can't use the CDN for writing
});

const URL = `https://api.zotero.org/groups/${process.env.ZOTERO_GROUP_ID}/items?format=json&include=data&limit=50`;

async function fetchData(url = '') {
  const response = await fetch(url, {
    headers: {
      'Zotero-API-Version': process.env.ZOTERO_API_VERSION,
      'Zotero-API-Key': process.env.ZOTERO_API_KEY,
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

fetchData(URL)
  .then(citations => citations.map(transform))
  .then(pairs =>
  	// pairs is now an array of [tag, cat], so we need to flatten it
  	flatten(pairs)
  )
  .then(documents => {
    // now we have all our documents and are ready to save them to our dataset
    let transaction = client.transaction()
    documents.forEach(document => {
      transaction.createOrReplace(document)
    });

    return transaction.commit();
  });

const flatten = arr => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};

const transform = externalCitation => {
  let tags = [];
  const date = new Date();
  const today = date.getDate();

  externalCitation.data.tags.map((tag, index) => {
    const item = {
      _type: 'topic',
      _id: `tag-${today}-${tag.index}`,
      name: tag.tag,
    };
    tags.push(item);
  });
  const citation =  {
	  _id: externalCitation.key,
	  _type: 'citation',
    shortTitle: externalCitation.data.shortTitle,
    title: externalCitation.data.title,
    date: externalCitation.data.accessDate,
    creators: externalCitation.data.creators,
    // tags: {_type: 'reference', _ref: tags},
	};
	return [tags, citation];
};
