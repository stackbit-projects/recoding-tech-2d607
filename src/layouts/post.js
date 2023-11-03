import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import Image from "next/image";
import PropTypes from "prop-types";
import _ from "lodash";
import { titleCase } from "title-case";
import { toPlainText } from "@portabletext/react";
import urlFor from "../utils/imageBuilder";
import { CustomPortableText } from "../components/PortableText";

// utils
import { markdownify } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedTopics from "../components/RelatedTopics";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
}

function format(crumb) {
  return titleCase(crumb.split("-").join(" "));
}

const Post = (props) => {
  const router = useRouter();
  const { page } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    if (router) {
      setBreadcrumbs(router.query.slug);
    }
  }, [router]);

  useEffect(() => {}, [breadcrumbs]);

  return (
    <Layout {...props}>
      <Box my={6}>
        <Container>
          <Box
            role="presentation"
            onClick={handleClick}
            sx={{ marginBottom: 6 }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Typography variant="body2" color="text.primary">
                Home
              </Typography>
              {breadcrumbs && breadcrumbs.length
                ? breadcrumbs.map((crumb, index) => {
                    if (index == breadcrumbs.length - 1) {
                      return (
                        <Typography key={crumb} variant="body2" color="#FF0033">
                          {format(crumb)}
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography key={crumb} variant="body2" color="#FFF">
                          {format(crumb)}
                        </Typography>
                      );
                    }
                  })
                : null}
            </Breadcrumbs>
          </Box>
          <Grid container spacing={8}>
            <Grid container spacing={4} item xs={12} md={8} direction="row">
              <Grid item>
                {/* <Typography component="div" className="html-to-react">
                  {markdownify(_.get(props, "page.content", null))}
                </Typography> */}
                <Typography
                  component="h1"
                  variant="h2_article"
                  sx={{ borderBottom: "1px solid #8AA29D", paddingBottom: 2 }}
                >
                  {page.title}
                </Typography>
                {page.authors &&
                  page.authors.length &&
                  page.authors.map((auth, index) => (
                    <Typography
                      key={auth.slug.current}
                      component="span"
                      variant="body2"
                      sx={{
                        color: "#616161",
                        fontSize: 12,
                        textTransform: "uppercase",
                      }}
                    >
                      {index == page.authors.length - 1
                        ? `${auth.name} / `
                        : `${auth.name}, `}
                    </Typography>
                  ))}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "#616161",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {DateTime.fromISO(page.date).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </Typography>
                {page.toc && (
                  <Grid item xs={12} sm={12} mt={2}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#F3F0E699",
                      }}
                    >
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          borderBottom: "1px solid #8AA29D",
                          marginBottom: 2,
                          paddingBottom: 2,
                        }}
                      >
                        Table of Contents
                      </Typography>
                      <Typography component="div" className="html-to-react">
                        {markdownify(_.get(props, "page.toc", null))}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {page.body && (
                  <Typography component="div" className="html-to-react-article">
                    <CustomPortableText value={page.body} />
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box marginBottom={6}>
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    borderBottom: "1px solid #8AA29D",
                    paddingBottom: 2,
                    width: "100%",
                  }}
                >
                  Authors
                </Typography>
                <Stack direction="column" spacing={4}>
                  {page.authors &&
                    page.authors.map((auth) => (
                      <Grid
                        container
                        key={auth.slug.current}
                        spacing={2}
                        item
                        xs={12}
                      >
                        <Grid item xs={auth.photo ? 3 : 0}>
                          {auth.photo && (
                            <Image
                              src={urlFor(auth.photo)
                                .height(80)
                                .width(80)
                                .fit("max")
                                .auto("format")
                                .url()}
                              height={80}
                              width={80}
                              alt=""
                              style={{ borderRadius: 50 }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={auth.photo ? 9 : 12}>
                          <Link
                            href={`/author/${auth.slug.current}`}
                            sx={{
                              textDecoration: "none",
                              "&:active, &:focus, &:hover": {
                                color: "#000",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            <Typography
                              component="span"
                              variant="h4"
                              sx={{ color: "#000", fontWeight: 400 }}
                            >
                              {auth.name}
                            </Typography>
                          </Link>
                          {auth.bio && (
                            <Typography
                              color="rgba(0,0,0,0.48)"
                              component="div"
                              variant="body2"
                            >
                              {toPlainText(auth.bio).substring(0, 300)}...
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                </Stack>
              </Box>
              <RelatedCommentary
                title="Further Reading"
                commentary={page.relatedCommentary}
                noFilter={true}
              />
              <RelatedTopics topics={page.relatedTopics} />
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
                          Subscribe for our weekly update on Government Policy,
                          Tech News and Research
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
        </Container>
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  page: PropTypes.object,
};

export default Post;
