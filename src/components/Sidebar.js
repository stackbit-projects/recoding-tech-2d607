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
  guide: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: "center",
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  return (
    <section>
      <Container>
        <Box my={4} pt={8} >
          <Card
            key={`1`}
            variant="outlined"
            className={`${classes.card} ${classes.guide}`}
          >
            {/* <CardActionArea
                      onClick={() => guideClick(guide.slug)}
                      className={classes.cardAction}
                    > */}
            <CardContent>
              <Typography
                component="div"
                variant="h2"
                className={classes.cardTitle}
              >
                Card title
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
          </Card>
        </Box>
      </Container>
    </section>
  );
};

export default Sidebar;
