import React from 'react'
import sanityClient from '@sanity/client'

import Typography from '@material-ui/core/Typography'

import { htmlToReact, urlify } from '../utils'

/* eslint-disable no-undef */
const client = sanityClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.NEXT_PUBLIC_SANITY_ACCESS_TOKEN,
  useCdn: false // We can't use the CDN for writing
})
/* eslint-enable no-undef */

export default class SectionContent extends React.Component {
  constructor() {
    super()
    this.state = { citations: [] }
    this.fetchAllCitations = () => {
      const query = '*[_type == "citation"] {chicagoCitation}'

      client
        .fetch(query)
        .then(citations =>
          citations.forEach(citation =>
            this.setState({ citations: [...citations, citation] })
          )
        )
    }
  }

  componentDidMount() {
    this.fetchAllCitations()
  }

  render() {
    // console.log(citations)
    return (
      <section className="block block-posts">
        <div className="post-feed">
          <div className="post-feed-inside">
            {this.state.citations.length &&
              this.state.citations.map(citation => (
                <Typography key={citation._id} variant="body1" gutterBottom>
                  {htmlToReact(urlify(citation.chicagoCitation))}
                </Typography>
              ))}
          </div>
        </div>
      </section>
    )
  }
}
