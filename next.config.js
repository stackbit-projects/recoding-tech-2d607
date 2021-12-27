const client = require("./client");
const withFonts = require("next-fonts");

module.exports = withFonts({
  exportPathMap: async function (defaultPathMap) {
    const paths = await client
      .fetch(
        '*[_type in [ "page", "advanced", "article", "guide", "policy_action", "topic" ] && defined(slug)].slug.current'
      )
      .then((data) =>
        data.reduce(
          (acc, slug) => ({
            "/": { page: "/" },
            ...acc,
            [`/${slug}`]: {
              page: "/[slug]",
              query: { slug },
            },
          }),
          defaultPathMap
        )
      )
      .catch(console.error);
    return paths;
  },
});
