import { prepareConfig } from "sanity";

export default {
    type: 'document',
    name: 'dropdown_option',
    title: 'Dropdown option',
    fields: [
        {
            title: 'Policy action dropdown options',
            name: 'actionTypes',
            type: 'object',
            name: 'entry',
            fields: [
                {
                    name: 'type',
                    title: "Is this entry for a policy action's type or government?",
                    type: 'string',
                    "options": {
                        "list": [
                            { title: 'Type', value: 'actionType' },
                            { title: 'Government', value: 'actionGovt' }
                        ]
                    },
                    validation: (Rule) => Rule.required(),

                },
                {
                    name: 'value',
                    title: 'Enter the option value here',
                    type: 'string',
                    validation: (Rule) => Rule.required(),

                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'entry.value',
        }
    }
}

