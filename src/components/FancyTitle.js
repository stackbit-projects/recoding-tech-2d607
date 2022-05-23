import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.3em",
    lineHeight: "1em",
  },
  subtitle: {
    paddingBottom: 10,
    fontStyle: "italic",
    fontSize: "1.17em",
  },
  link: {
    color: theme.typography.link.color,
  },
}));

const FancyTitle = (props) => {
  const classes = useStyles();
  const { title, subtitle, isTracker } = props;
  return (
    <Grid container item sx={{ borderBottom: 1, mb: 3, rowGap: 1 }}>
      <Grid container spacing={2} item xs={12} justify="space-between">
        <Grid item xs={12} sm={isTracker ? 9 : 12}>
          <Typography
            component="h2"
            variant="h4"
            mb={1}
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography
            component="div"
            variant="body1"
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
        </Grid>
        {isTracker ? (
          <Grid item xs={12} sm={3}>
            <Typography component="div" variant="h4" align="center">
              <Link href="/tracker" className={classes.link}>
                See all
              </Link>
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

FancyTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isTracker: PropTypes.bool,
};

export default FancyTitle;
