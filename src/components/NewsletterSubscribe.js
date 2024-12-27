// base imports
import React from "react";

function NewsletterSubscribe() {
  return (
    <div
      id="mlb2-5983225"
      className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983225"
      style={{
        paddingBottom: "16px",
      }}
    >
      <hr />
      <div className="ml-form-align-center" style={{ paddingTop: "16px" }}>
        <div
          className="ml-form-embedWrapper embedForm"
          style={{ maxWidth: "100%" }}
        >
          <div
            className="ml-form-embedBody ml-form-embedBodyDefault row-form"
            style={{ padding: "40px" }}
          >
            <div
              className="ml-form-embedContent"
              style={{ marginBottom: "32px" }}
            >
              <h4>Our content. Delivered.</h4>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "400",
                  marginTop: "5px",
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
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    className="ml-form-formContent"
                    style={{ width: "251px", marginBottom: "0px" }}
                  >
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
                  <div
                    className="ml-form-embedSubmit"
                    style={{ width: "173px", marginBottom: "0px" }}
                  >
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
    </div>
  );
}

export default NewsletterSubscribe;
