// base imports
import React from "react";
import _ from "lodash";
import { Layout } from "../components/index";
import { htmlToReact, withPrefix, markdownify } from "../utils";

// Material UI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Page = props => {
  return (
    <Layout {...props}>
      <Container>
        <article className="post page post-full">
          <header>
            <Container maxWidth="sm">
              <Typography variant="h1">
                {_.get(props, "page.title", null)}
              </Typography>
            </Container>
            {_.get(props, "page.subtitle", null) && (
              <div className="post-subtitle inner-sm">
                {htmlToReact(_.get(props, "page.subtitle", null))}
              </div>
            )}
          </header>
          {/*_.get(props, 'page.img_path', null) && (
              <div className="post-image">
                <img src={withPrefix(_.get(props, 'page.img_path', null))} alt={_.get(props, 'page.img_alt', null)} />
              </div>
            )*/}
          <div className="post-content inner-sm">
            {markdownify(_.get(props, "page.content", null))}
          </div>
        </article>
      </Container>
    </Layout>
  );
};

export default Page;
