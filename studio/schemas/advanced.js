export default {
  type: "document",
  name: "advanced",
  title: "Advanced Page",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Title",
      description: "The title of the page.",
      validation: Rule => Rule.required()
    },
    {
      type: "string",
      name: "heroContent",
      title: "Hero Content",
      description: "The text in the page hero."
    },
    {
      type: "string",
      name: "heroLinkText",
      title: "Hero Link Text",
      description: "The text displayed on the hero link."
    },
    {
      type: "string",
      name: "heroLinkUrl",
      title: "Hero Link URL",
      description: "The URL for the hero link."
    },
    // {
    //   name: "featuredTopics",
    //   title: "Featured Topics",
    //   type: "array",
    //   of: [{ type: "reference", to: { type: "topic" } }]
    // },
    {
      type: "array",
      name: "sections",
      title: "Sections",
      description: "Page sections",
      validation: null,
      of: [
        {
          type: "section_citations"
        },
        {
          type: "section_content"
        },
        {
          type: "section_form"
        },
        {
          type: "section_topics"
        },
        {
          type: "section_articles"
        },
        {
          type: "section_policy_actions"
        },
        {
          type: "section_library"
        },
        {
          type: "section_search"
        },
        {
          type: "section_tracker"
        },
        {
          type: 'section_contributors',
        },
        {
          type: 'section_sign_up',
        },
        {
          type: 'section_block',
        },
      ]
    },
    {
      type: "string",
      name: "excerpt",
      title: "Excerpt",
      description: "The excerpt of the page displayed in meta data.",
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
        list: ["advanced"]
      }
    },
    {
      type: "string",
      name: "stackbit_url_path",
      title: "URL Path",
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and post page would be "posts/new-post/"',
      validation: Rule => Rule.required()
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
