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

let creators = [];
let tags = [];

const transform = externalCitation => {
  externalCitation.data.creators.map((creator, index) => {
    const date = new Date()
    const now = date.getMilliseconds().toString();
    const item = {
      _type: 'creator',
      _id: `creator-${now}-${index}`,
      _key: `creator-${now}-${index}`,
      firstName: creator.firstName,
      lastName: creator.lastName,
      creatorType: creator.creatorType,
    };
    creators.push(item);
  });

  externalCitation.data.tags.map((tag, index) => {
    const date = new Date();
    const now = date.getMilliseconds().toString();
    const item = {
      _type: 'topic',
      _id: `tag-${now}-${index}`,
      _key: `tag-${now}-${index}`,
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
    creators: creators,
    tags: tags,
    websiteTitle: externalCitation.data.websiteTitle,
    institution: externalCitation.data.institution,
    publicationTitle: externalCitation.data.publicationTitle,
    place: externalCitation.data.place,
    publisher: externalCitation.data.publisher,
    blogTitle: externalCitation.data.blogTitle,
    network: externalCitation.data.network,
	};
	return [creators, tags, citation];
};

// chicago full note 17th edition
