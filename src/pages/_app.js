// import App from 'next/app'
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Script from "next/script";
import "../sass/main.scss";
import "../sass/mailerlite-article.scss";
import "../sass/mailerlite-homepage.scss";
import "../sass/mailerlite-newsletter.scss";
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
      <Component {...pageProps} />
      <script>
        {`(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){ var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);} f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i); var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000)); _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml'); var ml_account = ml('accounts', '2358287', 'f5k1u1a9u6', 'load');`}
      </script>
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
