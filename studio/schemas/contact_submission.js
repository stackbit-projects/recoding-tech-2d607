export default {
  name: "contact_submission",
  title: "Contact form submissions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
  ],
  preview: {
    select: {
      title: "email",
    },
  },
};
