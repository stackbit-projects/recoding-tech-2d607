import React from "react";
import _ from "lodash";

import { Link, withPrefix, classNames } from "../utils";
import Icon from "./Icon";

// material ui imports
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  em: {
    fontStyle: "italic"
  },
  header: {},
  mobileNav: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  name: {
    fontSize: "2em",
    fontWeight: "bold"
  },
  nameCoding: {
    position: "relative",
    "&::after": {
      backgroundColor: theme.typography.link.color,
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      left: "50%",
      position: "absolute",
      top: "3px",
      transform: "translateX(-50%)",
      width: "7px"
    }
  },
  nameDot: {
    color: theme.typography.link.color,
    fontSize: "2.5em",
    marginLeft: "3px"
  },
  nameRe: {
    marginRight: "6px",
    paddingRight: "4px",
    position: "relative",
    "&::after": {
      backgroundColor: theme.typography.link.color,
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      position: "absolute",
      right: "-5px",
      top: "55%",
      transform: "translateY(-50%)",
      width: "7px"
    }
  },
  nav: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Box m={4}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography>
              <span className={`${classes.name} ${classes.nameRe}`}>Re</span>
              <span className={classes.name}>cod</span>
              <span className={`${classes.name} ${classes.nameCoding}`}>i</span>
              <span className={classes.name}>ng</span>
              <span className={`${classes.name} ${classes.nameDot}`}>.</span>
              <span className={classes.name}>Tech</span>
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={8}
            className={classes.nav}
            alignItems="center"
            spacing={4}
            justifyContent="flex-end"
          >
            <Grid item xs={12} sm={3}>
              <Typography className={classes.em}>Explore by...</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={9}
              spacing={2}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="overline">Issue</Typography>
              </Grid>
              <Grid item>
                <Typography variant="overline">Policy</Typography>
              </Grid>
              <Grid item>
                <Typography variant="overline">Country</Typography>
              </Grid>
              <Grid item>
                <Typography variant="overline">Company</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item className={classes.mobileNav}>
            <Grid item>
              <Typography>Explore by...</Typography>
            </Grid>
            <Grid container item>
              <Grid item>Mobile nav here</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <div className="site-header-wrap">
        <div className="site-header-inside">
          <div className="site-branding">
            {(_.get(props, "data.config.header.has_nav", null) ||
              _.get(props, "data.config.header.has_social", null)) && (
              <button id="menu-toggle" className="menu-toggle">
                <span className="screen-reader-text">Menu</span>
                <span className="icon-menu" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
