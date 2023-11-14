export default {
  type: 'object',
  name: 'creator',
  title: 'Citation creators',
  fields: [
    {
      type: 'string',
      name: 'lastName',
      title: 'Last Name',
    },
    {
      type: 'string',
      name: 'firstName',
      title: 'First Name',
    },
    {
      type: 'string',
      name: 'creatorType',
      title: 'Type',
    },
  ],
  preview: {
    select: {
      title: 'lastName',
    },
  },
}
