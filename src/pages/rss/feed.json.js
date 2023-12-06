import client from "../../utils/sanityClient";
import generateFeed from "../../utils/generateFeed";

const postQuery = `*[!(_id in path("drafts.**")) && _type == "post"]{ _id, title, slug, date, authors[]->{ name, socials } } | order(date desc)`;

const getPosts = async () => {
  const posts = await client.fetch(postQuery);
  return posts;
};

const generateRssFeed = async () => {
  const posts = await getPosts();
  const feed = generateFeed(posts);
  return feed;
};

function JsonFeed() {}

export async function getServerSideProps({ res }) {
  const feed = await generateRssFeed();

  res.setHeader("Content-Type", "application/json");
  res.write(feed.json1());
  res.end();

  return {
    props: {},
  };
}

export default JsonFeed;
