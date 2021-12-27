import sanityClient from "@sanity/client";

/* eslint-disable no-undef */
const client = sanityClient({
  projectId: process.env.sanityProjectId,
  dataset: process.env.sanityDataset || "production",
  apiVersion: process.env.sanityApiVersion || "2021-03-25",
  token: process.env.sanityAccessToken,
  useCdn: false,
});
/* eslint-enable no-undef */

export default client;
