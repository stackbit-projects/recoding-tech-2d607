export default {
  type: 'object',
  name: 'stackbit_page_meta',
  title: 'Page meta data',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description:
        'The page title that goes into the <title> tag.  Add your target keyword in the title, but don’t over-do it. Remember you’re writing for users, not robots.',
      validation: null,
    },
    {
      type: 'text',
      name: 'description',
      title: 'Description',
      description:
        '⚡️ The page description that goes into the <meta name="description"> tag. The meta description gives you an opportunity to control how your document looks in the search results. As with the title, make sure your meta descriptions are clear, concise, and reflective of the content users will find on your page. Ideally between 70-160 characters.',
      validation: Rule => Rule.max(160).error(`The description should not exceed 160 characters.`),
    },
    {
      type: 'array',
      name: 'robots',
      title: 'Robots',
      description:
        'The items that go into the <meta name="robots"> tag. Checking "noindex" instructs search engines not to show the page in search results. ',
      validation: null,
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          'all',
          'index',
          'follow',
          'noindex',
          'nofollow',
          'noimageindex',
          'notranslate',
          'none',
        ],
      },
    },
    {
      type: 'string',
      name: 'readTime',
      title: 'Est. reading time (imported from Wordpress)',
      hidden: true,
    },
    {
      type: 'string',
      name: 'keywords',
      title: 'Keywords for SEO, separated with commas',
      hidden: true,
    },
    {
      type: 'string',
      name: 'synonyms',
      title: 'Similar words to inform the SEO review',
      hidden: true,
    },
    {
      type: 'image',
      name: 'ogImage',
      title: 'OpenGraph image',
      fields: [
        {
          name: 'ogImageAlt',
          title: 'Alt text for the image',
          type: 'text',
        },
      ],
    },
    {
      type: 'object',
      name: 'twitterSeo',
      title: 'Twitter SEO',
      hidden: true,
      fields: [
        {
          type: 'string',
          name: 'twitterTitle',
          title: 'Twitter title',
        },
        {
          type: 'text',
          name: 'twitterDesc',
          title: 'Twitter description',
        },
      ],
    },
    {
      type: 'array',
      name: 'extra',
      title: 'Extra',
      description: 'Additional definition for specific meta tags such as open-graph, twitter, etc.',
      validation: null,
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
              validation: null,
            },
            {
              type: 'string',
              name: 'value',
              title: 'Value',
              validation: null,
            },
            {
              type: 'string',
              name: 'keyName',
              title: 'Key Name',
              initialValue: 'name',
              validation: null,
            },
            {
              type: 'boolean',
              name: 'relativeUrl',
              title: 'Relative Url',
              validation: null,
            },
          ],
          preview: {
            select: {
              title: 'name',
            },
          },
        },
      ],
    },
    // {
    //   type: 'string',
    //   name: 'type',
    //   title: 'Object Type',
    //   description: 'The type of the object',
    //   hidden: false,
    //   validation: (Rule) => Rule.required(),
    //   options: {
    //     list: ['stackbit_page_meta'],
    //   },
    // },
    // {
    //   type: 'string',
    //   name: 'stackbit_model_type',
    //   title: 'Stackbit Model Type',
    //   description: 'Stackbit model type',
    //   hidden: false,
    //   validation: (Rule) => Rule.required(),
    //   options: {
    //     list: ['object'],
    //   },
    // },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
