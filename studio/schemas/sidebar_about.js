export default {
  type: "object",
  name: "sidebar_about",
  title: "Featured sidebar contributors",
  fields: [
    {
      name: "staff",
      title: "Staff",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "author",
          },
        },
      ],
    },
    {
      name: "board",
      title: "Board of Directors",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "author",
          },
        },
      ],
    },
    {
      name: "masthead",
      title: "Masthead",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "author",
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
        list: ["sidebar_about"],
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
