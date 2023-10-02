export default {
  type: 'document',
  name: 'tag',
  title: 'Recoding topics',
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
      // validation: (Rule) => Rule.required(),
    },
    {
      title: 'Type of topic',
      type: 'string',
      name: 'type',
      options: {
        list: [
          {title: 'Country', value: 'country'},
          {title: 'Issue', value: 'issue'},
          {title: 'Company', value: 'company'},
          {title: 'Policy', value: 'policy'},
        ],
      },
    },
    {
      title: 'Topic description',
      name: 'topicDescription',
      description: 'Anything you want to say about the topic.',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The slug for the topic. Can be the same as the title, but turned into a URL. For example, title-of-guide.',
      // validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
    },
    // {
    //   title: 'Related commentary and analysis',
    //   name: 'relatedCommentary',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [
    //         {
    //           type: 'post',
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Related topics',
    //   name: 'relatedTopics',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'topic'}],
    //     },
    //   ],
    // },
    {
      type: 'string',
      name: 'stackbit_model_type',
      title: 'Recoding page or data',
      description: 'If "page", this tag had a page in Recoding',
      hidden: false,
      options: {
        list: ['page', 'data'],
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
  orderings: [
    {
      title: 'Recoding page',
      name: 'recodingPage',
      by: [{field: 'stackbit_model_type', direction: 'desc'}],
    },
  ],
}
