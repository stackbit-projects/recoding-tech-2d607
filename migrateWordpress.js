const fs = require("fs");
const { log } = console;
const XmlStream = require("xml-stream");
function generateAuthorId(id) {
  return `author-${id}`;
}

function generateCategoryId(id) {
  return `category-${id}`;
}

const parseDate = (item) => {
  let date = item["wp:post_date_gmt"];
  if (date == undefined || date == "0000-00-00 00:00:00") {
    date = item["wp:post_date"];
    if (date == undefined) {
      date = "1970-01-01 00:00:00";
    }
  }

  date = date.match(/(\d{4})-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
  date = date.map((e) => {
    return parseInt(e, 10);
  });
  let pubDate = new Date(
    Date.UTC(date[1], date[2] - 1, date[3], date[4], date[5], date[6], 0)
  );

  if (item.pubDate.match("-0001") === null) {
    pubDate = new Date(item.pubDate);
  }
  return pubDate;
};

const readFile = (path = "") => {
  if (!path) {
    return console.error("You need to set path");
  }
  return fs.createReadStream(path);
};

const buildJSONfromStream = async (stream) => {
  const xml = await new XmlStream(stream);

  return new Promise((res, rej) => {
    /**
     * Get some meta info
     */

    const meta = {};
    xml.on("text: wp:base_site_url", (url) => {
      console.log("url", url);
      meta.rootUrl = url.$text;
    });

    /**
     * Get the categories
     */
    const categories = [];
    xml.on("endElement: category", (wpCategory) => {
      const { nicename } = wpCategory.$;
      const category = {
        _type: "category",
        _id: generateCategoryId(nicename),
        title: nicename,
      };
      categories.push(category);
    });

    // /**
    //  * Get the users
    //  */
    const users = [];
    xml.on("endElement: wp:author", (author) => {
      console.log("author*********", author);
      const user = {
        _type: "author",
        // _id: generateAuthorId(author["wp:author_id"]),
        name: author["wp:author_display_name"],
        // slug: {
        //   current: slugify(author["wp:author_login"], { lower: true }),
        // },
        email: author["wp:author_email"],
      };
      console.log("user?", user);
      users.push(user);
    });

    /**
     * Get the posts
     */
    const posts = [];
    xml.collect("wp:postmeta");
    xml.on("endElement: item", (item) => {
      const { title, category, link: permalink, description } = item;
      if (item["wp:post_type"] != "post" && item["wp:post_type"] != "page") {
        return;
      }
      const post = {
        _type: "post",
        title,
        slug: {
          current: slugify(title, { lower: true }),
        },
        categories: [
          {
            _type: "reference",
            _ref: generateCategoryId(category.$.nicename),
          },
        ],
        description,
        body: parseBody(item["content:encoded"]),
        publishedAt: parseDate(item),
        /* author: {
          _type: 'reference',
          _ref: users.find(user => user.slug.current === item['dc:creator'])._id
        },
        */
      };
      posts.push(post);
    });

    // there seems to be a bug where errors is not caught
    xml.on("error", (err) => {
      throw new Error(err);
    });

    xml.on("end", () => {
      const output = [
        /* meta, */
        ...users,
        // ...posts,
        ...categories,
      ];

      return res(output);
    });
  });
};

const main = async () => {
  const filename = "./techpolicypress.WordPress.2023-06-23.xml";
  const stream = await readFile(filename);
  const output = await buildJSONfromStream(stream);
  output.forEach((doc) => log(JSON.stringify(doc, null, 0)));
  console.log("Finished parsing.");
};

main();
