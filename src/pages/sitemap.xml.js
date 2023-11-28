import client from "../utils/sanityClient";

const latestPostQuery = `*[ _type == "post" && !(_id in path("drafts.**")) ]{_updatedAt, date, slug}|order(date desc)[0]`;
const latestImageQuery = `*[ !(_id in path("drafts.**")) && _type in ["sanity.imageAsset"] ]
{ url, _createdAt, _updatedAt, 
  "refs": count(*[ references(^._id) ]), 
  "references": *[ references(^._id) ]{ _id, slug, _createdAt }}
[ refs > 0 ] | order(_createdAt desc)[0]`;

const getPost = async () => {
  const post = await client.fetch(latestPostQuery);
  return post;
};

const getImage = async () => {
  const image = await client.fetch(latestImageQuery);
  return image;
};

const generateIndexSitemap = (post, image) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <sitemap>
          <loc>https://techpolicy.press/sitemap-1.xml</loc>
          <lastmod>${post.date}</lastmod>
       </sitemap>
       <sitemap>
          <loc>https://techpolicy.press/image-sitemap-1.xml</loc>
          <lastmod>${image._createdAt}</lastmod>
       </sitemap>
    </sitemapindex>`;
};

function SiteMapIndex() {}

export async function getServerSideProps({ res }) {
  const post = await getPost();
  const image = await getImage();

  const indexSitemap = generateIndexSitemap(post, image);

  res.setHeader("Content-Type", "text/xml");
  res.write(indexSitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMapIndex;
