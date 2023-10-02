/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page newsletter.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/newsletter"]{_id, _createdAt, title, stackbit_url_path, sections[type == "section_sign_up"]{type, section_id}}`
  );
  return {
    props: { path: "/newsletter", page, data: { config, topics } },
    revalidate: 60,
  };
}

export default advanced;
