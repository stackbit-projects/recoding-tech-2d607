export default {
  type: "object",
  name: "section_topics",
  title: "Featured Topics Section",
  fields: [
    {
      name: "featuredTopics",
      title: "Featured Topics",
      type: "array",
      of: [{ type: "reference", to: { type: "topic" } }]
    }
  ]
};
