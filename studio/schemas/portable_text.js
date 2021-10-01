export default {
  name: "portable_text",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL"
              }
            ]
          },

          {
            name: "citation",
            type: "object",
            title: "Citation",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [{ type: "citation" }]
              }
            ]
          }
        ]
      }
    }
  ]
};
