import { createClient } from "next-sanity";

/* eslint-disable no-undef */
const client = createClient({
  projectId: process.env.sanityProjectId,
  dataset: process.env.sanityDataset || "production",
  apiVersion: process.env.sanityApiVersion || "2023-05-03",
  token: process.env.sanityAccessToken,
  useCdn: false,
});
/* eslint-enable no-undef */

export default client;
