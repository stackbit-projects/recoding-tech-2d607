export default {
  type: "document",
  name: "creator",
  title: "Creator",
  fields: [
    {
      type: "string",
      name: "lastName",
      title: "Last Name",
    },
    {
      type: "string",
      name: "firstName",
      title: "First Name",
    },
    {
      type: "string",
      name: "creatorType",
      title: "Type",
    },
    {
      title: "Related citations",
      name: "relatedCitations",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "citation" }],
          weak: true,
          readOnly: true,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "lastName",
    },
  },
};
