import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment-strftime";

import { Link, withPrefix } from "../utils";
import CtaButtons from "./CtaButtons";

// utils
import client from "../utils/sanityClient";

const query = `*[_type == "policy_action"]{category, dateInitiated, img_alt, img_path, slug, title, topics}`;

let policies = [];

client.fetch(query).then((allPolicies) => {
  allPolicies.forEach((policy) => {
    policies = [...policies, policy];
  });
});

const SectionPolicyActions = (props) => {
  let section = _.get(props, "section", null);
  let [displayPolicies, setDisplayPolicies] = useState([]);
  let recent_policies = displayPolicies.slice(
    0,
    _.get(section, "policies_number", null)
  );

  useEffect(() => {
    if (policies.length) {
      const sortedPolicies = _.orderBy(policies, "date", "desc");
      setDisplayPolicies(sortedPolicies);
    }
  }, [policies]);

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
          {_.map(recent_policies, (policy, post_idx) => (
            <article key={post_idx} className="post post-card">
              <div className="post-inside">
                {_.get(policy, "img_path", null) && (
                  <Link
                    className="post-thumbnail"
                    href={`/policies${withPrefix(_.get(policy, "slug", null))}`}
                  >
                    <img
                      src={withPrefix(_.get(policy, "img_path", null))}
                      alt={_.get(policy, "img_alt", null)}
                    />
                  </Link>
                )}
                <header className="post-header">
                  <h3 className="post-title">
                    <Link
                      href={`/policies${withPrefix(
                        _.get(policy, "slug", null)
                      )}`}
                      rel="bookmark"
                    >
                      {_.get(policy, "title", null)}
                    </Link>
                  </h3>
                </header>
                {_.get(policy, "category", null) && (
                  <div className="post-content">
                    {_.get(policy, "topics", null) &&
                      policy.topics.map((tag) => (
                        <div key={tag.slug} className="post-tag">
                          {tag.name}
                        </div>
                      ))}
                    <p>{_.get(policy, "category", null)}</p>
                  </div>
                )}
                <footer className="post-meta">
                  <time
                    className="published"
                    dateTime={moment(
                      _.get(policy, "dateInitiated", null)
                    ).strftime("%Y-%m-%d %H:%M")}
                  >
                    {moment(_.get(policy, "dateInitiated", null)).strftime(
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
          <CtaButtons {...props} actions={_.get(section, "actions", null)} />
        </div>
      )}
    </section>
  );
};

SectionPolicyActions.propTypes = {
  pages: PropTypes.array,
};

export default SectionPolicyActions;
