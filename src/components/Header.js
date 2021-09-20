import React from "react";
import _ from "lodash";

import { Link, withPrefix, classNames } from "../utils";
import Icon from "./Icon";

// material ui imports
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
    fontSize: "2.5em",
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
      top: "2px",
      transform: "translateX(-50%)",
      width: "7px"
    }
  },
  nameDot: {
    color: theme.typography.link.color
  },
  nameRe: {
    marginRight: "6px",
    paddingRight: "3px",
    position: "relative",
    "&::after": {
      backgroundColor: theme.typography.link.color,
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      position: "absolute",
      right: "-5px",
      top: "50%",
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
            <span className={`${classes.name} ${classes.nameRe}`}>Re</span>
            <span className={classes.name}>cod</span>
            <span className={`${classes.name} ${classes.nameCoding}`}>i</span>
            <span className={classes.name}>ng</span>
            <span className={`${classes.name} ${classes.nameDot}`}>.</span>
            <span className={classes.name}>Tech</span>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={8}
            className={classes.nav}
            alignItems="center"
            spacing={4}
            justify="flex-end"
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
              justify="space-between"
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
    </header>
  );
}

export default Header;
