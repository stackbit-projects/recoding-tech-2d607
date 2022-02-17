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
        dataset: process.env.SANITY_DATASET || "production",
        isPreview: isDev,
        watch: isDev,
        serializers: {
          types: {
            reference: (props) =>
              h("div", { className: "citation" }, props.node._ref),
          },
        },
      },
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        liveUpdate: isDev,
        flattenAssetUrls: true,
        pages: [
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "advanced"),
          },
          {
            path: "/article/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "article"),
          },
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "page"),
          },
          {
            path: "/tracker/{slug}",
            predicate: _.matchesProperty(
              "__metadata.modelName",
              "policy_action"
            ),
          },
          {
            path: "/{type}/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "topic"),
          },
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "post"),
          },
          {
            path: "/guide/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "guide"),
          },
        ],
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
