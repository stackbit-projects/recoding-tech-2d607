import '@babel/polyfill'
import dotenv from 'dotenv'
import sanityClient from '@sanity/client'
import { RateLimiter } from 'limiter'

dotenv.config()

const client = sanityClient({
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: false // We can't use the CDN for writing
})

const queries = ['*[_type == "citation"]', '*[_type == "tag"]', '*[_type == "creator"]']

const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 'second' })

async function deleteData () {
  // This call will throw if we request more than the maximum number of requests
  // that were set in the constructor
  // remainingRequests tells us how many additional requests could be sent
  // right this moment
  queries.forEach(function (query) {
    client.fetch(query).then(function (documents) {
      documents.forEach(function (document) {
        client.delete(document._id).then(function (res) {
          console.log('Document '.concat(document._id, ' deleted.'))
        }).catch(function (err) {
          console.error('Delete failed: ', err.message)
        })
      })
    })
  })
}

async function sendRequest () {
  // This call will throw if we request more than the maximum number of requests
  // that were set in the constructor
  // remainingRequests tells us how many additional requests could be sent
  // right this moment
  const remainingRequests = await limiter.removeTokens(1)
  deleteData()
}

sendRequest()
