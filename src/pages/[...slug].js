/* eslint-disable */
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

  // *[ _type in ["post", "advanced", "page"] ]{ slug, stackbit_url_path }`);
  const slugs = await client.fetch(
    `*[ _type in ["post", "advanced", "page" && !(_id in path("drafts.**"))] ]{ slug, stackbit_url_path }`
  );

  const paths = slugs.map((path) => {
    let slug;
    if (path.slug && path.slug.current) {
      slug = path.slug.current
    }
    if (path.stackbit_url_path) {
      slug = path.stackbit_url_path.split("/")[1]
    }
    return {
      params: {
        slug: [
          slug.length ? slug : null,
        ],
      },
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(props) {
  const { params } = props
  console.log("Page /[...slug].js getStaticProps, slug: ", params);
  const slug = params.slug.join();
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page" && !(_id in path("drafts.**"))]{ displayName, _id, slug } | order(displayName asc)`
  );

  let [page] = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type in ["advanced", "page", "post"] && (slug.current == "${slug}" || stackbit_url_path == "/${slug}")]{_id, _type, stackbit_url_path, trackerText, _createdAt, _updatedAt, date, slug, title, body, toc, tocTitle, featuredImage, seo, authors[]->{slug, name, photo, bio}, heroContent, layout, sections, sidebar_content[type == "sidebar_about"]{staff[]->, board[]->, masthead[]->}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`
  );

  let path;

  if (page && page.stackbit_url_path) {
    path = page.stackbit_url_path.split("/")[1];
  }

  if (page && page.slug && page.slug.current) {
    path = page.slug.current;
  }

  if (page && page.slug && !page.slug.current) {
    path = page.slug;
  }

  let authors = [];

  if (path == "contributors") {
    // const authorsQuery = `*[_type == "author" && !(_id in path("drafts.**"))] {name, firstName, lastName, slug, email, bio, socials, _updatedAt, photo, "relatedPostTopics": *[_type=='post' && references(^._id)]{ _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }}|order(_updatedAt asc)`;
    const authorsQuery = `*[_type == "author" && !(_id in path("drafts.**"))] {name, firstName, lastName, slug, email, bio, socials, _updatedAt, photo, "relatedPostTopics": *[_type=='post' && references(^._id)]{ _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }}|order(_updatedAt asc)[0..50]`

    authors = await client.fetch(authorsQuery);
  }

  let articles = [];

  if (path == "search") {
    const articlesQuery = `*[!(_id in path("drafts.**")) && _type == "post"]{ title, date, slug, 'key': slug } | order(date desc)`;

    articles = await client.fetch(articlesQuery);
  }

  return {
    props: {
      page: page ? page : null,
      articles: articles.length ? articles : null,
      _type: page ? page._type : null,
      authors: authors.length ? authors : null,
      path: path,
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default meta;
