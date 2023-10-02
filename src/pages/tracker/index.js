/* eslint-disable */
import React from "react";
import client from "../../utils/sanityClient";

import { advanced } from "../../layouts";

export async function getStaticProps() {
  console.log("Page tracker/index.js getStaticProps, /");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/tracker"]{_id, _createdAt, title, heroContent, sections[type == "section_tracker"]{type}}`,
  );
  return {
    props: { path: "/tracker", page, data: { config, topics } },
    revalidate: 60,
  };
}

export default advanced;
