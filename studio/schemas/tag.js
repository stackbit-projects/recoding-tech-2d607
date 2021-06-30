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
  ],
  "preview": {
      "select": {
          "title": "name"
      }
  }
}
