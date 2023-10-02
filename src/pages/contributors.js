/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page contributors.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/contributors"]{_id, _createdAt, title, stackbit_url_path, sections[type == "section_contributors"]{type, stackbit_model_type, section_id}}`,
  );
  return {
    props: { path: "/contributors", page, data: { config, topics } },
    revalidate: 60,
  };
}

export default advanced;
