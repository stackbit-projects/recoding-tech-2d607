import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  em: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: "0.8em",
  },
  title: {
    borderRight: "2px solid #000",
    paddingRight: 20,
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
      <Grid container spacing={2} item xs={12} md={11}>
        <Grid item>
          <Typography
            component="h2"
            variant="h4"
            mb={1}
            className={classes.title}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="div" variant="body1" className={classes.em}>
            {subtitle}
          </Typography>
        </Grid>
        {isTracker ? (
          <Grid item>
            <Typography component="div" variant="h5">
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
