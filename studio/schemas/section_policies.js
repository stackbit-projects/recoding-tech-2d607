export default {
  type: 'object',
  name: 'section_policies',
  title: 'Policy Tracker Section',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'The title of the section.',
      validation: null
    },
    {
      type: 'string',
      name: 'section_id',
      title: 'Element ID',
      description:
        'A unique identifier that can be used when linking to this section. Must not contain whitespace.',
      validation: null
    },
    {
      type: 'number',
      name: 'policies_number',
      title: 'Number of policies to display',
      validation: Rule => Rule.required().integer()
    },
    {
      type: 'array',
      name: 'actions',
      title: 'Action Buttons',
      validation: null,
      of: [
        {
          type: 'action'
        }
      ]
    },
    {
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ['section_policies']
      }
    },
    {
      type: 'string',
      name: 'stackbit_model_type',
      title: 'Stackbit Model Type',
      description: 'Stackbit model type',
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ['object']
      }
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
