import client from "../utils/sanityClient";

const imagesQuery = `*[ !(_id in path("drafts.**")) && _type in ["sanity.imageAsset"] ]
{ url, _createdAt, _updatedAt, 
  "refs": count(*[ references(^._id) ]), 
  "references": *[ references(^._id) ]{ _id, slug, _createdAt }[0]}
[ refs > 0 ] | order(_createdAt desc)`;

const getImages = async () => {
  const images = await client.fetch(imagesQuery);
  return images;
};

const generateImageSitemap = (images) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${images
        .map((image) => {
          return `
        <url>
            <loc>https://techpolicy.press/${image.references.slug.current}</loc>
            <image:image>
              <image:loc>${image.url}</image:loc>
              <lastmod>${image._updatedAt}</lastmod>
            </image:image>
        </url>
      `;
        })
        .join("")}
    </urlset>
  `;
};

function ImageSiteMap() {}

export async function getServerSideProps({ res }) {
  const images = await getImages();

  const sitemap = generateImageSitemap(images);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default ImageSiteMap;
