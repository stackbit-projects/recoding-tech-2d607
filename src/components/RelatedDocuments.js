// base imports
import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FancyCard from "./FancyCard";

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
    textAlign: "center",
  },
  grid: {},
  guide: {
    backgroundColor: theme.palette.secondary.main,
  },
  gridTitle: {
    borderBottom: "1px solid #000",
    marginBottom: 32,
    marginTop: 32,
  },
}));

const RelatedDocuments = props => {
  const classes = useStyles();
  const { page } = props;

  const docClick = file => {
    const handler = () => Router.push({ pathname: file.url });
    return handler;
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
          <Grid item>
            <Typography component="h2" variant="h4">
              Related Primary Documents
            </Typography>
          </Grid>
        </Grid>
        <Grid container item flexDirection="column">
          {Array.isArray(page.relatedDocs) && page.relatedDocs.length ? (
            <Slider {...sliderSettings}>
              {page.relatedDocs.map((doc, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "90%",
                    marginBottom: 2,
                    marginLeft: 4,
                    marginRight: 4,
                    width: "90% !important",
                  }}
                >
                  <FancyCard
                    key={index}
                    title={doc.title}
                    onClick={docClick(doc.file)}
                  />
                </Box>
              ))}
            </Slider>
          ) : null}
        </Grid>
      </Grid>
    </section>
  );
};

RelatedDocuments.propTypes = {
  page: PropTypes.object
};

export default RelatedDocuments;
