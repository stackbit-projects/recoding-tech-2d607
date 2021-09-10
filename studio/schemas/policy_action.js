export default {
  type: "document",
  name: "policyAction",
  title: "Policy action",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Policy action name",
      description: "Official name of the policy action",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "The slug for the policy action. Can be the same as the name, but turned into a URL. For example, name-of-policy.",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
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
      name: "type",
      type: "string",
      title: "Policy action type",
      description: "E.g. legislation, proposal, etc.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "country",
      type: "string",
      title: "Country",
      description: "The policy actions's country of origin",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dateInitiated",
      title: "Date initiated",
      type: "date",
      options: {
        dateFormat: "MMMM DD YYYY",
      },
    },
    {
      name: "status",
      title: "Current status of policy",
      type: "string",
      description: "E.g. passed by committee, enacted, etc.",
    },
    {
      name: "lastUpdate",
      title: "Date of last update",
      type: "date",
      options: {
        dateFormat: "MMMM DD YYYY",
      },
    },
    {
      type: "markdown",
      name: "summary",
      title: "Summary",
      description: "A summary of the policy.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "relatedCitations",
      title: "Further reading",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "citation",
            },
          ],
        },
      ],
    },
    {
      name: "relatedDocs",
      title: "Related primary documents",
      type: "array",
      of: [{ type: "file" }],
    },
    {
      name: "relatedTopics",
      title: "Related topics",
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
      name: "layout",
      title: "Layout",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["policy_action"],
      },
    },
  ],
};
