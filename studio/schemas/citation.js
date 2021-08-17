export default {
  type: 'document',
  name: 'citation',
  title: 'Citation',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'string',
      name: 'shortTitle',
      title: 'Short Title'
    },
    {
      type: 'date',
      name: 'date'
    },
    {
      type: 'array',
      name: 'creators',
      of: [
        {
          title: 'Creator',
          type: 'creator'
        },
        {
          title: 'Name',
          type: 'object',
          fields: [
            {
              title: 'Last Name',
              name: 'lastName',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      type: 'array',
      name: 'topics',
      of: [
        {
          title: 'Topic',
          type: 'topic'
        },
        {
          title: 'Name',
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      type: 'string',
      name: 'url',
      title: 'Website Link'
    },
    {
      type: 'string',
      name: 'websiteTitle',
      title: 'Website Title'
    },
    {
      type: 'string',
      name: 'institution'
    },
    {
      type: 'string',
      name: 'publicationTitle',
      title: 'Publication Title'
    },
    {
      type: 'string',
      name: 'place'
    },
    {
      type: 'string',
      name: 'publisher'
    },
    {
      type: 'string',
      name: 'blogTitle',
      title: 'Blog Title'
    },
    {
      type: 'string',
      name: 'network'
    },
    {
      type: 'string',
      name: 'chicagoCitation',
      title: 'Chicago Citation'
    }
  ]
}
