// base imports
import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import FancyCard from './FancyCard';

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

const RelatedReadings = props => {
  const { readings } = props;
  if (!Array.isArray(readings) || !readings.length) return null;
  const classes = useStyles();

  const getHandler = article => {
    const handler = () => Router.push({ pathname: `/article/${article.slug}` });
    return handler;
  };

  return (
    <section>
      <Container>
        <Box my={4} pt={8} sx={{ borderTop: "1px solid #000" }}>
          <Typography component="h2" variant="h4" className={classes.title}>
            Related Reading
          </Typography>
          <Box mt={4}>
            <Carousel autoPlay={false}>
              {readings.map((article, index) => (
                <FancyCard key={index} title={article.title} content={article.author.name} onClick={getHandler(article)} />
              ))}
            </Carousel>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

RelatedReadings.propTypes = {
  readings: PropTypes.array
};

export default RelatedReadings;
