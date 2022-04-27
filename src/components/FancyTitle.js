import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: "0.9em",
  },
  title: {
    borderRight: "2px solid #000",
    paddingRight: 20,
  },
}));

const FancyTitle = (props) => {
  const classes = useStyles();
  const { title, subtitle } = props;
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
      </Grid>
    </Grid>
  );
};

FancyTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default FancyTitle;
