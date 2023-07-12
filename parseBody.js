const { JSDOM } = require("jsdom");
const blockTools = require("@sanity/block-tools").default;
const sanitizeHTML = require("./sanitizeHTML");
const defaultSchema = require("./studio/schemas/schema.js");

const blockContentType = defaultSchema
  .get("article")
  .fields.find((field) => field.name === "body").type;

function htmlToBlocks(html, options) {
  console.log("at htmlToBlocks");
  if (!html) {
    return [];
  }

  const blocks = blockTools.htmlToBlocks(sanitizeHTML(html), blockContentType, {
    parseHtml: (htmlContent) => new JSDOM(htmlContent).window.document,
    rules: [
      {
        deserialize(el, next, block) {
          if (el.tagName === "IMG") {
            return block({
              children: [],
              _sanityAsset: `image@${el
                .getAttribute("src")
                .replace(/^\/\//, "https://")}`,
            });
          }

          if (
            el.tagName.toLowerCase() === "p" &&
            el.childNodes.length === 1 &&
            el.childNodes.tagName &&
            el.childNodes[0].tagName.toLowerCase() === "img"
          ) {
            return block({
              _sanityAsset: `image@${el.childNodes[0]
                .getAttribute("src")
                .replace(/^\/\//, "https://")}`,
            });
          }
          // Only convert block-level images, for now
          return undefined;
        },
      },
    ],
  });
  return blocks;
}

module.exports = (bodyHTML) => htmlToBlocks(bodyHTML);
