export default {
  type: 'document',
  name: 'post',
  title: 'Posts',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'The title of the post.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The slug for the article. Can be the same as the title, but turned into a URL. For example, title-of-article.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
    },
    {
      title: 'Author',
      name: 'authors',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'author' },
        },
      ],
    },
    {
      type: 'datetime',
      name: 'date',
      validation: (Rule) => Rule.required(),
      title: 'Published date',
    },
    {
      type: 'image',
      name: 'featuredImage',
      title: 'Featured image',
      fields: [
        {
          name: 'caption',
          type: 'array',
          of: [{ type: 'block' }],
          title: 'Caption',
        },
        {
          name: 'altText',
          title: 'Alt text for the image',
          type: 'text',
        },
      ]
    },
    {
      title: 'Content',
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          title: 'Image',
          name: 'Image',
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'array',
              of: [{ type: 'block' }],
              title: 'Caption',
            },
            {
              name: 'altText',
              title: 'Alt text for the image',
              type: 'text',
            },
            {
              name: 'wordpressCaption',
              type: 'string',
              title: 'Caption from Wordpress',
            },
          ],
        },
        {
          title: 'iFrame Embed',
          name: 'iframeEmbed',
          type: 'iframeEmbed',
        },
        {
          title: 'PDF',
          name: 'PDF',
          type: 'file',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'author',
              type: 'string',
              title: 'File author',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
          ],
        },
      ],
    },
    {
      type: 'string',
      name: 'tocTitle',
      title: 'Table of Contents Title',
      description: 'Title for the table of contents section'
    },
    {
      name: "toc",
      title: "Table of contents",
      description: "Copy and paste your subheadings here",
      validation: null,
      type: "array",
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
          ],
        }
      ]
    },
    {
      title: 'Related topics',
      name: 'relatedTopics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topic' }],
        },
      ],
    },
    {
      type: 'stackbit_page_meta',
      name: 'seo',
      title: 'SEO',
      validation: null,
    },
    {
      type: 'string',
      name: 'link',
      title: 'Wordpress link',
      validation: null,
    },
    {
      type: 'string',
      name: 'postId',
      title: 'Wordpress post id',
      validation: null,
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishDateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishDateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
}
