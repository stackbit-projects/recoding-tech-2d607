export default {
  type: 'object',
  name: 'section_podcast',
  title: 'Podcast embed code',
  fields: [
    {
      title: 'Intro text',
      name: 'intro',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      type: 'text',
      name: 'embed_url',
      title: 'Podcast embed URL',
      description: 'Copy and paste the embed URL from your podcast service',
    },
    {
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['section_podcast'],
      },
    },
  ],
}
