// base imports
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import _ from "lodash";

import { withPrefix } from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../theme.js";

import imageBuilder from "../utils/imageBuilder.js";
import Seo from "./Seo.js";

// Material UI imports
import { ThemeProvider } from "@mui/material/styles";

const Body = (props) => {
  const { page, data, path } = props;

  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;

    script.innerHTML = `(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){ var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);} f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i); var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000)); _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml'); var ml_account = ml('accounts', '2358287', 'f5k1u1a9u6', 'load');`;

    document.head.appendChild(script);
  }, []);

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
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700,700i&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Libre+Baskerville:700&display=swap"
          rel="stylesheet"
        />
        {_.get(props, "data.config.favicon", null) && (
          <link
            rel="icon"
            href={
              data.config.favicon ? imageBuilder(data.config.favicon).url() : ""
            }
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
