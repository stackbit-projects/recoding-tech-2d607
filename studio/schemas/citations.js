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
      of: [
        {
          type: 'author',
          title: 'Author'
        }
      ]
    },
  ]
}
