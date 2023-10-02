/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

/**
 * In next.js we can't use `src/pages/[...slug].js` for root site page `/`.
 * Instead, we import and export the [...slug].js while overriding its getStaticProps.
 */

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page library.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/library"]{_id, _createdAt, title, stackbit_url_path, sections[type == "section_library"]{type}}`,
  );
  return { props: { path: "/library", page, data: { config, topics } } };
}

export default advanced;
