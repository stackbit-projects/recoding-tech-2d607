export default {
  name: "portable_text",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block"
    },
    {
      type: "image"
    },
    {
      name: "reference",
      type: "reference",
      to: [{ type: "citation" }]
    }
  ]
};
