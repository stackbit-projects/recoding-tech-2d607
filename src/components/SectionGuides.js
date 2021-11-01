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
import Container from "@mui/material/Container";
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

const SectionGuides = props => {
  const classes = useStyles();
  const { pages } = props;
  const [guides, setGuides] = useState(null);

  useEffect(() => {
    if (pages) {
      const allGuides = pages.filter(page => page.layout == "guide");
      setGuides(allGuides);
      console.log(allGuides);
    }
  }, []);

  const guideClick = url => {
    Router.push({ pathname: '/guide/' + url });
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
              <Carousel autoPlay={false}>
                {guides.map(guide => (
                  <Card
                    key={guide.__metadata.id}
                    variant="outlined"
                    className={`${classes.card} ${classes.guide}`}
                  >
                    <CardActionArea
                      onClick={() => guideClick(guide.slug)}
                      className={classes.cardAction}
                    >
                      <CardContent>
                        <Typography
                          component="div"
                          variant="h2"
                          className={classes.cardTitle}
                        >
                          {guide.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
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
