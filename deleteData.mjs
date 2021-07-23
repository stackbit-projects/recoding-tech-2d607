import '@babel/polyfill'
import dotenv from 'dotenv'
import sanityClient from '@sanity/client'

dotenv.config()

const deleteData = function () {
  const client = sanityClient({
    apiVersion: process.env.SANITY_API_VERSION,
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_ACCESS_TOKEN,
    useCdn: false // We can't use the CDN for writing
  })

  const queries = [
    '*[_type == "citation"]',
    '*[_type == "topic"]',
    '*[_type == "creator"]'
  ]

  queries.forEach(query => {
    client.fetch(query).then(documents => {
      documents.forEach(document => {
        client
          .delete(document._id)
          .then((res) => {
            console.log(`Document ${document._id} deleted.`)
          })
          .catch((err) => {
            console.error('Delete failed: ', err.message)
          })
      })
    })
  })
  // chicago full note 17th edition
}

deleteData()
