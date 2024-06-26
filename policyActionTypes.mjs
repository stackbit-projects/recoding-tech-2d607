/**
 * 
 * importing and then exporting policy action types
 */

import '@babel/polyfill'
import dotenv from 'dotenv'
import sanityClient from '@sanity/client'

dotenv.config()

const client = sanityClient({
    apiVersion: process.env.SANITY_API_VERSION,
    dataset: 'production',
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_ACCESS_TOKEN,
    useCdn: false // We can't use the CDN for writing
})

const query = `*[_type == "policy_action"] { country, type, title }`

const downloadTypes = async () => {
    const actions = await client.fetch(query)
    const types = []
    const govts = []
    actions.map(action => {
        types.push(action.type)
        govts.push(action.country)
    })

    //dedup the array and 
    const deduped = {
        types: [...new Set(types)].map(type => {
            return {
                _type: "dropdown_option",
                entry: {
                    type: 'actionType',
                    value: type
                }
            }

        }),
        govts: [...new Set(govts)].map(govt => {
            return {
                _type: "dropdown_option",
                entry: {
                    type: 'actionGovt',
                    value: govt
                }
            }
        })
    }

    return deduped
}

const main = async () => {
    const toUpload = await downloadTypes()

    toUpload.types.forEach(type => {
        client.create(type)
            .then((doc) => {
                console.log("File updated! New document: ");
                console.log(doc);
            })
            .catch((err) => {
                console.error("Update failed: ", err.message);
            })
    })

    toUpload.govts.forEach(govt => {
        client.create(govt)
            .then((doc) => {
                console.log("File updated! New document: ");
                console.log(doc);
            })
            .catch((err) => {
                console.error("Update failed: ", err.message);
            })
    })
}

main()