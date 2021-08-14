import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import { Layout } from "../components/index";
import { htmlToReact, withPrefix, markdownify } from "../utils";

export default class Syllabus extends React.Component {
  render() {
    console.log("hello it's the syllabus component", this.props.page)
    return (
      <Layout {...this.props}>
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title underline">
              {_.get(this.props, "page.title", null)}
            </h1>
            {_.get(this.props, "page.subtitle", null) && (
              <div className="post-subtitle">
                {htmlToReact(_.get(this.props, "page.subtitle", null))}
              </div>
            )}
            {_.get(this.props, "page.author.name", null) && (
              <div className="post-content inner-sm">
                {" "}
                By {htmlToReact(_.get(this.props, "page.author.name", null))}
              </div>
            )}
            {_.get(this.props, "page.datePublished", null) && (
              <div className="post-content inner-sm">
                {" "}
                {moment(_.get(this.props, "page.datePublished", null)).strftime(
                  "%B %e, %Y"
                )}
              </div>
            )}
            {/* {_.get(this.props, "page.tags", null) &&
              this.props.page.tags.map((tag) => (
                <div className="post-tag">{tag.label}</div>
              ))} */}
          </header>
          {_.get(this.props, "page.content_img_path", null) && (
            <div className="post-image">
              <img
                src={withPrefix(
                  _.get(this.props, "page.content_img_path", null)
                )}
                alt={_.get(this.props, "page.content_img_alt", null)}
              />
            </div>
          )}
          {/* <div className="post-content inner-sm">
            {markdownify(_.get(this.props, "page.content", null))}
          </div> */}
          {/* <footer className="post-meta inner-sm">
            <time
              className="published"
              dateTime={moment(_.get(this.props, "page.date", null)).strftime(
                "%Y-%m-%d %H:%M"
              )}
            >
              {moment(_.get(this.props, "page.date", null)).strftime(
                "%A, %B %e, %Y"
              )}
            </time>
          </footer> */}
        </article>
      </Layout>
    );
  }
}
