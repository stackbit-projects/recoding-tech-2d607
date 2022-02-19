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
      validation: (Rule) => Rule.required(),
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
          { title: "Policy", value: "policy" },
        ],
      },
      validation: (Rule) => Rule.required(),
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
    // {
    //   title: "Related law and government tracker actions",
    //   name: "relatedPolicyActions",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [
    //         {
    //           type: "policy_action"
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      title: "Related commentary and analysis",
      name: "relatedCommentary",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "article",
            },
          ],
        },
      ],
    },
    // {
    //   title: "Related reading",
    //   name: "relatedReadings",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [
    //         {
    //           type: "article"
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      title: "Quick start guide",
      name: "quickStartGuide",
      type: "reference",
      to: [{ type: "guide" }],
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
    //{
    //  title: "Related citations",
    //  name: "relatedCitations",
    //  type: "array",
    //  of: [
    //    {
    //      type: "reference",
    //      to: [{ type: "citation" }],
    //      weak: true,
    //      readOnly: true,
    //    },
    //  ],
    //},
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
    // {
    //   title: "Layout",
    //   name: "layout",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Country", value: "country" },
    //       { title: "Issue/Policy", value: "issue" },
    //       { title: "Company", value: "company" }
    //     ]
    //   }
    // }
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
