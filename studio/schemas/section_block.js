export default {
  "type": "object",
  "name": "section_block",
  "title": "Richtext Section",
  "fields": [
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
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['section_block'],
      },
    },
  ]
}