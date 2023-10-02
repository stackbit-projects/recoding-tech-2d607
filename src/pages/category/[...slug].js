/* eslint-disable */
import React from "react";
import client from "../../utils/sanityClient";

import { topic } from "../../layouts";

export async function getStaticPaths() {
  console.log("Page category/[...slug].js getStaticPaths");
  const slugs = await client.fetch(`*[_type == "topic"]{ slug }`);
  const paths = slugs.map((path) => ({
    params: { slug: [path.slug.current] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join();
  console.log("Page category/[...slug].js getStaticProps, slug: ", slug);
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "topic" && slug.current == "${slug}"]{_id, _createdAt, _updatedAt, _type, slug, name, displayName, description, domain, stackbit_model_type}`,
  );
  const policyActionsQuery =
    `*[_type == "policy_action" && references("${page._id}") && !(_id match "drafts")]{category, country, dateInitiated, img_alt, img_path, lastUpdate, slug, status, title, relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)`;
  const relatedPostsQuery =
    `*[_type == "post" && references("${page._id}") && !(_id match "drafts")]{_id, slug, authors[]->{name}, date, ref, title }|order(date desc)[0...21]`;

  const actions = await client.fetch(policyActionsQuery);
  const headlines = await client.fetch(relatedPostsQuery);

  return {
    props: {
      page,
      headlines,
      actions,
      path: `/tracker/${page.slug.current ? page.slug.current : page.slug}`,
      data: { config, topics },
    },
  };
}

export default topic;
