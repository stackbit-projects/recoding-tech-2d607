export default {
  "type": "document",
  "name": "citation",
  "title": "Citation",
  "fields": [
    {
      "type": "string",
      "name": "title"
    },
    {
      "type": "string",
      "name": "shortTitle",
      "title": "Short Title",
    },
    {
      "type": "date",
      "name": "date",
    },
    {
      "type": "array",
      "name": "creators",
      of: [{
        type: 'object',
        fields: [
          {
            name: 'creators',
            title: 'Creators',
            type: 'reference',
            to: { type: 'creator' },
          },
        ],
      }],
    },
    {
      "type": "array",
      "name": "tags",
      of: [{
        type: 'object',
        fields: [
          {
            name: 'tags',
            title: 'Tags',
            type: 'reference',
            to: { type: 'topic' },
          },
        ],
      }],
    },
    {
      "type": "string",
      "name": "url",
      "title": "Website Link",
    },
    {
      "type": "string",
      "name": "websiteTitle",
      "title": "Website Title",
    },
    {
      "type": "string",
      "name": "institution",
    },
    {
      "type": "string",
      "name": "publicationTitle",
      "title": "Publication Title",
    },
    {
      "type": "string",
      "name": "place",
    },
    {
      "type": "string",
      "name": "publisher",
    },
    {
      "type": "string",
      "name": "blogTitle",
      "title": "Blog Title",
    },
    {
      "type": "string",
      "name": "network",
    }
  ]
}
