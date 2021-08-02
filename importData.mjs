import '@babel/polyfill'
import '@babel/polyfill/noConflict'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import sanityClient from '@sanity/client'
import { RateLimiter } from 'limiter'

dotenv.config()

const importData = function () {
  const client = sanityClient({
    apiVersion: process.env.SANITY_API_VERSION,
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_ACCESS_TOKEN,
    useCdn: false // We can't use the CDN for writing
  })

  const limiter = new RateLimiter({ tokensPerInterval: 10, interval: 'second' })

  let start = 0
  let limit = 25
  const URL = `https://api.zotero.org/groups/${process.env.ZOTERO_GROUP_ID}/items?format=json&include=data,citation&style=chicago-fullnote-bibliography&limit=${limit}&start=${start}`

  async function fetchData (url = '') {
    const response = await fetch(url, {
      headers: {
        'Zotero-API-Version': process.env.ZOTERO_API_VERSION,
        'Zotero-API-Key': process.env.ZOTERO_API_KEY
      }
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  const flatten = arr => {
    if (arr) {
      return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
      }, [])
    }
  }

  const transform = (externalCitation) => {
    console.log(`Found citation ${externalCitation.key}`)
    let creators = []
    let tags = []

    externalCitation.data.creators.map((creator, index) => {
      const date = new Date()
      const now = date.getMilliseconds().toString()
      const item = {
        _type: 'creator',
        _id: `creator-${now}-${index}`,
        _key: `creator-${now}-${index}`,
        firstName: creator.firstName,
        lastName: creator.lastName,
        creatorType: creator.creatorType
      }
      return creators.push(item)
    })

    externalCitation.data.tags.map((tag, index) => {
      const date = new Date()
      const now = date.getMilliseconds().toString()
      const item = {
        _type: 'topic',
        _id: `topic-${now}-${index}`,
        _key: `topic-${now}-${index}`,
        name: tag.tag
      }
      return tags.push(item)
    })

    const citation = {
      _id: externalCitation.key,
      _type: 'citation',
      shortTitle: externalCitation.data.shortTitle,
      title: externalCitation.data.title,
      date: externalCitation.meta.parsedDate,
      creators: creators,
      topics: tags,
      url: externalCitation.data.url,
      websiteTitle: externalCitation.data.websiteTitle,
      institution: externalCitation.data.institution,
      publicationTitle: externalCitation.data.publicationTitle,
      place: externalCitation.data.place,
      publisher: externalCitation.data.publisher,
      blogTitle: externalCitation.data.blogTitle,
      network: externalCitation.data.network,
      chicagoCitation: externalCitation.citation
    }
    return [creators, tags, citation]
  }

  async function sendRequest () {
    // This call will throw if we request more than the maximum number of requests
    // that were set in the constructor
    // remainingRequests tells us how many additional requests could be sent
    // right this moment
    const remainingRequests = await limiter.removeTokens(1)
    console.log(`Remaining requests: ${remainingRequests}`)
    console.log('Fetching citations...')
    fetchData(URL)
      .then(citations => {
        console.log('Parsing citations...')
        start = citations.length
        return citations.map(transform)
        // if (citations.length < 1) {
        //   limit = 0
        // } else if (citations.length < limit) {
        //   limit = citations.length
        //   citations.map(transform)
        // } else {
        //   citations.map(transform)
        // }
      })
      .then(docs =>
        // docs is now an array of [creators, tags, citation], so we need to flatten it
        flatten(docs)
      )
      .then(documents => {
        // now we have all our documents and are ready to save them to our dataset
        if (documents) {
          const transaction = client.transaction()
          documents.forEach(document => {
            transaction.createOrReplace(document)
          })
          console.log('Committing transaction...')
          return transaction.commit()
        }
      })
  }

  sendRequest()
  // chicago full note 17th edition
}

importData()
