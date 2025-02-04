import { AlignLeftIcon, AlignRightIcon, AlignCenterIcon } from '../components/icons'
import { TextAlign } from '../components/text-align'

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
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: 'Left', value: 'left', icon: AlignLeftIcon, component: TextAlign },
              { title: 'Center', value: 'center', icon: AlignCenterIcon, component: TextAlign },
              { title: 'Right', value: 'right', icon: AlignRightIcon, component: TextAlign },
            ],
            annotations: [
              {
                type: 'object',
                name: 'link',
                fields: [
                  { type: 'string', name: 'href' },
                ],
              },
            ]
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
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
        {
          title: 'Custom HTML',
          name: 'customHtml',
          type: 'customHtml',
        },
      ],
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
      title: 'Related Articles',
      name: 'relatedArticles',
      type: 'array',
      of: [
        {
          title: 'Reference to related article',
          type: 'reference',
          to: [
            {
              type: 'post',
            },
          ],
          options: {
            disableNew: true,
            filter: async ({document, getClient}) => {
              if (!document.relatedTopics || document.relatedTopics.length === 0)
                return { filter: '', params: {} }

              const client = getClient({apiVersion: '2023-01-01'})
              const tags = document.relatedTopics.map((topic) => topic._ref).join('", "')
              const query = document.relatedTopics.map((topic) => `references("${topic._ref}")`).join(' || ')
              const postIds = await client.fetch(
                `*[!(_id in path("drafts.**")) && _type == "post" && (${query})]
                  {_id, "count": count((relatedTopics[]->_id)[@ in ["${tags}"]])}
                  |order(coalesce(count, -1) desc)[0...51]`
              )

              return {
                filter: '_id in $postIds',
                params: {postIds: postIds.filter(post => post._id !== document._id.replace(/^drafts\./, '')).map((post) => post._id)},
              }
            },
          },
        },
        {
          type: 'reference',
          name: 'all_posts',
          title: 'Reference to article',
          to: [
            {
              type: 'post',
            },
          ],
          options: {
            disableNew: true,
          },
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
      type: 'boolean',
      name: 'disableNewsletterSignup',
      title: 'Disable the Newsletter Signup block',
      validation: null,
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
      hidden: true
    },
    {
      type: 'string',
      name: 'postId',
      title: 'Wordpress post id',
      validation: null,
      hidden: true
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
