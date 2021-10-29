// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    border: "1px solid #000",
    borderRadius: 0,
    height: 250,
    position: "relative",
    width: 240
  },
  cardAction: {
    height: "100%",
    position: "absolute",
    width: "100%"
  },
  cardTitle: {
    fontSize: "1.5em",
    marginTop: 170
  },
  em: {
    fontStyle: "italic",
    textAlign: "center"
  },
  guide: {
    backgroundColor: theme.palette.secondary.main
  },
  title: {
    textAlign: "center"
  }
}));

const RelatedDocuments = props => {
  const { page } = props;
  if (!page.quickStartGuide) return null;
  const classes = useStyles();

  const onClick = () => {
    Router.push({ pathname: `/guide/${page.quickStartGuide.slug}` });
  };

  return (
    <section>
      <Grid container className={classes.grid}>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              Quick-start Guide
            </Typography>
            <Typography
              component="div"
              variant="body1"
              className={classes.em}
            >
              Overview of {page.displayTitle ? page.displayTitle : page.name } and recommended reading
            </Typography>
          </Grid>
          <Box my={4} pt={8} sx={{ borderTop: "1px solid #000" }}>
            <Card
              variant="outlined"
              className={`${classes.box} ${classes.guide}`}
            >
              <CardActionArea onClick={onClick}>
                <CardContent>
                  <Typography component="div" variant="h2">
                    {page.quickStartGuide.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

RelatedDocuments.propTypes = {
  page: PropTypes.object
};

export default RelatedDocuments;
