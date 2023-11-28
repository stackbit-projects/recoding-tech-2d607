import React from "react";
import _ from "lodash";

// MUI imports
import Box from "@mui/material/Box";

export default function SectionSignUp(props) {
  let section = _.get(props, "section", null);

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
                  <h4>
                    Join our newsletter on issues and ideas at the intersection
                    of tech & democracy.
                  </h4>
                  <p style={{ textAlign: "center" }}>
                    Tech Policy Press is a startup nonprofit media & community
                    venture that will provoke debate and discussion at the
                    intersection of technology and democracy.
                  </p>
                </div>
                <form
                  className="ml-block-form"
                  action="https://static.mailerlite.com/webforms/submit/m6i8p9"
                  data-code="m6i8p9"
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
                      <div className="ml-form-embedSubmitLoad"></div>
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
