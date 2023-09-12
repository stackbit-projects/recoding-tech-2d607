const _ = require("lodash");
const blocksToHtml = require("@sanity/block-content-to-html");

const h = blocksToHtml.h;

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-sanity"),
      options: {
        accessToken: process.env.SANITY_ACCESS_TOKEN,
        projectId: process.env.SANITY_PROJECT_ID,
        apiVersion: process.env.SANITY_API_VERSION,
        dataset: process.env.SANITY_DATASET || "tpp-development",
        isPreview: isDev,
        watch: isDev,
        serializers: {
          types: {
            reference: (props) => {
              return h("div", { className: "citation" }, props.node._ref);
            },
            Image: (props) => {
              return h(
                "figure",
                h("img", {
                  width: "100%",
                  src: props.node.asset ? props.node.asset._ref : "",
                  // actually a reference to a Sanity Image asset, to be converted into a URL in the htmlToReact render function
                }),
                h(
                  "figcaption",
                  props.node.caption
                    ? props.node.caption
                    : props.node.wordpressCaption
                )
              );
            },
            iframeEmbed: (props) => {
              if (props.node.embedType === "airtable.com") {
                return h(
                  "iframe",
                  {
                    src: props.node.url,
                    style: "background:transparent;border:1px solid #ccc",
                  },
                  props.node
                );
              } else if (props.node.embedType === "player.captivate.fm") {
                return h(
                  "iframe",
                  { src: props.node.url, style: "width:100%;height:200px" },
                  props.node
                );
              } else if (props.node.embedType === "player.vimeo.com") {
                return h(
                  "iframe",
                  {
                    src: props.node.url,
                    width: "640",
                    height: "360",
                    frameborder: "0",
                    allow: "autoplay; fullscreen; picture-in-picture",
                    allowfullscreen: true,
                  },
                  props.node
                );
              } else if (props.node.embedType === "twitter.com") {
                return h("a", { href: props.node.url }, props.node.url);
              } else if (props.node.embedType === "vimeo.com") {
                return h(
                  "iframe",
                  {
                    src: `https://player.vimeo.com/video/${props.node.url.slice(
                      -9
                    )}?h=69206d40f4`,
                    width: "640",
                    height: "360",
                    frameborder: "0",
                    allow: "autoplay; fullscreen; picture-in-picture",
                    allowfullscreen: true,
                  },
                  props.node
                );
              } else if (
                props.node.embedType === "www.youtube.com" ||
                props.node.embedType === "youtu.be"
              ) {
                return h(
                  "iframe",
                  {
                    src: props.node.url,
                    width: "560",
                    height: "315",
                    frameborder: "0",
                    allow:
                      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    allowfullscreen: true,
                  },
                  props.node
                );
              } else {
                // console.log(props);
                return h("iframe", { src: props.node.url }, props.node);
              }
            },
            PDF: (props) => h("document", { className: "pdf" }, props.node),
            File: (props) => h("document", { className: "pdf" }, props.node),
          },
        },
      },
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        liveUpdate: isDev,
        flattenAssetUrls: false,
        pages: (objects) => {
          return _.reduce(
            objects,
            (accum, object) => {
              switch (object.__metadata.modelName) {
                case "advanced":
                  if (
                    Array.isArray(object.sections) &&
                    object.sections.length
                  ) {
                    let sections = object.sections.map((section) => {
                      if (
                        Array.isArray(section.featuredTopics) &&
                        section.featuredTopics.length
                      ) {
                        let topics = section.featuredTopics.map((topic) =>
                          _.pick(topic, [
                            "displayTitle",
                            "name",
                            "type",
                            "slug",
                            "stackbit_model_type",
                          ])
                        );
                        section.featuredTopics = topics;
                      }

                      if (section.featuredArticle) {
                        section.featuredArticle = _.pick(
                          section.featuredArticle,
                          [
                            "title",
                            "author",
                            "category",
                            "date",
                            "type",
                            "slug",
                            "stackbit_model_type",
                          ]
                        );
                      }

                      if (
                        section.alsoFeatured &&
                        Array.isArray(section.alsoFeatured) &&
                        section.alsoFeatured.length
                      ) {
                        let articles = section.alsoFeatured.map((article) =>
                          _.pick(article, [
                            "title",
                            "author",
                            "category",
                            "date",
                            "type",
                            "slug",
                            "stackbit_model_type",
                          ])
                        );
                        section.alsoFeatured = articles;
                      }
                      return section;
                    });
                    object.sections = sections;
                  }
                  accum.push({
                    path: object.stackbit_url_path,
                    page: object,
                  });
                  break;
                case "post":
                  let slug;
                  if (!object.slug) {
                    slug = object.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "")
                      .replace(/\s+/g, "-")
                      .slice(0, 200);
                  } else {
                    slug = object.slug.current;
                  }

                  if (Array.isArray(object.relatedTopics)) {
                    let topics = object.relatedTopics.map((topic) =>
                      _.pick(topic, [
                        "displayTitle",
                        "name",
                        "type",
                        "slug",
                        "stackbit_model_type",
                      ])
                    );
                    object.relatedTopics = topics;
                  }
                  if (Array.isArray(object.relatedCommentary)) {
                    let comms = object.relatedCommentary.map((topic) =>
                      _.omit(topic, ["topics", "creators"])
                    );
                    object.relatedCommentary = comms;
                  }
                  if (Array.isArray(object.links)) {
                    let links = object.links.map((link) =>
                      _.omit(link, ["topics", "creators"])
                    );
                    object.relatedCommentary = links;
                  }
                  accum.push({
                    path: `/${slug}`,
                    page: object,
                  });
                  break;
                case "page":
                  if (Array.isArray(object.sidebar_content)) {
                    let contents = object.sidebar_content.map((content) =>
                      _.omit(content, ["sidebar_content"])
                    );
                    object.sidebar_content = contents;
                  }
                  accum.push({
                    path: object.stackbit_url_path,
                    page: object,
                  });
                  break;
                case "policy_action":
                  if (Array.isArray(object.relatedTopics)) {
                    let topics = object.relatedTopics.map((topic) =>
                      _.pick(topic, [
                        "displayTitle",
                        "name",
                        "type",
                        "slug",
                        "stackbit_model_type",
                      ])
                    );
                    object.relatedTopics = topics;
                  }
                  if (Array.isArray(object.relatedCommentary)) {
                    let comms = object.relatedCommentary.map((topic) =>
                      _.omit(topic, ["topics", "creators"])
                    );
                    object.relatedCommentary = comms;
                  }
                  if (Array.isArray(object.relatedCitations)) {
                    let citations = object.relatedCitations.map((citation) =>
                      _.omit(citation, ["topics", "creators"])
                    );
                    object.relatedCitations = citations;
                  }
                  if (object.country) {
                    object.country = _.pick(object.country, [
                      "displayTitle",
                      "name",
                      "type",
                      "slug",
                      "stackbit_model_type",
                    ]);
                  }
                  accum.push({
                    path: `/tracker/${object.slug}`,
                    page: object,
                  });
                  break;
                case "citation":
                  if (Array.isArray(object.topics)) {
                    let topics = object.topics.map((topic) =>
                      _.pick(topic, [
                        "displayTitle",
                        "name",
                        "type",
                        "slug",
                        "stackbit_model_type",
                      ])
                    );
                    object.topics = topics;
                  }
                  break;
                case "topic":
                  if (Array.isArray(object.relatedTopics)) {
                    let topics = object.relatedTopics.map((topic) =>
                      _.pick(topic, [
                        "displayTitle",
                        "name",
                        "type",
                        "slug",
                        "stackbit_model_type",
                      ])
                    );
                    object.relatedTopics = topics;
                  }
                  if (object.slug) {
                    accum.push({
                      path: `/category/${object.slug.current}`,
                      page: object,
                    });
                  }
                  break;
                case "guide":
                  accum.push({
                    path: `/guide/${object.slug}`,
                    page: object,
                  });
                  break;
                case "author":
                  accum.push({
                    path: `/author/${object.slug.current}`,
                    page: object,
                  });
                  break;
              }
              return accum;
            },
            []
          );
        },
        commonProps: (items) => {
          return {
            data: {
              config: _.find(
                items,
                _.matchesProperty("__metadata.modelName", "config")
              ),
              topics: _.reduce(
                items,
                (acc, item) => {
                  if (
                    item.__metadata &&
                    item.__metadata.modelName === "topic" &&
                    item.stackbit_model_type === "page"
                  ) {
                    acc.push({
                      displayTitle: item.displayTitle,
                      link: item.link,
                      slug: item.slug,
                      type: item.type,
                    });
                  }
                  return acc;
                },
                []
              ),
            },
          };
        },
      },
    },
  ],
};
