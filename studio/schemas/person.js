export default {
  "type": "document",
  "name": "person",
  "title": "Person",
  "fields": [
    {
        "type": "string",
        "name": "name",
        "title": "Name",
        "description": "The name of the person",
        "validation": Rule => Rule.required()
    },
  ],
  "preview": {
      "select": {
          "title": "name"
      }
  }
}
