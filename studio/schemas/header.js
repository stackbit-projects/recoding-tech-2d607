export default {
  type: "object",
  name: "header",
  title: "Header Configuration",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Header Title",
      description:
        "The title displayed on the left side. If value is not set, the author name will be used.",
      validation: null
    },
    {
      type: "string",
      name: "tagline",
      title: "Header Tagline",
      description: "The tagline displayed on the left side.",
      validation: null
    },
    {
      type: "string",
      name: "type",
      title: "Object Type",
      description: "The type of the object",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["header"]
      }
    },
    {
      type: "string",
      name: "stackbit_model_type",
      title: "Stackbit Model Type",
      description: "Stackbit model type",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["object"]
      }
    }
  ],
  preview: {
    select: {
      title: "title"
    }
  }
};
