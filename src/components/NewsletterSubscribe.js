// base imports
import React from "react";

import { ChevronRight } from "@mui/icons-material";

function NewsletterSubscribe() {
  return (
    <div
      id="mlb2-5983225"
      className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983225"
    >
      <div
        style={{
          margin: "32px 0 24px 0",
          borderTop: "1px solid #E2D7BB",
        }}
      />
      <div className="ml-form-align-center">
        <div
          className="ml-form-embedWrapper embedForm"
          style={{ maxWidth: "100%" }}
        >
          <div
            className="ml-form-embedBody ml-form-embedBodyDefault row-form"
            style={{ padding: "25px 0 30px 0" }}
          >
            <div
              className="ml-form-embedContent"
              style={{ marginBottom: "20px" }}
            >
              <h4 style={{ fontSize: "24px" }}>Our content. Delivered.</h4>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Join our newsletter on issues and ideas at the
                <br /> intersection of tech & democracy
              </div>
            </div>
            <form
              className="ml-block-form"
              action="https://static.mailerlite.com/webforms/submit/s8h5n5"
              data-code="s8h5n5"
              method="post"
              target="_blank"
            >
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    className="ml-form-formContent"
                    style={{ width: "221px", marginBottom: "0px" }}
                  >
                    <div className="ml-form-fieldRow ml-last-item">
                      <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                        <input
                          aria-label="email"
                          aria-required="true"
                          type="email"
                          data-inputmask=""
                          name="fields[email]"
                          placeholder="Enter email address"
                          autoComplete="email"
                          style={{
                            padding: "6px 10px !important",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <input type="hidden" name="ml-submit" value="1" />
                  <div
                    className="ml-form-embedSubmit"
                    style={{ width: "153px", marginBottom: "0px" }}
                  >
                    <button
                      type="submit"
                      className="primary"
                      style={{
                        fontFamily: "Lexend, sans-serif!important",
                        display: "flex",
                        justifyContent: "space-evenly",
                        fontSize: "14px !important",
                        lineHeight: "normal !important",
                        fontWeight: "400 !important",
                        alignItems: "center",
                        padding: "5px 10px !important",
                      }}
                    >
                      Subscribe <ChevronRight />
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
                </div>
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
      <div
        style={{
          margin: "24px 0 32px 0",
          borderTop: "1px solid #E2D7BB",
        }}
      />
    </div>
  );
}

export default NewsletterSubscribe;
