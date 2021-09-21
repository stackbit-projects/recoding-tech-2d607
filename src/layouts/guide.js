import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import BlockContent from '@sanity/block-content-to-react'

import { Layout } from "../components/index";
import { htmlToReact, withPrefix, markdownify } from "../utils";

const serializer = {
  types: {
    reference: (props) => <h1>hello</h1>,
  },
};

export default function Guide(props) {
    return (
      <Layout {...props}>
        {/* <BlockContent blocks={props.page.content} serializers={serializer}/> */}
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title underline">
              {_.get(props, "page.title", null)}
            </h1>
            {_.get(props, "page.subtitle", null) && (
              <div className="post-subtitle">
                {htmlToReact(_.get(props, "page.content", null))}
              </div>
            )}
            {_.get(props, "page.author.name", null) && (
              <div className="post-content inner-sm">
                {" "}
                By {htmlToReact(_.get(props, "page.author.name", null))}
              </div>
            )}
            {_.get(props, "page.datePublished", null) && (
              <div className="post-content inner-sm">
                {" "}
                {moment(_.get(props, "page.datePublished", null)).strftime(
                  "%B %e, %Y"
                )}
              </div>
            )}
            {/* {_.get(props, "page.tags", null) &&
              props.page.tags.map((tag) => (
                <div className="post-tag">{tag.label}</div>
              ))} */}
          </header>
          {_.get(props, "page.content_img_path", null) && (
            <div className="post-image">
              <img
                src={withPrefix(
                  _.get(props, "page.content_img_path", null)
                )}
                alt={_.get(props, "page.content_img_alt", null)}
              />
            </div>
          )}
          {/* <div className="post-content inner-sm">
            {markdownify(_.get(props, "page.content", null))}
          </div> */}
          {/* <footer className="post-meta inner-sm">
            <time
              className="published"
              dateTime={moment(_.get(props, "page.date", null)).strftime(
                "%Y-%m-%d %H:%M"
              )}
            >
              {moment(_.get(props, "page.date", null)).strftime(
                "%A, %B %e, %Y"
              )}
            </time>
          </footer> */}
        </article>
      </Layout>
    );
  }

