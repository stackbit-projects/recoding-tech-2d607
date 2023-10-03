/* eslint-disable */
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("Page podcast.js getStaticProps");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/podcast"]{_id, _createdAt, title, stackbit_url_path, sections[type == "section_podcast"]{type, embed_url, intro}}`
  );
  return {
    props: { path: "/podcast", page, data: { config, topics } },
    revalidate: 60,
  };
}

export default advanced;
