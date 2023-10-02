/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

/**
 * In next.js we can't use `src/pages/[...slug].js` for root site page `/`.
 * Instead, we import and export the [...slug].js while overriding its getStaticProps.
 */

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page [...slug].js getStaticProps, /");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/"]{_id, _createdAt, title, sections[]{type, alsoFeatured[]->{title, author, category, date, type, slug, stackbit_model_type}, featuredArticle->{title, author, featuredImage, category, date, type, slug, stackbit_model_type}}}`,
  );
  return { props: { path: "/", page, data: { config, topics } } };
}

export default advanced;
