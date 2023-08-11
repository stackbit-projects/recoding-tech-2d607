export default {
  type: 'document',
  name: 'page',
  title: 'Page',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'The title of the page',
      validation: (Rule) => Rule.required(),
    },
    // {
    //   "title": 'Author',
    //   "name": 'author',
    //   "type": 'reference',
    //   "to": [{"type": 'person'}]
    // },
    {
      type: 'string',
      name: 'supertitle',
      title: 'Supertitle',
      description: 'Text to describe the page, if any. Used in the related pages sidebar.',
      validation: null,
    },
    {
      type: 'image',
      name: 'img_path',
      title: 'Image',
      description: 'The image shown below the page title and subtitle.',
      validation: null,
    },
    {
      type: 'string',
      name: 'img_alt',
      title: 'Image Alt Text',
      description: 'The alt text of the image.',
      validation: null,
    },
    // {
    //     "type": "stackbit_page_meta",
    //     "name": "seo",
    //     "title": "Seo",
    //     "validation": null
    // },
    {
      type: 'string',
      name: 'layout',
      title: 'Layout',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['page'],
      },
    },
    {
      type: 'array',
      name: 'sidebar_content',
      title: 'Sidebar content',
      description: 'Pages to include in the sidebar',
      of: [
        {
          type: 'reference',
          weak: true,
          to: {type: 'page'},
        },
      ],
    },
    {
      type: 'array',
      name: 'sections',
      title: 'Page sections',
      description: 'Additional sections you might want to include',
      of: [
        {
          type: 'section_form',
        },
      ],
    },
    {
      type: 'string',
      name: 'stackbit_url_path',
      title: 'URL Path',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and post page would be "posts/new-post/"',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'stackbit_dir',
      title: 'Directory',
      description: 'The directory path where this file is stored',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['content/pages'],
      },
    },
    // {
    //   type: ",
    //   name: "content",
    //   title: "Content",
    //   description: "Page content",
    //   validation: null,
    // },

    {
      type: 'string',
      name: 'stackbit_model_type',
      title: 'Stackbit Model Type',
      description: 'Stackbit model type',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['page'],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
