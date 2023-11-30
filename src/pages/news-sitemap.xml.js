import client from "../utils/sanityClient";
import xmlescape from "xml-escape";

const postQuery = `*[_type == 'post' && !(_id in path("drafts.**"))] | order(date desc)[0..20] {
    slug, date, title
  }`;

const getPosts = async () => {
  const posts = await client.fetch(postQuery);
  return posts;
};

const generateNewsSitemap = (posts) => {
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${posts
      .map((post) => {
        return `
      <url>
        <loc>https://techpolicy.press/${post.slug.current}</loc>
        <news:news>
          <news:publication>
            <news:name>Tech Policy Press</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${post.date}</news:publication_date>
          <news:title>${xmlescape(post.title)}</news:title>
        </news:news>
      </url>`;
      })
      .join("")}
  </urlset>
  `;
  return newsSitemap;
};

function NewsSiteMap() {}

export async function getServerSideProps({ res }) {
  const posts = await getPosts();

  const newsSitemap = generateNewsSitemap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(newsSitemap);
  res.end();

  return {
    props: {},
  };
}

export default NewsSiteMap;
