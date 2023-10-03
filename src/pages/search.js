/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page search.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const pageQuery =
    `*[_type == "advanced" && stackbit_url_path == "/search"]{_id, _createdAt, title, stackbit_url_path, sections[type == "section_search"]{type}}[0]`;

  const articlesQuery =
    `*[!(_id in path("drafts.**")) && _type == "post"]{ title, date, slug, 'key': slug } | order(date desc)`;

  const topicsQuery =
    '*[!(_id in path("drafts.**")) && _type == "topic" && stackbit_model_type == "page"]{ slug, name, displayName, _id }';

  const { page, articles, topics } = await client.fetch(`{
    "page": ${pageQuery},
    "articles": ${articlesQuery},
    "topics": ${topicsQuery},
  }`);

  return {
    props: {
      page,
      articles,
      path: "/search",
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default advanced;
