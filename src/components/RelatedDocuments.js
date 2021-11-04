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
import Typography from "@mui/material/Typography";

import FancyCard from "./FancyCard";

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
  const classes = useStyles();
  const { page } = props;

  const docClick = file => {
    console.log("file:", file);
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
      <Container>
        <Box my={4} pt={8} sx={{ borderTop: "1px solid #000" }}>
          <Typography component="h2" variant="h4" className={classes.title}>
            Related Primary Documents
          </Typography>
          {Array.isArray(page.relatedDocs) && page.relatedDocs.length ? (
            <Box mt={4}>
              <Slider {...sliderSettings}>
                {page.relatedDocs.map((doc, index) => (
                  <FancyCard
                    key={index}
                    title={doc.title}
                    onClick={docClick(doc.file)}
                  />
                ))}
              </Slider>
            </Box>
          ) : null}
        </Box>
      </Container>
    </section>
  );
};

RelatedDocuments.propTypes = {
  page: PropTypes.object
};

export default RelatedDocuments;
