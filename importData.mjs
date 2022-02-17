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

const transform = ([creators, tags, citations], externalCitation, idx) => {
  console.log(`Found citation ${externalCitation.key}`);

  if (externalCitation.data.itemType != "attachment") {
    if (externalCitation.data.creators) {
      externalCitation.data.creators.forEach((creator, index) => {
        const date = new Date();
        const now = date.getMilliseconds().toString();
        if (!creator.firstName || !creator.lastName) {
          console.warn(
            `Skipping creator with invalid name: ${creator.firstName} ${creator.lastName}`
          );
          return;
        }
        const id = `creator-${creator.lastName.replace(
          /[^A-Z0-9]/gi,
          "-"
        )}-${creator.firstName.replace(/[^A-Z0-9]/gi, "-")}`;
        const item = creators.get(id) || {
          _type: "creator",
          _id: id,
          _key: `creator-${now}-${idx}-${index}`,
          firstName: creator.firstName,
          lastName: creator.lastName,
          creatorType: creator.creatorType,
          relatedCitations: [],
        };
        item.relatedCitations.push({
          _type: "reference",
          _ref: externalCitation.key,
          _key: `ref-citation-${now}-${idx}-${index}`,
          _weak: true,
        });
        return creators.set(id, item);
      });
    }

    if (externalCitation.data.tags) {
      externalCitation.data.tags.forEach((tag, index) => {
        if (tag.tag) {
          const date = new Date();
          const now = date.getMilliseconds().toString();
          const id = tag.tag.replace(/[^A-Z0-9]/gi, "-");
          const item = tags.get(id) || {
            _type: "topic",
            _id: id,
            _key: `topic-${now}-${idx}-${index}`,
            name: tag.tag,
            relatedCitations: [],
          };
          item.relatedCitations.push({
            _type: "reference",
            _ref: externalCitation.key,
            _key: `ref-citation-${now}-${idx}-${index}`,
            _weak: true,
          });
          return tags.set(id, item);
        }
      });
    }

    citations.set(externalCitation.key, {
      _id: externalCitation.key,
      _type: "citation",
      shortTitle: externalCitation.data.shortTitle,
      title: externalCitation.data.title,
      date: externalCitation.meta.parsedDate,
      creators: Array.from(creators.values()).forEach((i, idx) => ({
        _type: "reference",
        _ref: i._id,
        _key: `ref-creator-${idx}`,
      })),
      topics: Array.from(tags.values()).forEach((i, idx) => ({
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
  return [creators, tags, citations];
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
  if (documents.size > 0) {
    let processed = 0;
    const deduped = Array.from(documents.values());
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
  let creators = new Map();
  let tags = new Map();
  let citations = new Map();
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
        return results.reduce(transform, [creators, tags, citations]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  console.log(`Fetched ${creators.size} creators.`);
  console.log(`Fetched ${tags.size} tags.`);
  console.log(`Fetched ${citations.size} citations.`);

  try {
    await commit(creators, "creators");
    await commit(tags, "tags");
    await commit(citations, "citations");
  } catch (error) {
    console.error(error.name + ": " + error.message);
  }
}

fetchAllCitations();
