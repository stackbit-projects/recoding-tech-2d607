export default {
  type: 'document',
  name: 'topic',
  title: 'Topics',
  fields: [
    {
      title: 'Name',
      type: 'string',
      name: 'name',
      description: 'The name of the topic.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Display name',
      type: 'string',
      name: 'displayName',
      description: 'How you want the name of the topic to appear on the front-end',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Topic description',
      name: 'description',
      description: 'Anything you want to say about the topic.',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'Category or post_tag',
      type: 'string',
      name: 'domain',
      description: 'How the topic was classified on Wordpress',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The slug for the topic. Can be the same as the title, but turned into a URL. For example, title-of-guide.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'displayName',
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
      title: 'Related commentary and analysis',
      name: 'relatedCommentary',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'post',
            },
          ],
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
          to: [{type: 'topic'}],
        },
      ],
    },
    {
      type: 'stackbit_page_meta',
      name: 'seo',
      title: 'SEO',
      validation: null,
    },
    // {
    //   title: "Topic description",
    //   type: "markdown",
    //   name: "topicDescription",
    //   description: "Anything you want to say about the topic.",
    // },
    {
      type: 'string',
      name: 'stackbit_model_type',
      title: 'Stackbit Model Type',
      description: 'Stackbit model type',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['page', 'data'],
      },
    },
  ],
  orderings: [
    {
      title: 'Category first',
      name: 'byCategory',
      by: [{field: '_id', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'displayName',
    },
  },
}

/**  {
      title: "Display title",
      type: "string",
      name: "displayTitle",
      description:
        "How you want the name of the topic to appear on the front-end",
      validation: (Rule) => Rule.required(),
    },
{
      title: "Type of topic",
      type: "string",
      name: "type",
      options: {
        list: [
          { title: "Country", value: "country" },
          { title: "Issue", value: "issue" },
          { title: "Company", value: "company" },
          { title: "Policy", value: "policy" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
 {
      title: "Fast facts",
      type: "markdown",
      name: "fastFacts",
      description: "Featured stats and facts about the topic.",
    },
    */
