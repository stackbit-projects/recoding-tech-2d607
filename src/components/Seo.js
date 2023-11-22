import React from "react";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import _ from "lodash";


const Seo = (props) => {
  const { page, path } = props;

  const url = () => {
    if (path == "/") {
      return "https://techpolicy.press";
    }

    if (
      page._type == "post" ||
      page._type == "advanced" ||
      page._type == "page"
    ) {
      if (page.slug && page.slug.current) {
        return `https://techpolicy.press/${page.slug.current}`;
      }
    }

    if (page._type == "topic" && page.slug && page.slug.current) {
      return `https://techpolicy.press/category/${page.slug.current}`;
    }
  };

  const titleText = () => {
    if (page.seo && page.seo.title) {
      return `${page.seo.title} | ${_.get(props, "data.config.title", null)}`;
    }

    if (page.title) {
      return `${page.title} | ${_.get(props, "data.config.title", null)}`;
    }

    if (page.displayName) {
      return `${page.displayName} | ${_.get(props, "data.config.title", null)}`;
    }

    if (page.name) {
      return `${page.name} | ${_.get(props, "data.config.title", null)}`;
    }
  };

  const pageType = () => {
    let type = "article";

    if (path == "/") {
      type = "website";
    }

    if (page._type == "author") {
      type = "profile";
    }

    return type;
  };

  return (
    <NextSeo
      title={titleText()}
      description={
        page.seo && page.seo.description
          ? page.seo.description
          : "Tech Policy Press is a nonprofit media and community venture intended to provoke new ideas, debate and discussion at the intersection of technology and democracy. We publish opinion and analysis."
      }
      canonical={url()}
      openGraph={{
        siteName: "Tech Policy Press",
        locale: "en_US",
        url: url(),
        type: pageType(),
      }}
      twitter={{
        handle: "@TechPolicyPress",
        site: "@TechPolicyPress",
        cardType: "summary_large_image",
      }}
    />
  );
};

Seo.propTypes = {
  page: PropTypes.object,
  data: PropTypes.object,
  path: PropTypes.string,
};

export default Seo;
