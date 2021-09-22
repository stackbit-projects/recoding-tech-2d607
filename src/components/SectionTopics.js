import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import { getArticles, Link, withPrefix } from "../utils";
import CtaButtons from "./CtaButtons";

export default class SectionTopics extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    let display_articles = _.orderBy(
      getArticles(this.props.pages),
      "date",
      "desc"
    );
    let recent_articles = display_articles.slice(
      0,
      _.get(section, "articles_number", null)
    );
    return (
      <section
        id={_.get(section, "section_id", null)}
        className="block block-posts"
      >
        {_.get(section, "title", null) && (
          <h2 className="block-title underline inner-sm">
            {_.get(section, "title", null)}
          </h2>
        )}
        <div className="post-feed">
          <div className="post-feed-inside">
            {_.map(recent_articles, (article, post_idx) => (
              <article key={post_idx} className="post post-card">
                <div className="post-inside">
                  {_.get(article, "img_path", null) && (
                    <Link
                      className="post-thumbnail"
                      href={`/articles${withPrefix(
                        _.get(article, "slug", null)
                      )}`}
                    >
                      <img
                        src={withPrefix(_.get(article, "img_path", null))}
                        alt={_.get(article, "img_alt", null)}
                      />
                    </Link>
                  )}
                  <header className="post-header">
                    <h3 className="post-title">
                      <Link
                        href={`/articles${withPrefix(
                          _.get(article, "slug", null)
                        )}`}
                        rel="bookmark"
                      >
                        {_.get(article, "title", null)}
                      </Link>
                    </h3>
                  </header>
                  {_.get(article, "category", null) && (
                    <div className="post-content">
                      {_.get(article, "topics", null) &&
                        article.topics.map(tag => (
                          <div key={tag.name} className="post-tag">
                            {tag.name}
                          </div>
                        ))}
                      <p>{_.get(article, "category", null)}</p>
                    </div>
                  )}
                  <footer className="post-meta">
                    <time
                      className="published"
                      dateTime={moment(_.get(article, "date", null)).strftime(
                        "%Y-%m-%d %H:%M"
                      )}
                    >
                      {moment(_.get(article, "date", null)).strftime(
                        "%B %d, %Y"
                      )}
                    </time>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
        {_.get(section, "actions", null) && (
          <div className="block-buttons inner-sm">
            <CtaButtons
              {...this.props}
              actions={_.get(section, "actions", null)}
            />
          </div>
        )}
      </section>
    );
  }
}
