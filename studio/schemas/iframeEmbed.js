export default {
  name: 'iframeEmbed',
  type: 'object',
  title: 'iFrame embed',
  fields: [
    {
      name: 'embedScript',
      type: 'text',
      title: 'Embed script',
    },
    {
      name: 'url',
      type: 'text',
      title: 'iFrame URL',
    },
    {
      name: 'embedType',
      type: 'string',
      title: 'Source/type of iFrame embed',
    },
    {
      name: 'style',
      type: 'string',
      title: 'Embed style imported from Wordpress',
    },
  ],
  preview: {
    select: {
      title: 'url',
    },
  },
}
