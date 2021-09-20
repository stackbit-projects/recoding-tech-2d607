// need to figure out the subheading field type

export default {
  type: "document",
  name: "quickStartGuide",
  title: "Quick start guide",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the quick start guide",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "The subtitle of the quick start guide",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "person" }],

      description: "The author of this quick start guide",
    },
    {
      name: "subheadings",
      title: "Subheading questions",
      type: "array",
      of: [{ type: "subheadingQuestion" }],
      description:
        "A subheading for the quick start guide, usually in the form of a question, e.g. 'Why is disinformation important?'",
    },
    {
      name: "datePublished",
      title: "Date published",
      type: "date",
      description: "Date this quick start guide was published",
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: "MMMM DD YYYY",
      },
    },
    {
      type: "string",
      name: "layout",
      title: "Layout",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["quick_start_guide"],
      },
    },
    {
      type: "string",
      name: "stackbit_url_path",
      title: "URL Path",
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and post page would be "posts/new-post/"',
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "stackbit_dir",
      title: "Directory",
      description: "The directory path where this file is stored",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["content/pages"],
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
        list: ["page"],
      },
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
