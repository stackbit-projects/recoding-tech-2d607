/* eslint-disable */
import client from "../utils/sanityClient";

import { post } from "../layouts";

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
  console.log("Page [post ...slug].js getStaticProps, slug: ", params);
  const slug = params.slug.join();
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "post" && slug.current == "${slug}"]{_id, _type, _createdAt, date, slug, title, body, toc, seo, authors[]->{slug, name, photo, bio}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`
  );
  return {
    props: {
      page,
      path: `/${page.slug.current ? page.slug.current : page.slug}`,
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default post;
