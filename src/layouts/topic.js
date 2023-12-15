import React from "react";

import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import PageRecents from "../components/PageRecents";
import RelatedActions from "../components/RelatedActions";
import SectionHero from "../components/SectionHero";
import { CustomPortableText } from "../components/PortableText";

const useStyles = makeStyles(() => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
  },
  em: {
    fontStyle: "italic",
  },
  maxWidth: {
    maxWidth: "100% !important",
  },
}));

const Topic = (props) => {
  const classes = useStyles();
  const { page, actions, headlines } = props;

  // useEffect(() => {}, [actions, headlines]);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={8}>
        <Container>
          {page.stackbit_model_type == "page" && (
            <Grid container spacing={8}>
              <Grid
                spacing={12}
                direction="column"
                item
                sm={12}
                md={8}
                className={classes.maxWidth}
              >
                <Typography
                  component="div"
                  variant="body2"
                  className="html-to-react"
                  sx={{ fontSize: 14, lineHeight: 2 }}
                >
                  <CustomPortableText value={page.description} />
                </Typography>
              </Grid>
              <Grid
                container
                spacing={4}
                direction="column"
                item
                sm={12}
                md={4}
              >
                <Grid item sx={{ width: "100%" }}>
                  <div
                    id="mlb2-5983225"
                    className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983225"
                  >
                    <div className="ml-form-align-center">
                      <div className="ml-form-embedWrapper embedForm">
                        <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                          <div className="ml-form-embedContent">
                            <h4>Our content. Delivered.</h4>
                            <p style={{ textAlign: "center" }}>
                              Join our newsletter on issues and ideas at the
                              intersection of tech & democracy
                            </p>
                          </div>
                          <form
                            className="ml-block-form"
                            action="https://static.mailerlite.com/webforms/submit/s8h5n5"
                            data-code="s8h5n5"
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
                                    placeholder="Email"
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
                                {" "}
                                <div className="ml-form-embedSubmitLoad"></div>{" "}
                                <span className="sr-only">Loading...</span>{" "}
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
                            <h4>Thank you!</h4>
                            <p style={{ textAlign: "center" }}>
                              You have successfully joined our subscriber list.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Box marginTop={4}>
            <PageRecents page={page} readings={headlines} />
            <RelatedActions page={page} actions={actions} loading={false} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

Topic.propTypes = {
  page: PropTypes.object,
  actions: PropTypes.array,
  headlines: PropTypes.array,
};

export default Topic;
