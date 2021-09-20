export default {
  type: "document",
  name: "topic",
  title: "Topic",
  fields: [
    {
      title: "Name",
      type: "string",
      name: "name",
      description: "The name of the topic.",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Display title",
      type: "string",
      name: "displayTitle",
      description:
        "How you want the name of the topic to appear on the front-end",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "The slug for the topic. Can be the same as the title, but turned into a URL. For example, title-of-guide.",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .slice(0, 200),
      },
    },
    {
      title: "Type of topic",
      type: "string",
      name: "type",
      options: {
        list: [
          { title: "Country", value: "country" },
          { title: "Issue", value: "issue" },
          { title: "Company", value: "company" },
        ],
      },
    },
    {
      title: "Fast facts",
      type: "markdown",
      name: "fastFacts",
      description: "Featured stats and facts about the topic.",
    },
    {
      title: "Topic description",
      type: "markdown",
      name: "topicDescription",
      description: "Anything you want to say about the topic.",
    },
    {
      title: "Related commentary and analysis",
      name: "relatedCommentary",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "citation",
            },
            {
              type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Related topics",
      name: "relatedTopics",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "topic" }],
        },
      ],
    },
    {
      type: "string",
      name: "stackbit_model_type",
      title: "Stackbit Model Type",
      description: "Stackbit model type",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["page", "data"],
      },
    },
    {
      title: "Layout",
      name: "layout",
      type: "string",
      options: {
        list: ["issue", "country", "company"],
      },
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
