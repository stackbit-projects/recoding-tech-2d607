export default {
  type: 'document',
  name: 'author',
  title: 'Authors',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      description: "Author's display name",
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'The slug for the author.',
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
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'socials',
      title: 'Social links, comma separated',
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
      name: 'specialTitle',
      title: 'A secondary title, if this person has one, eg. Co-Founder and CEO',
    },
  ],
  orderings: [
    {
      title: 'Recently created',
      name: 'byId',
      by: [{field: '_id', direction: 'desc'}],
    },
  ],
}
