import { GovtAutocomplete, TypeAutocomplete } from "../customInputs/policyAction"

export default {
  type: 'document',
  name: 'policy_action',
  title: 'Policy actions',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Policy action name',
      description: 'Official name of the policy action',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The slug for the policy action. Can be the same as the name, but turned into a URL. For example, name-of-policy.',
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
      name: 'type',
      type: 'string',
      title: 'Policy action type',
      description: 'E.g. legislation, proposal, etc.',
      validation: (Rule) => Rule.required(),
      components: {
        input: TypeAutocomplete
      }
    },
    {
      name: 'country',
      type: 'string',
      title: 'Country',
      description: "The policy actions's country of origin",
      validation: (Rule) => Rule.required(),
      components: {
        input: GovtAutocomplete
      }


      // {
      //   name: 'country',
      //   type: 'reference',
      //   title: 'Country',
      //   description: "The policy actions's country of origin",
      //   to: [{type: 'topic'}],
      //   options: {
      //     filter: 'type == $type',
      //     filterParams: {type: 'country'},
      //   },
      // validation: (Rule) => Rule.required(),
    },
    {
      name: 'dateInitiated',
      title: 'Date initiated',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Current status of policy',
      type: 'string',
      description: 'E.g. passed by committee, enacted, etc.',
    },
    {
      name: 'lastUpdate',
      title: 'Date of last update',
      type: 'datetime',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'portable_text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'relatedCitations',
      title: 'Further reading',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'citation',
            },
            {
              type: 'post'
            }
          ],
        },
      ],
    },
    {
      name: 'relatedDocs',
      title: 'Related primary documents',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Primary document',
          fields: [
            {
              title: 'Document title',
              type: 'string',
              name: 'title',
            },
            {
              title: 'Document',
              type: 'file',
              name: 'file',
            },
          ],
        },
      ],
    },
    {
      name: 'relatedTopics',
      title: 'Related topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topic' }],
          options: {
            filter: 'stackbit_model_type == $stackbit_model_type',
            filterParams: { stackbit_model_type: 'page' },
          },
        },
      ],
    },
    {
      type: 'stackbit_page_meta',
      name: 'seo',
      title: 'SEO',
      validation: null,
    },
    {
      type: 'string',
      name: 'layout',
      title: 'Layout',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['policy_action'],
      },
    },
  ],
}
