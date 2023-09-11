// base imports
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import client from "../utils/sanityClient";

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
  },
  guide: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {},
}));

const RelatedReadings = (props) => {
  const { page, readings } = props;

  useEffect(() => {
    readings.map((article) => {
      //workaround for when the author is inexplicably a reference object
      if (article.author._type == "reference") {
        client.fetch(`*[_id == "${article.author._ref}"]`).then((person) => {
          article.author = person[0];
        });
      }
    });
  }, [readings]);

  if (!Array.isArray(readings) || !readings.length) return null;
  const classes = useStyles();

  const getHandler = (article) => {
    let slug;
    typeof article.slug === "object"
      ? (slug = article.slug.current)
      : (slug = article.slug);
    const handler = () => Router.push({ pathname: `/${slug}` });
    return handler;
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid container>
      <Grid
        container
        item
        sx={{
          borderBottom: "1px solid #000",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          className={classes.title}
        >
          Related Reading
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{ fontStyle: "italic", marginBottom: 3 }}
        >
          Our latest thinking about{" "}
          {page.displayTitle ? page.displayTitle : page.title}
        </Typography>
      </Grid>
      <Container>
        <Box xs={12} sm={12}>
          <Box mt={4}>
            <Slider {...sliderSettings}>
              {readings.map((article, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "90%",
                    marginBottom: 2,
                    marginLeft: 2,
                    marginRight: 2,
                    width: "90% !important",
                  }}
                >
                  <FancyCard
                    isArticle={true}
                    category={article.category}
                    title={article.title}
                    author={article.author.name}
                    date={article.date}
                    onClick={getHandler(article)}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

RelatedReadings.propTypes = {
  page: PropTypes.object,
  readings: PropTypes.array,
};

export default RelatedReadings;
