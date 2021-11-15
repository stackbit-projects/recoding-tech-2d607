const _ = require("lodash");
// const sanityClient = require("@sanity/client");
const blocksToHtml = require("@sanity/block-content-to-html");

const h = blocksToHtml.h;

const isDev = process.env.NODE_ENV === "development";

// const client = sanityClient({
//   projectId: process.env.SANITY_PROJECT_ID,
//   dataset: process.env.SANITY_DATASET || "production",
//   apiVersion: process.env.SANITY_API_VERSION || "2021-03-25", // use current UTC date - see "specifying API version"!
//   token: process.env.SANITY_ACCESS_TOKEN,
//   useCdn: false
// });
//
// const query = `*[_type=="person"]{
//   name,
//   "relatedMovies": *[_type=='movie' && references(^._id)]{
//   	title,
//   	slug,
//   	releaseDate
// 	}
// }`;
//
// client.fetch(query).then(bikes => {
//   console.log("Bikes with more than one seat:");
//   bikes.forEach(bike => {
//     console.log(`${bike.name} (${bike.seats} seats)`);
//   });
// });

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
            reference: props => {
              console.log(props);
              h("div", props.node.title, {});
            }
          },
          marks: {
            annotations: [
              {
                citation: props => {
                  console.log(props);
                  h("div", props.node.title, {});
                }
              }
            ]
          }
        }
      }
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        liveUpdate: isDev,
        flattenAssetUrls: true,
        pages: [
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "advanced")
          },
          {
            path: "/article/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "article")
          },
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "page")
          },
          {
            path: "/tracker/{slug}",
            predicate: _.matchesProperty(
              "__metadata.modelName",
              "policy_action"
            )
          },
          {
            path: "/{type}/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "topic")
          },
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "post")
          },
          {
            path: "/guide/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "guide")
          }
        ],
        commonProps: items => {
          // let pages = [];
          // const basicPages = _.filter(items, item =>
          //   [
          //     "advanced",
          //     "article",
          //     "page",
          //     "policyAction",
          //     "post",
          //     "guide"
          //   ].includes(_.get(item, "__metadata.modelName"))
          // );
          // const topicsPages = items.filter(
          //   item =>
          //     item.__metadata.modelName === "topic" &&
          //     item.stackbit_model_type === "page"
          // );

          // pages = [...pages, basicPages, topicsPages];

          // pages = pages.flat();

          const guides = _.filter(items, item =>
            ["guide"].includes(_.get(item, "__metadata.modelName"))
          );

          return {
            // pages: pages,
            guides: guides,
            citations: items.filter(item =>
              ["citation"].includes(_.get(item, "__metadata.modelName"))
            ),
            actions: items.filter(item =>
              ["policy_action"].includes(_.get(item, "__metadata.modelName"))
            ),
            topics: items.filter(item =>
              ["topic"].includes(_.get(item, "__metadata.modelName"))
            ),
            data: {
              config: _.find(
                items,
                _.matchesProperty("__metadata.modelName", "config")
              )
            }
          };
        }
      }
    }
  ]
};
