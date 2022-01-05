export default {
  name: "portable_text",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block",
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 1', value: 'h2'},
        {title: 'Heading 2', value: 'h3'},
        {title: 'Heading 3', value: 'h4'},
        {title: 'Heading 4', value: 'h5'},
        {title: 'Heading 5', value: 'h6'},
        {title: 'Quote', value: 'blockquote'}
      ]
    },
    {
      type: "image"
    },
    {
      name: "reference",
      type: "reference",
      to: [{ type: "citation" }]
    }
  ]
};
