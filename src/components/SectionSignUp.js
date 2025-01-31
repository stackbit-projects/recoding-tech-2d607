import React from "react";
import _ from "lodash";

// MUI imports
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    fontFamily: "'Libre Baskerville', serif!important",
    fontSize: "32px!important",
  },
  grid: {
    marginTop: "110px",
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "1fr 1fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
    marginRight: "-20px",
    marginLeft: "-20px",
  },
  gridTopic: {
    border: "1px solid #DCDCDC",
    padding: "20px",
    fontFamily: "Lexend",
    fontSize: "16px",
    fontWeight: "300",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "325px",
  },
  formContainer: {
    display: "flex",
    gap: "32px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginRight: "-16px",
      marginLeft: "-16px",
      gap: "16px",
    },
  },
}));

//Libre Baskerville

export default function SectionSignUp(props) {
  const classes = useStyles();
  let section = _.get(props, "section", null);

  console.log(section);

  return (
    <section id={_.get(section, "section_id", null)}>
      <Box marginBottom={8}>
        <div
          id="mlb2-5983533"
          className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983533"
        >
          <div className="ml-form-align-center">
            <div className="ml-form-embedWrapper embedForm">
              <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                <div className="ml-form-embedContent">
                  <h4 className={classes.header}>
                    Join our newsletter on issues and ideas at the intersection
                    of tech & democracy.
                  </h4>
                  <p
                    style={{
                      textAlign: "center",
                      maxWidth: "750px",
                      marginTop: "28px",
                    }}
                  >
                    Tech Policy Press is a startup nonprofit media & community
                    venture that will provoke debate and discussion at the
                    intersection of technology and democracy.
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      maxWidth: "750px",
                      marginTop: "28px",
                    }}
                  >
                    We compile all the top stories from our website into a
                    newsletter format for you to receive directly to your email.
                    Please check out the preview newsletters within each topic
                    below and consider subscribing if you enjoy the content.
                  </p>
                </div>
                <form
                  className="ml-block-form"
                  action="https://static.mailerlite.com/webforms/submit/v1a4y3"
                  data-code="v1a4y3"
                  method="post"
                  target="_blank"
                >
                  <div className={classes.formContainer}>
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
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                    <input type="hidden" name="anticsrf" value="true" />
                    <input type="hidden" name="groups[]" value="104107073" />
                  </div>
                  {section.topics && (
                    <div className={classes.grid}>
                      {section.topics.map((topic) => {
                        return (
                          <label
                            key={topic._key}
                            htmlFor={"checkbox-" + topic.mailerlite_id}
                          >
                            <div className={classes.gridTopic}>
                              <div style={{ alignSelf: "end" }}>
                                <input
                                  id={"checkbox-" + topic.mailerlite_id}
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    accentColor: "#427569",
                                    borderColor: "#A8A7A7",
                                  }}
                                  type="checkbox"
                                  name="groups[]"
                                  value={topic.mailerlite_id}
                                />
                              </div>
                              <div>
                                <h3>{topic.name}</h3>
                                <p>{topic.description}</p>
                              </div>
                              <div
                                style={{
                                  fontWeight: "600",
                                  textTransform: "capitalize",
                                  alignSelf: "end",
                                }}
                              >
                                {topic.type}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </form>
              </div>
              <div
                className="ml-form-successBody row-success"
                style={{ display: "none" }}
              >
                <div className="ml-form-successContent">
                  <h4>Thank you !</h4>
                  <p style={{ textAlign: "center" }}>
                    You have successfully joined our subscriber list.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </section>
  );
}
