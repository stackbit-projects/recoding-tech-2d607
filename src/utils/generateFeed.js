import fs from "fs";
import { Feed } from "feed";
import client from "./sanityClient";

const generateFeed = async (path) => {
  const siteURL = process.env.SITE_URL || "https://techpolicy.vercel.app";
  const date = new Date();

  const posts = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type == "post"]{ _id, title, slug, date, authors[]=>{ name, email, socials} }`
  );

  const feed = new Feed({
    title: "Tech Policy Press",
    description:
      "We publish opinion and analysis. At a time of great challenge to democracies globally, we seek to advance a pro-democracy movement in tech and tech policy.",
    id: siteURL,
    link: siteURL,
    //image: `${siteURL}/logo.svg`,
    //favicon: `${siteURL}/favicon.png`,
    copyright: `Tech Policy Press © ${date.getFullYear()}, a 501(c)(3) organization`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
  });

  posts.forEach((post) => {
    const url = `${siteURL}/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      author:
        post.authors &&
        post.authors.length &&
        post.authors.map((author) => {
          const socials = author.socials.split(",") || [];
          return {
            name: author.name,
            email: author.email,
            link: socials.length ? socials[0].trim() : undefined,
          };
        }),
      date: new Date(post.date),
    });
  });

  fs.mkdirSync(`${path}/rss`, { recursive: true });
  fs.writeFileSync(`${path}/rss/feed.xml`, feed.rss2());
  fs.writeFileSync(`${path}/rss/atom.xml`, feed.atom1());
  fs.writeFileSync(`${path}/rss/feed.json`, feed.json1());
};

export default generateFeed;
