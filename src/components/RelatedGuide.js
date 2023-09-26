// base imports
import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import FancyGuide from "./FancyGuide";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #000",
    borderRadius: 0,
    height: 250,
    position: "relative",
    width: 240,
  },
  cardAction: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  cardTitle: {
    fontSize: "1.5em",
    marginTop: 170,
  },
  em: {
    fontStyle: "italic",
  },
  guide: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const RelatedGuide = (props) => {
  const { page } = props;
  if (!page.quickStartGuide) return null;
  const classes = useStyles();

  const onClick = () => {
    Router.push({ pathname: `/guide/${page.quickStartGuide.slug}` });
  };

  return (
    <section>
      <Grid container className={classes.grid}>
        <Grid container item justifyContent="space-between">
          <Grid item xs={12}>
            <Typography component="h2" variant="h4">
              Quick-start Guide
            </Typography>
            <Typography component="div" variant="body1" className={classes.em}>
              Overview of {page.displayName ? page.displayName : page.name} and
              recommended reading
            </Typography>
          </Grid>
          <Box
            my={2}
            pt={2}
            sx={{ borderTop: "1px solid #000", width: "100%" }}
          >
            <FancyGuide guide={page.quickStartGuide} onClick={onClick} />
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

RelatedGuide.propTypes = {
  page: PropTypes.object,
};

export default RelatedGuide;
