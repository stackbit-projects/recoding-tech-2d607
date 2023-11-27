// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// components
import components, { Layout } from "../components/index";
import HomepageActions from "../components/HomepageActions";
import HomepageRecents from "../components/HomepageRecents";
import SectionHero from "../components/SectionHero";
import SectionHeroTracker from "../components/SectionHeroTracker";
import SectionRecentArticles from "../components/SectionRecentArticles";

const Advanced = (props) => {
  const { path } = props;

  return (
    <Layout {...props}>
      <Box>
        {path === "/" ? (
          <>
            <div
              id="mlb2-5983540"
              className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983540"
            >
              <div className="ml-form-align-center">
                <div className="ml-form-embedWrapper embedForm">
                  <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                    <div className="ml-form-embedContent">
                      <h4>
                        Join our newsletter on issues and ideas at the
                        intersection of tech & democracy
                      </h4>
                    </div>
                    <form
                      className="ml-block-form"
                      action="https://static.mailerlite.com/webforms/submit/v2f5x1"
                      data-code="v2f5x1"
                      method="post"
                      target="_blank"
                    >
                      <div className="ml-form-formContent">
                        <div className="ml-form-fieldRow ml-last-item">
                          <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                            <input
                              aria-label="email"
                              aria-required="true"
                              type="email"
                              className="form-control"
                              data-inputmask=""
                              name="fields[email]"
                              placeholder="Enter email address"
                              autoComplete="email"
                            />
                          </div>
                        </div>
                      </div>
                      <input type="hidden" name="ml-submit" value="1" />
                      <div className="ml-form-embedSubmit">
                        <button type="submit" className="primary">
                          Subscribe
                        </button>
                        <button
                          disabled="disabled"
                          style={{ display: "none" }}
                          type="button"
                          className="loading"
                        >
                          <div className="ml-form-embedSubmitLoad" />
                          <span className="sr-only">Loading...</span>
                        </button>
                      </div>
                      <input type="hidden" name="anticsrf" value="true" />
                    </form>
                  </div>
                  <div
                    className="ml-form-successBody row-success"
                    style={{ display: "none" }}
                  >
                    <div className="ml-form-successContent">
                      <h4>Thank you !</h4>
                      <p style={{ textAlign: "center" }}>
                        <br />
                      </p>
                      <p style={{ textAlign: "center" }}>
                        You have successfully joined our mailing list.
                      </p>
                      <p style={{ textAlign: "center" }}>
                        More to come in January 2021 !
                      </p>
                      <p style={{ textAlign: "center" }}>
                        Want to get in touch now?{" "}
                        <a href="mailto:justin@techpolicy.press">Email us</a>
                        .&nbsp;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Container>
              <Grid
                container
                spacing={4}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={8}>
                  {_.map(
                    _.get(props, "page.sections", null),
                    (section, section_idx) => {
                      let component = _.upperFirst(
                        _.camelCase(_.get(section, "type", null))
                      );
                      let Component = components[component];
                      return (
                        <Component
                          key={section_idx}
                          {...props}
                          section={section}
                          site={props}
                        />
                      );
                    }
                  )}
                </Grid>
                <Grid container item xs={12} sm={4}>
                  <Grid item>
                    <SectionRecentArticles />
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={12} mb={8}>
                <HomepageActions />
              </Box>
              <Box mt={12} mb={10}>
                <HomepageRecents />
              </Box>
            </Container>
          </>
        ) : (
          <>
            {path === "/tracker" ? (
              <SectionHeroTracker {...props} />
            ) : (
              <SectionHero {...props} />
            )}
            <Container>
              {_.map(
                _.get(props, "page.sections", null),
                (section, section_idx) => {
                  let component = _.upperFirst(
                    _.camelCase(_.get(section, "type", null))
                  );
                  let Component = components[component];
                  return (
                    <Component
                      key={section_idx}
                      {...props}
                      section={section}
                      site={props}
                    />
                  );
                }
              )}
            </Container>
          </>
        )}
      </Box>
    </Layout>
  );
};

Advanced.propTypes = {
  citations: PropTypes.array,
  path: PropTypes.string,
};

export default Advanced;
