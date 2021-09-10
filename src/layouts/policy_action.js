import React from 'react'
import _ from 'lodash'
import moment from 'moment-strftime'

import { Layout } from '../components/index'
import { htmlToReact, Link, markdownify } from '../utils'

import Grid from '@material-ui/core/Grid'

export default class PolicyAction extends React.Component {
  render() {
    let relatedDocs = _.get(this.props.page, 'relatedDocs', null)
    let relatedTopics = _.get(this.props.page, 'relatedTopics', null)
    let relatedCitations = _.get(this.props.page, 'relatedCitations', null)
    return (
      <Layout {...this.props}>
        <header className="post-header inner-sm">
          <h1 className="post-title underline">
            {_.get(this.props, 'page.title', null)}
          </h1>
          {_.get(this.props, 'page.type', null) && (
            <div className="post-subtitle">
              Policy type: {htmlToReact(_.get(this.props, 'page.type', null))}
            </div>
          )}
          {_.get(this.props, 'page.country', null) && (
            <div className="post-subtitle">
              Country: {htmlToReact(_.get(this.props, 'page.country', null))}
            </div>
          )}
          <time
            className="published"
            dateTime={moment(
              _.get(this.props, 'page.dateInitiated', null)
            ).strftime('%Y-%m-%d %H:%M')}
          >
            Date initiated:{' '}
            {moment(_.get(this.props, 'page.dateInitiated', null)).strftime(
              '%B %e, %Y'
            )}
          </time>
          {_.get(this.props, 'page.status', null) && (
            <div className="post-subtitle">
              Status: {htmlToReact(_.get(this.props, 'page.status', null))}
            </div>
          )}
          <time
            className="published"
            dateTime={moment(
              _.get(this.props, 'page.lastUpdate', null)
            ).strftime('%Y-%m-%d %H:%M')}
          >
            Last update:{' '}
            {moment(_.get(this.props, 'page.lastUpdate', null)).strftime(
              '%B %e, %Y'
            )}
          </time>
        </header>
        <div className="post-content inner-sm">
          <h2>Summary</h2>
          {markdownify(_.get(this.props, 'page.summary', null))}
        </div>
        <footer className="post-meta inner-sm">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              Related Primary Documents:
              {relatedDocs &&
                relatedDocs.map(doc => (
                  <div key={doc.assetId}>
                    <Link className="post-thumbnail" href={doc.url}>
                      {doc.originalFilename}
                    </Link>
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              Related Topics:
              {relatedTopics &&
                relatedTopics.map(topic => (
                  <div key={topic.id}>
                    <Link
                      className="post-thumbnail"
                      href={`/topics/${topic.name}`}
                    >
                      {topic.name}
                    </Link>
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              Further reading:
              {relatedCitations &&
                relatedCitations.map(citation => (
                  <div key={citation.id}>
                    <Link className="post-thumbnail" href={`${citation.url}`}>
                      {citation.title}
                    </Link>
                  </div>
                ))}
            </Grid>
          </Grid>
        </footer>
      </Layout>
    )
  }
}
