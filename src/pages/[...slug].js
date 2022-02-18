import React from "react";
import _ from "lodash";
import { sourcebitDataClient } from "sourcebit-target-next";
import { withRemoteDataUpdates } from "sourcebit-target-next/with-remote-data-updates";

import pageLayouts from "../layouts";

const Page = props => {
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

export async function getStaticPaths() {
  console.log("Page [...slug].js getStaticPaths");
  // filter out the root page as it has its own page file `src/pages/index.js`
  const paths = await sourcebitDataClient.getStaticPaths();
  return { paths: _.reject(paths, path => path === "/"), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  console.log("Page [...slug].js getStaticProps, params: ", params);
  const pagePath = "/" + params.slug.join("/");
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
  return { props };
}

export default withRemoteDataUpdates(Page);
