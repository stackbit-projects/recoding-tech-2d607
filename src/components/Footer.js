// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import { htmlToReact, Link } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// MUI icons
import EmailIcon from "@mui/icons-material/Email";
import RssFeedIcon from "@mui/icons-material/RssFeed";

// components
import Logo from "./LogoFooter";

function Footer(props) {
  let links;
  if (
    props.data &&
    props.data.config &&
    props.data.config.footer &&
    props.data.config.footer.links
  ) {
    links = props.data.config.footer.links;
  }

  return (
    <footer style={{ backgroundColor: "#3475BF", color: "#FFF" }}>
      <Box pt={8} pb={4}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <Link href="/">
                <Logo />
                <Typography component="span" sx={{ display: "none" }}>
                  Home
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              {_.get(props, "data.config.footer.content", null) && (
                <Typography
                  component="div"
                  variant="body2"
                  sx={{ mb: 2, maxWidth: 275 }}
                >
                  {htmlToReact(
                    _.get(props, "data.config.footer.content", null)
                  )}
                </Typography>
              )}
              <Link href="https://techpolicy.press/rss/feed.xml">
                <RssFeedIcon
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "4px",
                    fill: "#3475BF",
                    marginRight: 1,
                  }}
                />
                <Typography component="span" sx={{ display: "none" }}>
                  TPP RSS feed
                </Typography>
              </Link>
              <Link href="mailto:newsletter@techpolicy.press">
                <EmailIcon
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "4px",
                    fill: "#3475BF",
                  }}
                />
                <Typography component="span" sx={{ display: "none" }}>
                  Email TPP
                </Typography>
              </Link>
            </Grid>
            <Grid
              container
              item
              direction={"column"}
              flexWrap={"wrap"}
              sx={{ height: 150 }}
              xs={12}
              sm={6}
            >
              {links.length
                ? links.map((link, idx) => (
                    <Grid item key={idx} sx={{ my: 1 }}>
                      <Link style={{ textDecoration: "none" }} href={link.url}>
                        <Typography
                          component="span"
                          variant="h5"
                          sx={{
                            color: "#FFF",
                            fontSize: 14,
                            textDecoration: "none",
                            textTransform: "none",
                            "&:hover, &:focus": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {link.label}
                        </Typography>
                      </Link>
                    </Grid>
                  ))
                : null}
              {/* {_.map(
                _.get(props, "data.config.footer.links", null),
                (action, action_idx) => (
                  <Grid item key={action_idx} sx={{ my: 1 }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={withPrefix(_.get(action, "url", null))}
                      {...(_.get(action, "new_window", null)
                        ? { target: "_blank" }
                        : null)}
                      {...(_.get(action, "new_window", null) ||
                      _.get(action, "no_follow", null)
                        ? {
                            rel:
                              (_.get(action, "new_window", null)
                                ? "noopener "
                                : "") +
                              (_.get(action, "no_follow", null)
                                ? "nofollow"
                                : ""),
                          }
                        : null)}
                    >
                      <Typography
                        component="span"
                        variant="h5"
                        sx={{
                          color: "#FFF",
                          fontSize: 14,
                          textDecoration: "none",
                          textTransform: "none",
                          "&:hover, &:focus": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {_.get(action, "label", null)}
                      </Typography>
                    </Link>
                  </Grid>
                )
              )} */}
            </Grid>
          </Grid>
          {_.get(props, "data.config.footer.copyright", null) && (
            <Typography
              component="div"
              variant="h5"
              sx={{
                fontSize: 14,
                marginTop: 4,
                textAlign: "center",
                textTransform: "none",
              }}
            >
              {htmlToReact(_.get(props, "data.config.footer.copyright", null))}
            </Typography>
          )}
        </Container>
      </Box>
    </footer>
  );
}

Footer.propTypes = {
  path: PropTypes.string,
  data: PropTypes.object,
};

export default Footer;
