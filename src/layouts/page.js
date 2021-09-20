// base imports
import React from "react";
import _ from "lodash";
import { Layout } from "../components/index";
import { htmlToReact, withPrefix, markdownify } from "../utils";

// Material UI imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default class Page extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <Container>
          <article className="post page post-full">
            <header>
              <Container maxWidth="sm">
                <Typography variant="h1">
                  {_.get(this.props, "page.title", null)}
                </Typography>
              </Container>
              {_.get(this.props, "page.subtitle", null) && (
                <div className="post-subtitle inner-sm">
                  {htmlToReact(_.get(this.props, "page.subtitle", null))}
                </div>
              )}
            </header>
            {/*_.get(this.props, 'page.img_path', null) && (
                <div className="post-image">
                  <img src={withPrefix(_.get(this.props, 'page.img_path', null))} alt={_.get(this.props, 'page.img_alt', null)} />
                </div>
              )*/}
            <div className="post-content inner-sm">
              {markdownify(_.get(this.props, "page.content", null))}
            </div>
          </article>
        </Container>
      </Layout>
    );
  }
}
