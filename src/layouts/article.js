import React from 'react'
import _ from 'lodash'
import moment from 'moment-strftime'

import { Layout } from '../components/index'
import { htmlToReact, withPrefix, markdownify } from '../utils'

export default class Post extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title underline">
              {_.get(this.props, 'page.title', null)}
            </h1>
            {_.get(this.props, 'page.category', null) && (
              <div className="post-subtitle">
                {htmlToReact(_.get(this.props, 'page.category', null))}
              </div>
            )}
            <time
              className="published"
              dateTime={moment(_.get(this.props, 'page.date', null)).strftime(
                '%Y-%m-%d %H:%M'
              )}
            >
              {moment(_.get(this.props, 'page.date', null)).strftime(
                '%A, %B %e, %Y'
              )}
            </time>
            {_.get(this.props, 'page.topics', null) &&
              this.props.page.topics.map(tag => (
                <div className="post-tag">{tag.name}</div>
              ))}
          </header>
          {_.get(this.props, 'page.content_img_path', null) && (
            <div className="post-image">
              <img
                src={withPrefix(
                  _.get(this.props, 'page.content_img_path', null)
                )}
                alt={_.get(this.props, 'page.content_img_alt', null)}
              />
            </div>
          )}
          <div className="post-content inner-sm">
            {markdownify(_.get(this.props, 'page.content', null))}
          </div>
          <footer className="post-meta inner-sm"></footer>
        </article>
      </Layout>
    )
  }
}
