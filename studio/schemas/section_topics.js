export default {
  type: "object",
  name: "section_topics",
  title: "Featured Topics Section",
  fields: [
    {
      name: "featuredTopics",
      title: "Featured Topics",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "topic" },
          options: {
            filter: "stackbit_model_type == $stackbit_model_type",
            filterParams: { stackbit_model_type: "page" },
          },
        },
      ],
    },
    {
      type: "string",
      name: "type",
      title: "Object Type",
      description: "The type of the object",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["section_topics"],
      },
    },
    {
      type: "string",
      name: "stackbit_model_type",
      title: "Stackbit Model Type",
      description: "Stackbit model type",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["object"],
      },
    },
  ],
};
