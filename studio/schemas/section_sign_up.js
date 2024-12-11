export default {
  "type": "object",
  "name": "section_sign_up",
  "title": "Newsletter Sign Up Form",
  "fields": [
    {
      type: 'string',
      name: 'section_id',
      title: 'Element ID',
      description:
        'A unique identifier that can be used when linking to this section, if any. Must not contain whitespace.',
      validation: null,
    },
    {
      type: 'array',
      name: 'topics',
      title: 'Topics',
      description: 'Newsletter topics',
      validation: null,
      of: [
        {
          type: 'newsletter_topic',
        },
      ],
    },
    {
      type: "string",
      name: "type",
      title: "Object Type",
      description: "The type of the object",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["section_sign_up"],
      },
    },
  ]
}