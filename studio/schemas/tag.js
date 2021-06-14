export default {
  "type": "document",
  "name": "topic",
  "title": "Topic",
  "fields": [
    {
        "type": "string",
        "name": "name",
        "title": "Name",
        "description": "The name of the topic",
        "validation": Rule => Rule.required()
    },
    {
        "type": "string",
        "name": "description",
        "title": "Description",
        "description": "Describe the topic",
    },
    {
        "title": "Types",
        "name": "type",
        "type": "array",
        "of": [{"type": "string"}]
    }

  ],
  "preview": {
      "select": {
          "title": "name"
      }
  }
}
