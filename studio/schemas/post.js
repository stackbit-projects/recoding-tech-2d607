export default {
  type: "document",
  name: "post",
  title: "Post",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Title",
      description: "The title of the post.",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "The slug for the article. Can be the same as the title, but turned into a URL. For example, title-of-article.",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .slice(0, 200),
      },
    },
    {
      title: "Author",
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      title: "Content",
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          title: "Image",
          name: "Image",
          type: "image",
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    },
    {
      type: "string",
      name: "metaDescription",
      title: "Meta description",
      validation: null,
    },
    {
      type: "datetime",
      name: "date",
      title: "Published date",
    },
    {
      type: "string",
      name: "link",
      title: "Wordpress link",
      validation: null,
    },
    {
      type: "string",
      name: "postId",
      title: "Wordpress post id",
      validation: null,
    },
    {
      title: "Related topics",
      name: "relatedTopics",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "topic" }],
        },
      ],
    },
    {
      type: "image",
      name: "postImage",
      title: "Image for the post",
    },
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishDateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishDateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
};
