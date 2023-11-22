/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page [...slug].js getStaticProps, /");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/"]{_id, _type, _createdAt, title, sections[]{type, alsoFeatured[]->{title, author, category, date, type, slug, stackbit_model_type}, featuredArticle->{title, author, featuredImage, category, date, type, slug, stackbit_model_type}}}`
  );
  return {
    props: { path: "/", page, data: { config, topics } },
    revalidate: 60,
  };
}

export default advanced;
