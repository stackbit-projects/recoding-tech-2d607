export default {
  type: "document",
  name: "article",
  title: "Article",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Title",
      description: "The title of the post.",
      validation: Rule => Rule.required()
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "The slug for the article. Can be the same as the title, but turned into a URL. For example, title-of-article.",
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
      title: "Author",
      name: "author",
      type: "reference",
      to: [{ type: "person" }]
    },
    {
      type: "string",
      name: "category",
      title: "Category",
      description: "What type of article is this? (ex: commentary)",
      validation: null
    },
    {
      type: "array",
      name: "topics",
      of: [
        {
          title: "Name",
          type: "object",
          fields: [
            {
              title: "Name",
              name: "name",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      type: "date",
      name: "date",
      title: "Date",
      validation: Rule => Rule.required()
    },
    {
      type: "image",
      name: "img_path",
      title: "Image",
      description: "A featured image for the article, if any.",
      validation: null
    },
    {
      type: "string",
      name: "img_alt",
      title: "Image alt text",
      description: "The alt text of the featured image.",
      validation: null
    },
    {
      name: "links",
      title: "Related Links",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "citation"
            }
          ]
        }
      ]
    },
    {
      type: "markdown",
      name: "content",
      title: "Content",
      description: "Page content",
      validation: null
    },
    {
      type: "stackbit_page_meta",
      name: "seo",
      title: "Seo",
      validation: null
    },
    {
      type: "string",
      name: "layout",
      title: "Layout",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["article"]
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
