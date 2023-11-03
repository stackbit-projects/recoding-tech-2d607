/* eslint-disable */
import React from "react";
import client from "../../utils/sanityClient";

import { author } from "../../layouts";

export async function getStaticPaths() {
  console.log("Page author/[...slug].js getStaticPaths");
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const slugs = await client.fetch(
    `*[_type == "author" && !(_id in path("drafts.**")) ]{ slug }`
  );
  const paths = slugs.map((path) => {
    return {
      params: { slug: [path.slug.current] },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join();
  console.log("Page author/[...slug].js getStaticProps, slug: ", slug);
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page" && !(_id in path("drafts.**"))]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "author" && slug.current == "${slug}"]{_id, _createdAt, _updatedAt, _type, slug, name, email, bio, socials, staff, photo}`
  );
  const postsQuery = `*[_type == "post" && references("${page._id}") && !(_id in path("drafts.**")) ]{_id, slug, date, ref, title, relatedTopics[]->{_id, displayName, stackbit_model_type} }|order(date desc)`;
  const posts = await client.fetch(postsQuery);

  return {
    props: {
      page,
      posts,
      path: `/author/${page.slug.current ? page.slug.current : page.slug}`,
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default author;
