export default {
  type: "document",
  name: "syllabusQuestion",
  title: "Syllabus questions",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      description:
        "A subheading for the syllabus, usually in the form of a question, e.g. 'Why is disinformation important?'",
    },
    {
      name: "answerBlurb",
      title: "Answer blurb",
      type: "markdown",
      description: "Blurb to answer the above subheading question",
    },
    {
      name: "citations",
      title: "Citations",
      type: "array",
      type: "array",
      of: [{
        type: "reference",
        to: [{
          type: "citation"
        }, {
          type: "article"
        }]
      }],
      description: "Further recommended reading for the subheading question",
    },
  ],
};
