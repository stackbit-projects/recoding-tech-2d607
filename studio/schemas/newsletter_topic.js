export default {
    type: "object",
    name: "newsletter_topic",
    title: "Newsletter Topic",
    fields: [
        {
            title: 'Name',
            type: 'string',
            name: 'name',
            description: 'The name of the topic.',
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Description',
            type: 'string',
            name: 'description',
            description: 'The topic description.',
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Frequency',
            type: 'string',
            name: 'type',
            options: {
              list: [
                {title: 'Weekly', value: 'weekly'},
                {title: 'Monthly', value: 'monthly'},
                {title: 'Quarterly', value: 'quarterly'},
              ],
            },
        },
        {
            title: 'MailerLite ID',
            type: 'string',
            name: 'mailerlite_id',
            description: 'ID of the topic in MailerLite.',
            validation: (Rule) => Rule.required(),
        },
    ],
    preview: {
      select: {
        title: "name"
      }
    }
  };
  