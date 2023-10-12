/**
 * @type {import('next').NextConfig}
 */

const path = require("path");
const dotenv = require("dotenv");
/**
 * the below module is needed to get around Next's
 * "CSS Modules cannot be imported from within node_modules next.js react-tweet"
 * this solution is from
 * https://stackoverflow.com/questions/60257044/transpile-npm-module-in-next-js
 */
const withTM = require("next-transpile-modules")(["react-tweet"]);

dotenv.config();

const nextConfig = {
  env: {
    sanityAccessToken: process.env.SANITY_ACCESS_TOKEN,
    sanityProjectId: process.env.SANITY_PROJECT_ID,
    sanityApiVersion: process.env.SANITY_API_VERSION,
    sanityDataset: process.env.SANITY_DATASET,
  },
  //errorOnExist: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  trailingSlash: true,
  sassOptions: {
    // scss files might import plain css files from the "public" folder:
    // @import "example.css";
    // the importer function rewrites path to these files relative to the scss file:
    // @import "../../public/assets/css/example.css";
    importer: (url, prev, done) => {
      if (/\.css$/i.test(url)) {
        return { file: path.join("../../public/css", url) };
      }
      return null;
    },
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  webpack: (config, { webpack }) => {
    // Tell webpack to ignore watching content files in the content folder.
    // Otherwise webpack receompiles the app and refreshes the whole page.
    // Instead, the src/pages/[...slug].js uses the "withRemoteDataUpdates"
    // function to update the content on the page without refreshing the
    // whole page
    config.plugins.push(
      new webpack.WatchIgnorePlugin({
        paths: [/\/content\//],
      })
    );
    return config;
  },
};

module.exports = withTM(nextConfig);
