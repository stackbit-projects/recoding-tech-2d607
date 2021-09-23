export default {
  type: "document",
  name: "guide",
  title: "Quick start guide",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the quick start guide",
      validation: Rule => Rule.required()
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "The subtitle of the quick start guide"
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "The slug for the quick start guide. Can be the same as the title, but turned into a URL. For example, title-of-guide.",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: input =>
          input
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .slice(0, 200)
      }
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "person" }],
      description: "The author of this quick start guide"
    },
    {
      name: "content",
      title: "Quick start guide content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "reference",
          to: [{ type: "topic" }]
        }
      ]
    },
    {
      name: "datePublished",
      title: "Date published",
      type: "date",
      description: "Date this quick start guide was published",
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: "MMMM DD YYYY"
      }
    },
    {
      type: "string",
      name: "layout",
      title: "Layout",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["guide"]
      }
    },
    {
      type: "string",
      name: "stackbit_dir",
      title: "Directory",
      description: "The directory path where this file is stored",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["content/pages"]
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
        list: ["page"]
      }
    }
  ],
  preview: {
    select: {
      title: "title"
    }
  }
};
