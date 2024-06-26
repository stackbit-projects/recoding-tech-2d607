import '@babel/polyfill'
import dotenv from 'dotenv'
import sanityClient from '@sanity/client'

import { writeToPath } from '@fast-csv/format';
import path from 'path'

dotenv.config()

const client = sanityClient({
    apiVersion: process.env.SANITY_API_VERSION,
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_ACCESS_TOKEN,
    useCdn: false // We can't use the CDN for writing
})

const authorQuery = '*[_type == "author"] { name } | order(name asc)'

const downloadAuthors = async () => {
    const authors = await client.fetch(authorQuery)
    return authors.map(author => [author.name])
}

const main = async () => {
    const allAuthors = await downloadAuthors()

    writeToPath(path.resolve('authors.csv'), allAuthors)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
}

main()