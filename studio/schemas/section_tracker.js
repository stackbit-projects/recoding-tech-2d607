export default {
  type: "object",
  name: "section_tracker",
  title: "Law and Regulation Tracker",
  fields: [
    {
      type: "text",
      name: "intro",
      title: "Intro Text",
      description: "The intro text on the law and regulation tracker.",
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
        list: ["section_tracker"]
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
  ]
};
