import "@babel/polyfill";
import dotenv from "dotenv";
import fetch from "node-fetch";
import sanityClient from "@sanity/client";

const BATCH_SIZE = 250;

dotenv.config();

const client = sanityClient({
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: false, // We can't use the CDN for writing
});

const flatten = (arr) => {
  if (arr) {
    arr = arr.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
    return arr.filter(
      (item, index, self) =>
        index ===
        self.findIndex((a) => {
          if (item !== undefined && a !== undefined) {
            return a._id === item._id;
          }
        })
    );
  }
};

const transform = ([creators, tags, citations], externalCitation, idx) => {
  console.log(`Found citation ${externalCitation.key}`);

  if (externalCitation.data.itemType != "attachment") {
    if (externalCitation.data.creators) {
      externalCitation.data.creators.map((creator, index) => {
        const date = new Date();
        const now = date.getMilliseconds().toString();
        if (!creator.firstName || !creator.lastName) {
          console.warn(
            `Skipping creator with invalid name: ${creator.firstName} ${creator.lastName}`
          );
          return;
        }
        const item = {
          _type: "creator",
          _id: `creator-${creator.lastName.replace(
            /[^A-Z0-9]/gi,
            "-"
          )}-${creator.firstName.replace(/[^A-Z0-9]/gi, "-")}`,
          _key: `creator-${now}-${idx}-${index}`,
          firstName: creator.firstName,
          lastName: creator.lastName,
          creatorType: creator.creatorType,
        };
        return creators.push(item);
      });
    }

    if (externalCitation.data.tags) {
      externalCitation.data.tags.map((tag, index) => {
        if (tag.tag) {
          const date = new Date();
          const now = date.getMilliseconds().toString();
          const item = {
            _type: "topic",
            _id: tag.tag.replace(/[^A-Z0-9]/gi, "-"),
            _key: `topic-${now}-${idx}-${index}`,
            name: tag.tag,
          };
          return tags.push(item);
        }
      });
    }

    citations.push({
      _id: externalCitation.key,
      _type: "citation",
      shortTitle: externalCitation.data.shortTitle,
      title: externalCitation.data.title,
      date: externalCitation.meta.parsedDate,
      creators: creators.map((i, idx) => ({
        _type: "reference",
        _ref: i._id,
        _key: `ref-creator-${idx}`,
      })),
      topics: tags.map((i, idx) => ({
        _type: "reference",
        _ref: i._id,
        _key: `ref-topic-${idx}`,
      })),
      url: externalCitation.data.url,
      websiteTitle: externalCitation.data.websiteTitle,
      institution: externalCitation.data.institution,
      publicationTitle: externalCitation.data.publicationTitle,
      place: externalCitation.data.place,
      publisher: externalCitation.data.publisher,
      blogTitle: externalCitation.data.blogTitle,
      network: externalCitation.data.network,
      chicagoCitation: externalCitation.citation,
    });
  }
  return [creators, tags, citations, raw];
};

async function fetchBackoff(url, options) {
  const response = await fetch(url, options);
  if (response.headers.has("backoff")) {
    const backoff = response.headers.get("backoff");
    console.log(`Rate-limited: pausing for ${backoff} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, backoff));
    return fetchBackoff(url, options);
  } else if (response.status === 429 && response.headers.has("retry-after")) {
    const retryAfter = response.headers.get("retry-after");
    console.log(`System overloaded: retrying in ${retryAfter} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, retryAfter));
    return fetchBackoff(url, options);
  }
  return response;
}

function zoteroUrl(start, limit) {
  return `https://api.zotero.org/groups/${process.env.ZOTERO_GROUP_ID}/items?format=json&include=data,citation&style=chicago-fullnote-bibliography&limit=${limit}&start=${start}`;
}

const commit = async (documents, type) => {
  if (documents.length > 0) {
    const dedup = new Map();
    documents.forEach((document) => {
      dedup.set(document._id, document);
    });
    const deduped = Array.from(dedup.values());
    console.log(`Deduplicated down to ${deduped.length} ${type} records.`);
    let processed = 0;
    do {
      const batch = deduped.slice(processed, processed + BATCH_SIZE - 1);
      const transaction = client.transaction();
      batch.forEach((document) => {
        transaction.createIfNotExists(document).patch(document._id, (p) => {
          p.set(document);
          return p;
        });
      });
      console.log(
        `Committing batch ${processed + 1} through ${
          processed + batch.length
        } of ${deduped.length} total ${type}...`
      );
      await transaction.commit();
      processed += batch.length;
    } while (processed < deduped.length);
  }
};

async function fetchAllCitations() {
  let finished = false;
  let creators = [];
  let tags = [];
  let citations = [];
  let start = 0;
  let limit = 25;

  console.log("Fetching citations...");
  while (!finished) {
    await fetchBackoff(zoteroUrl(start, limit), {
      headers: {
        "Zotero-API-Version": process.env.ZOTERO_API_VERSION,
        "Zotero-API-Key": process.env.ZOTERO_API_KEY,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(
          `HTTP Error ${response.status}: ${response.statusText}`
        );
      })
      .then((results) => {
        console.log(`Parsing batch starting at ${start}...`);
        start += results.length;
        if (results.length < limit) finished = true;
        return results.reduce(transform, [[], [], []]);
      })
      .then(([cr, ta, ci]) => {
        // docs is now an array of [creators, tags, citation], so we need to flatten it
        creators = creators.concat(flatten(cr));
        tags = tags.concat(flatten(ta));
        citations = citations.concat(flatten(ci));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  console.log(`Fetched ${creators.length} creators.`);
  console.log(`Fetched ${tags.length} tags.`);
  console.log(`Fetched ${citations.length} citations.`);

  try {
    await commit(creators, "creators");
    await commit(tags, "tags");
    await commit(citations, "citations");
  } catch (error) {
    console.error(error.name + ": " + error.message);
  }
}

fetchAllCitations();
