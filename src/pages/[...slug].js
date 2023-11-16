/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { meta } from "../layouts";

export async function getStaticPaths() {
  console.log("Page [...slug].js getStaticPaths");
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const slugs = await client.fetch(`*[_type == "post"]{ slug }`);
  const paths = slugs.map((path) => ({
    params: { slug: [path.slug.current] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("Page /[...slug].js getStaticProps, slug: ", params);
  const slug = params.slug.join();
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page"]{ displayName, link, slug, type }`,
  );
  
  let [page] = await client.fetch(
    `*[_type == "post" && slug.current == "${slug}"]{_id, _createdAt, date, slug, title, body, toc, seo, authors[]->{slug, name, photo, bio}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`,
  );
  let path = `/${page.slug.current ? page.slug.current : page.slug}`;

  if (!page) {
    [page] = await client.fetch(
      `*[_type == "page" && stackbit_url_path == "${slug}"]{_id, _createdAt, date, slug, title, body, toc, seo, authors[]->{slug, name, photo, bio}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`,
    );
    path = `/${page.stackbit_url_path ? page.stackbit_url_path : null}`;
  }
  if (!advanced) {
    [page] = await client.fetch(
      `*[_type == "advanced" && stackbit_url_path == "${slug}"]{_id, _createdAt, date, slug, title, body, toc, seo, authors[]->{slug, name, photo, bio}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`,
    );
    path = `/${page.stackbit_url_path ? page.stackbit_url_path : null}`;
  }

  console.log("page =>", page)

  return {
    props: {
      page,
      path: path,
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default meta;
