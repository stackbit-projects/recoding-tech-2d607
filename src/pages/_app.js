// import App from 'next/app'
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Script from "next/script";
import "../sass/main.scss";
import "../app.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (window.onNextjsAppDidMount) {
      window.onNextjsAppDidMount();
    }

    if (window.onNextjsRouteChangeComplete) {
      console.log(window.onNextjsRouteChangeComplete());

      window.onNextjsRouteChangeComplete();
    }

    const handleRouteChangeStart = () => {
      if (window.onNextjsRouteChangeStart) {
        window.onNextjsRouteChangeStart();
      }
    };

    const handleRouteChangeComplete = () => {
      if (window.onNextjsRouteChangeComplete) {
        window.onNextjsRouteChangeComplete();
      }
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Script src="https://sa.recoding.tech/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://sa.recoding.tech/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Component {...pageProps} />;
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
