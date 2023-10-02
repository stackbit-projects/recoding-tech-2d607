/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

/**
 * In next.js we can't use `src/pages/[...slug].js` for root site page `/`.
 * Instead, we import and export the [...slug].js while overriding its getStaticProps.
 */

import { page } from "../layouts";

export async function getStaticProps() {
  console.log("Page about-us.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const [topics] = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "page" && stackbit_url_path == "/about-us"]{_id, _createdAt, title, supertitle, img_path, img_alt, body, sidebar_content[type == "sidebar_about"]{staff[]->, board[]->, masthead[]->}, stackbit_url_path}`,
  );
  return { props: { path: "/about-us", page, data: { config, topics } } };
}

export default page;
