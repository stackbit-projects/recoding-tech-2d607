// base imports
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import _ from "lodash";

import { withPrefix } from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../theme.js";

// import imageBuilder from "../utils/imageBuilder.js";
import Seo from "./Seo.js";

// Material UI imports
import { ThemeProvider } from "@mui/material/styles";

const Body = (props) => {
  const { page, data, path } = props;

  return (
    <>
      {/* <base href="techpolicy.press"></base> */}
      <Seo page={page} data={data} path={path} />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initialScale=1.0" />
        <meta name="google" content="notranslate" />
        <meta
          name="author"
          content={
            page.authors
              ? page.authors.map((author) => author.name).join(", ")
              : "Tech Policy Press"
          }
        />
        <meta
          name="publish_date"
          content={
            page.date ? page.date : page._createdAt ? page._createdAt : ""
          }
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for The Sunday Show"
          href="https://feeds.captivate.fm/techpolicypress/"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Tech Policy Press » Feed"
          href="https://techpolicy.press/rss/feed.xml"
        />
        {_.map(_.get(props, "page.seo.extra", null), (meta, meta_idx) => {
          // let key_name = _.get(meta, "keyName", null) || "name";
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
                    // {...attribute(key_name, _.get(meta, "name", null))}
                    content={full_url}
                  />
                );
              })()
          ) : (
            <meta
              key={meta_idx + ".1"}
              // {...attribute(key_name, _.get(meta, "name", null))}
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
  data: PropTypes.object,
  path: PropTypes.string,
};

export default Body;
