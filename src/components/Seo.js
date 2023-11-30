import React from "react";
import { NextSeo } from "next-seo";
import { ArticleJsonLd } from "next-seo";
import PropTypes from "prop-types";
import _ from "lodash";

import imageBuilder from "../utils/imageBuilder.js";

const Seo = (props) => {
  const { page, path } = props;

  let ogImage =
    page.seo && page.seo.ogImage
      ? imageBuilder(page.seo.ogImage).url()
      : "https://cdn.sanity.io/images/3tzzh18d/production/1ced33594667a8922f4f75aef61be51af62a8890-800x800.png";

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

    if (page._type == "author" && page.slug && page.slug.current) {
      return `https://techpolicy.press/author/${page.slug.current}`;
    }

    if (page._type == "policy_action" && page.slug && page.slug.current) {
      return `https://techpolicy.press/tracker/${page.slug.current}`;
    }

    return `https://techpolicy.press`;
  };

  const titleText = () => {
    if (path == "/") {
      return `${page.title}`;
    }
    if (page._type == "author") {
      return `${page.name}, Author at ${_.get(
        props,
        "data.config.title",
        null
      )}`;
    }

    if (page.displayName) {
      return `${page.displayName} | ${_.get(props, "data.config.title", null)}`;
    }

    if (page.seo && page.seo.title) {
      return `${page.seo.title} | ${_.get(props, "data.config.title", null)}`;
    }

    if (page.title) {
      return `${page.title} | ${_.get(props, "data.config.title", null)}`;
    }

    if (page.name) {
      return `${page.name} | ${_.get(props, "data.config.title", null)}`;
    }
  };

  const description = () => {
    return page.seo && page.seo.description
      ? page.seo.description
      : "Tech Policy Press is a nonprofit media and community venture intended to provoke new ideas, debate and discussion at the intersection of technology and democracy. We publish opinion and analysis.";
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

  const openGraph = () => {
    let ogObject = {
      siteName: "Tech Policy Press",
      locale: "en_US",
      url: url(),
      type: pageType(),
      images: [{ url: ogImage }],
    };

    if (page._type == "post") {
      console.log("page  in opengraph obj =>", page);
      ogObject = {
        ...ogObject,
        article: {
          publishedTime: page.date,
          modifiedTime: page._updatedAt,
        },
      };
    }
    return ogObject;
  };

  const jsonLd = () => {
    if (page._type == "post") {
      return (
        <>
          <ArticleJsonLd
            useAppDir={false}
            url={url()}
            title={page.title}
            datePublished={page.date}
            dateModified={page._updatedAt}
            authorName={page.authors.map((author) => {
              return {
                name: author.name,
                url: `https://techpolicy.press/contributor/${author.slug.current}`,
              };
            })}
            publisherName="https://techpolicy.press"
            publisherLogo="https://cdn.sanity.io/images/3tzzh18d/production/1ced33594667a8922f4f75aef61be51af62a8890-800x800.png"
            description={description()}
            isAccessibleForFree={true}
          />
        </>
      );
    }
  };

  return (
    <>
      <NextSeo
        title={titleText()}
        description={description()}
        canonical={url()}
        openGraph={openGraph()}
        twitter={{
          handle: "@TechPolicyPress",
          site: "@TechPolicyPress",
          cardType: "summary_large_image",
        }}
      />
      {jsonLd()}
    </>
  );
};

Seo.propTypes = {
  page: PropTypes.object,
  data: PropTypes.object,
  path: PropTypes.string,
};

export default Seo;
