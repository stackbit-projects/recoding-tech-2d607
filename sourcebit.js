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
        pages: (objects) => {
          return _.reduce(
            objects,
            (accum, object) => {
              switch (object.__metadata.modelName) {
                case "advanced":
                  accum.push({
                    path: object.stackbit_url_path,
                    page: object,
                  });
                  break;
                case "article":
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
                  accum.push({
                    path: `/article/${object.slug}`,
                    page: object,
                  });
                  break;
                case "page":
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
                  accum.push({
                    path: `/tracker/${object.slug}`,
                    page: object,
                  });
                  break;
                case "topic":
                  if (object.type && object.slug) {
                    accum.push({
                      path: `/${object.type}/${object.slug}`,
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
