import React from 'react'
import _ from 'lodash'
import moment from 'moment-strftime'

import { Layout } from '../components/index'
import { htmlToReact, withPrefix, markdownify } from '../utils'

export default class Policy extends React.Component {
  render() {
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
      </Layout>
    )
  }
}
