// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// components
import FancyGuide from "./FancyGuide";

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic",
    textAlign: "center"
  },
  title: {
    textAlign: "center"
  }
}));

const SectionGuides = props => {
  const classes = useStyles();
  const { pages } = props;
  const [guides, setGuides] = useState(null);

  useEffect(() => {
    if (pages) {
      const allGuides = pages.filter(page => page.layout == "guide");
      setGuides(allGuides);
    }
  }, []);

  useEffect(() => {}, [guides]);

  const guideClick = url => {
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
              <Carousel autoPlay={false} showStatus={false}>
                {guides.map(guide => (
                  <FancyGuide
                    key={guide.__metadata.id}
                    guide={guide}
                    onClick={() => guideClick(guide.slug)}
                  />
                ))}
              </Carousel>
            </Box>
          ) : null}
        </Box>
      </Container>
    </section>
  );
};

SectionGuides.propTypes = {
  pages: PropTypes.array
};

export default SectionGuides;
