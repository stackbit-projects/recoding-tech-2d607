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
    fontStyle: "italic"
  },
  guide: {
    backgroundColor: theme.palette.secondary.main
  },
  title: {}
}));

const RelatedReadings = props => {
  const { page, readings } = props;

  if (!Array.isArray(readings) || !readings.length) return null;
  const classes = useStyles();

  const getHandler = article => {
    const handler = () => Router.push({ pathname: `/article/${article.slug}` });
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
            Related Reading
          </Typography>
          <Typography
            component="div"
            variant="body1"
            sx={{ fontStyle: "italic" }}
          >
            The latest thinking about{" "}
            {page.displayTitle ? page.displayTitle : page.title}
          </Typography>
          <Box mt={4}>
            <Slider {...sliderSettings}>
              {readings.map((article, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "90%",
                    marginBottom: 2,
                    marginLeft: 4,
                    marginRight: 4,
                    width: "90% !important"
                  }}
                >
                  <FancyCard
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
    </section>
  );
};

RelatedReadings.propTypes = {
  page: PropTypes.object,
  readings: PropTypes.array
};

export default RelatedReadings;
