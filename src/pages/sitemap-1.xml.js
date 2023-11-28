import client from "../utils/sanityClient";

const postQuery = `*[_type == 'post' && !(_id in path("drafts.**"))] | order(date desc) {
    slug, date, title, _updatedAt
  }`;

const getPosts = async () => {
  const posts = await client.fetch(postQuery);
  return posts;
};

const generateSitemap = (posts) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://techpolicy.press</loc>
      </url>
      ${posts
        .map((post) => {
          return `
        <url>
            <loc>https://techpolicy.press/${post.slug.current}</loc>
            <lastmod>${post._updatedAt}</lastmod>
        </url>
      `;
        })
        .join("")}
    </urlset>
  `;
};

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const posts = await getPosts();

  const sitemap = generateSitemap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
