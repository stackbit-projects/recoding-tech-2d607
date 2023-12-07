export default {
  type: 'document',
  name: 'uploadedFile',
  title: 'File uploads',
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'File title',
      type: 'string',
    },
    {
      name: 'theFile',
      title: 'Upload file',
      type: 'file',
    },
    {
      name: 'image',
      title: 'Upload image',
      type: 'image'
    },
    {
      name: 'parentPost',
      title: 'Tech Policy Press post associated with this PDF',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
    },
    {
      name: 'pubDate',
      title: 'Uploaded date',
      type: 'datetime',
    },
    {
      name: 'url',
      type: 'string',
      title: 'Wordpress URL',
    },
  ],
}
