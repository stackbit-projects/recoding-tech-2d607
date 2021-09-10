export default {
  type: "document",
  name: "subheadingQuestion",
  title: "Subheading questions for quick start guides",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      description:
        "A subheading for the quick start guide, usually in the form of a question, e.g. 'Why is disinformation important?'",
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
      of: [
        {
          type: "reference",
          to: [
            {
              type: "citation",
            },
            {
              type: "article",
            },
          ],
        },
      ],
      description: "Further recommended reading for the subheading question",
    },
  ],
};
