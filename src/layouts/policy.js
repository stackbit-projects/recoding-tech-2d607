import React from 'react'
import _ from 'lodash'
import moment from 'moment-strftime'

import { Layout } from '../components/index'

export default class Policy extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <header className="post-header inner-sm">
          <h1 className="post-title underline">
            {_.get(this.props, 'page.name', null)}
          </h1>
        </header>
      </Layout>
    )
  }
}
