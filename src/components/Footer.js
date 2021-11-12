// base imports
import React from "react";
import _ from "lodash";

import { htmlToReact, Link, withPrefix } from "../utils";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: "0.8em",
    maxWidth: 450
  },
  link: {
    color: "#000 !important",
    fontFamily: theme.typography.link.fontFamily,
    fontSize: "0.6em",
    fontWeight: "normal",
    textTransform: "uppercase"
  },
  links: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      marginTop: 2
    }
  },
  logoLink: {
    color: "unset",
    textDecoration: "none"
  },
  subscribe: {
    border: "1px solid #000",
    borderRadius: 0,
    fontSize: "0.8em",
    fontWeight: "normal",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      marginBottom: 20
    },
    "&:active, &:focus, &:hover": {
      backgroundColor: "#000",
      border: "1px solid #fff",
      color: "#fff"
    }
  }
}));
// component imports
import Logo from "./Logo";

function Footer(props) {
  const classes = useStyles();

  return (
    <footer style={{ backgroundColor: "#EFE9DA" }}>
      <Box py={4}>
        <Container>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Link href="/" className={classes.logoLink}>
                <Logo />
              </Link>
            </Grid>
            <Grid item>
              <Button href="#" variant="outlined" className={classes.subscribe}>
                Subscribe
              </Button>
            </Grid>
          </Grid>
          {_.get(props, "data.config.footer.content", null) && (
            <Typography
              component="div"
              variant="body1"
              className={classes.content}
            >
              {htmlToReact(_.get(props, "data.config.footer.content", null))}
            </Typography>
          )}
          <Grid container spacing={6}>
            <Grid
              alignItems="flex-end"
              className={classes.links}
              container
              item
              spacing={6}
              xs={12}
              sm={10}
            >
              {_.map(
                _.get(props, "data.config.footer.links", null),
                (action, action_idx) => (
                  <Grid item key={action_idx}>
                    <Link
                      className={classes.link}
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
                                : "")
                          }
                        : null)}
                    >
                      {_.get(action, "label", null)}
                    </Link>
                  </Grid>
                )
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              {_.get(props, "data.config.footer.copyright", null) && (
                <Typography component="div" className={classes.link}>
                  {htmlToReact(
                    _.get(props, "data.config.footer.copyright", null)
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
