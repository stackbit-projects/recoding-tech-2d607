/* eslint-disable */
import client from "../utils/sanityClient";
import generateFeed from "../utils/generateFeed";

import { meta } from "../layouts";

export async function getStaticPaths() {
  console.log("Page [...slug].js getStaticPaths");
  await generateFeed("./public");

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // *[ _type in ["post", "advanced", "page"] ]{ slug, stackbit_url_path }`);
  const slugs = await client.fetch(`*[ _type in ["post", "advanced", "page"] ]{ slug, stackbit_url_path }`);

  const paths = slugs.map((path) => ({
    params: { slug: [path.slug ? path.slug.current : path.stackbit_url_path.split('/')[1]] },
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
    `*[_type == "topic" && stackbit_model_type == "page"]{ displayName, link, _id, slug, type }`,
  );
  
  let [page] = await client.fetch(
    `*[_type in ["advanced", "page", "post"] && (slug.current == "${slug}" || stackbit_url_path == "/${slug}")]{_id, _type, stackbit_url_path, _createdAt, date, slug, title, body, toc, seo, authors[]->{slug, name, photo, bio}, heroContent, layout, sections, sidebar_content[type == "sidebar_about"]{staff[]->, board[]->, masthead[]->}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`,
  );

  let path;
  
  if (page && page.stackbit_url_path) {
    path = page.stackbit_url_path.split('/')[1]
  }

  if (page.slug && page.slug.current) {
    path = page.slug.current
  }

  if (page.slug && !page.slug.current) {
    path = page.slug
  }

  let authors = [];

  if (path == 'contributors') {
    const authorsQuery = `*[_type == "author" && !(_id in path("drafts.**")) ]{name, slug, email, bio, socialMedia, photo, "relatedPostTopics": *[_type=='post' && references(^._id)]{ _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }}|order(lastUpdate desc)`;
    
    authors = await client.fetch(authorsQuery);
  }

  let articles = [];

  if (path == "search") {
    const articlesQuery =
    `*[!(_id in path("drafts.**")) && _type == "post"]{ title, date, slug, 'key': slug } | order(date desc)`;

    articles = await client.fetch(articlesQuery)
  }

  return {
    props: {
      page,
      articles: articles.length ? articles : null,
      _type: page._type,
      authors: authors.length ? authors : null,
      path: path,
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default meta;
