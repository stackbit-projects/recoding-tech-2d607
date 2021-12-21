// base imports
import React, { useEffect, useState } from "react";
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

// components
import FancyGuide from "./FancyGuide";

import client from "../utils/sanityClient";

const query =
  '*[_type == "guide"]{_id, title, slug, subtitle, _created_at, _updatedAt } | order(date desc)';

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
}));

const SectionGuides = () => {
  const classes = useStyles();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    client.fetch(query).then((gs) => {
      let allGuides = [];
      gs.forEach((g) => {
        allGuides = [...allGuides, g];
      });
      setGuides(allGuides);
    });
  }, []);

  useEffect(() => {}, [guides]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const guideClick = (url) => {
    Router.push({ pathname: "/guide/" + url });
  };

  return (
    <section>
      <Container>
        <Box my={4} pt={8} sx={{ borderTop: "1px solid #000" }}>
          <Typography component="h2" variant="h3" className={classes.title}>
            Quick-start Guides
          </Typography>
          <Typography
            component="div"
            variant="body1"
            className={classes.em}
            gutterBottom
          >
            Overviews and reading reccomendations to help illuminate key issues
            and policy options.
          </Typography>
          {guides && guides.length ? (
            <Box mt={4}>
              <Slider {...sliderSettings}>
                {guides.map((guide) => (
                  <FancyGuide
                    key={guide.title}
                    guide={guide}
                    onClick={() => guideClick(guide.slug.current)}
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

SectionGuides.propTypes = {
  guides: PropTypes.array,
};

export default SectionGuides;
