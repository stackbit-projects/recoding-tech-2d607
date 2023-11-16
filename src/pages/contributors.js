/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page contributors.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/contributors"]{_id, _type, _createdAt, title, stackbit_url_path, sections[type == "section_contributors"]{type, stackbit_model_type, section_id}}`
  );

  const authorsQuery = `*[_type == "author" && !(_id in path("drafts.**")) ]{name, slug, email, bio, socialMedia, photo, "relatedPostTopics": *[_type=='post' && references(^._id)]{ _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }}|order(lastUpdate desc)`;

  const authors = await client.fetch(authorsQuery);

  return {
    props: { path: "/contributors", page, authors, data: { config, topics } },
    revalidate: 60,
  };
}

export default advanced;
