export default {
  type: "object",
  name: "section_articles",
  title: "Featured Articles Section",
  fields: [
    {
      name: "featuredArticle",
      title: "Featured Article",
      type: "reference",
      to: { type: "post" },
    },
    {
      name: "alsoFeatured",
      title: "Featured articles to display below the above article",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "post",
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
        list: ["section_articles"],
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
