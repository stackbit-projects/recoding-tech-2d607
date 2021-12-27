// base imports
import React from "react";

// Sanity.io imports
import groq from "groq";
import client from "../../client";

import _ from "lodash";

import pageLayouts from "../layouts";

const Page = (props) => {
  // every page can have different layout, pick the layout based
  // on the model of the page (_type in Sanity CMS)
  let componentName;

  if (_.get(props, "page.__metadata.modelName") === "topic") {
    componentName = _.get(props, "page.type");
  } else {
    componentName = _.get(props, "page.__metadata.modelName");
  }
  const PageLayout = pageLayouts[componentName];
  return <PageLayout {...props} />;
};

const query = groq`*[_type == "advanced" && slug.current == $slug][0]`;

Page.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  return {
    pageSettings: await client.fetch(query, { slug }),
    siteSettings: await client.fetch(groq`
      *[_type == "settings"]{title, footerImage}
    `),
    pages: await client.fetch(groq`
      *[!(_id in path('drafts.**')) && _type == "page"]{title, slug, weight}
    `),
  };
};

export default Page;
