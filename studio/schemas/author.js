export default {
  type: 'document',
  name: 'author',
  title: 'Author',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      description: "author's display name",
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The slug for the article. Can be the same as the title, but turned into a URL. For example, title-of-article.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
    },
    {
      type: 'string',
      name: 'email',
      title: 'Email',
      description: "Author's email",
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'socialMedia',
      title: 'Social media',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'Author photo',
      name: 'photo',
      type: 'image',
    },
    {
      type: 'string',
      name: 'wp_authorId',
      title: "This author's ID on Wordpress",
    },
  ],
}
