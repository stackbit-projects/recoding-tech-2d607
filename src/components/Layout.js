// base imports
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import _ from "lodash";

import { withPrefix, attribute } from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../theme.js";
import imageBuilder from "../utils/imageBuilder.js";

// Material UI imports
import { ThemeProvider } from "@mui/material/styles";

const Body = (props) => {
  const { page } = props;
  console.log("page in Layout.js ->", page);
  let ogImage =
    page.seo && page.seo.ogImage
      ? imageBuilder(page.seo.ogImage).url()
      : "https://cdn.sanity.io/images/3tzzh18d/production/1ced33594667a8922f4f75aef61be51af62a8890-800x800.png";
  console.log("ogImage =>", ogImage);

  console.log("page ===>", page);
  return (
    <>
      <Head>
        <title>
          {page.seo
            ? page.seo.title
            : page.title
            ? page.title
            : page.displayName
            ? page.displayName
            : page.name}{" "}
          | {_.get(props, "data.config.title", null)}
        </title>
        <base href="test.recoding.tech"></base>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initialScale=1.0" />
        <meta name="google" content="notranslate" />
        <meta
          name="description"
          content={_.get(props, "page.seo.description", null) || ""}
        />
        {/** OpenGraph Protocol */}
        <meta name="og:title" content={_.get(props, "page.seo.title", null)} />
        <meta
          name="og:description"
          content={_.get(props, "page.seo.description", null) || ""}
        />
        <meta name="og:image" content={ogImage} />
        {/* <meta name="og:url" content={`https://techpolicy.press/${slug}`} /> */}
        <meta name="og:type" content="article" />1
        <meta name="og:locale" content="en_us" />
        {_.get(props, "page.seo.robots", null) && (
          <meta
            name="robots"
            content={_.join(_.get(props, "page.seo.robots", null), ",")}
          />
        )}
        {_.map(_.get(props, "page.seo.extra", null), (meta, meta_idx) => {
          let key_name = _.get(meta, "keyName", null) || "name";
          return _.get(meta, "relativeUrl", null) ? (
            _.get(props, "data.config.domain", null) &&
              (() => {
                let domain = _.trim(
                  _.get(props, "data.config.domain", null),
                  "/"
                );
                let rel_url = withPrefix(_.get(meta, "value", null));
                let full_url = domain + rel_url;
                return (
                  <meta
                    key={meta_idx}
                    {...attribute(key_name, _.get(meta, "name", null))}
                    content={full_url}
                  />
                );
              })()
          ) : (
            <meta
              key={meta_idx + ".1"}
              {...attribute(key_name, _.get(meta, "name", null))}
              content={_.get(meta, "value", null)}
            />
          );
        })}
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap"
          rel="stylesheet"
        />
        {_.get(props, "data.config.favicon", null) && (
          <link
            rel="icon"
            href={withPrefix(_.get(props, "data.config.favicon", null))}
          />
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <Header {...props} />
        <main id="main">{props.children}</main>
        <Footer {...props} />
      </ThemeProvider>
    </>
  );
};

Body.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  page: PropTypes.object,
};

export default Body;
