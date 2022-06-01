// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import moment from "moment-strftime";
import { titleCase } from "title-case";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import HomepageActions from "./HomepageActions";
import FancyTitle from "./FancyTitle";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "20px",
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
    "&::before": {
      backgroundColor: "#fff",
      border: "1px solid #000",
      content: "''",
      height: "100%",
      left: "-8px",
      position: "absolute",
      top: 5,
      transition: "left 250ms, top 250ms",
      width: "100%",
      zIndex: "-1",
    },
    "&:active, &:focus, &:hover": {
      "&::before": {
        left: "-14px",
        top: 10,
        transition: "left 250ms, top 250ms",
      },
    },
  },
  em: {
    fontSize: "0.95em",
    fontStyle: "italic",
  },
  featured: {
    backgroundColor: theme.palette.footer.main,
  },
  tracker: {
    backgroundColor: theme.palette.policy.main,
  },
}));

function SectionArticle(props) {
  const classes = useStyles();
  const {
    section: { featuredArticle, alsoFeatured },
  } = props;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    setArticle(featuredArticle);
  }, []);

  const articleClick = (url) => {
    Router.push({ pathname: "/article/" + url });
  };

  return (
    <Container>
      {article ? (
        <>
          <FancyTitle
            title={"Commentary & Analysis"}
            subtitle={"The latest from our staff and network of experts"}
          />
          <Box mb={alsoFeatured ? 1 : 10}>
            <Card
              variant="outlined"
              className={`${classes.box} ${classes.featured}`}
            >
              <CardActionArea onClick={() => articleClick(article.slug)}>
                <CardContent>
                  <Typography gutterBottom component="div" variant="h2_article">
                    {titleCase(article.title)}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    variant="h5_card"
                    className={classes.author}
                  >
                    {article.author.name}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    className={classes.em}
                  >
                    {moment(article.date).strftime("%B %e, %Y")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </>
      ) : null}
      {alsoFeatured && alsoFeatured.length ? (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          spacing={{ xs: 2, md: 3 }}
          mb={10}
        >
          {alsoFeatured.map((article, idx) => (
            <Grid item key={idx} xs={12} sm={6} mt={2}>
              <Card
                variant="outlined"
                className={`${classes.box} ${classes.featured}`}
              >
                <CardActionArea onClick={() => articleClick(article.slug)}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      component="div"
                      variant="h2_article"
                    >
                      {titleCase(article.title)}
                    </Typography>
                    <Typography gutterBottom component="div" variant="h5_card">
                      {article.author.name}
                    </Typography>
                    <Typography
                      component="div"
                      variant="body1"
                      className={classes.em}
                    >
                      {moment(article.date).strftime("%B %e, %Y")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
      <FancyTitle
        title={"Law & Regulation Tracker"}
        subtitle={"Keep up with how governments are recoding tech"}
        isTracker={true}
      />
      <Box my={4} mt={2} mb={10}>
        <HomepageActions />
      </Box>
    </Container>
  );
}

SectionArticle.propTypes = {
  section: PropTypes.object,
};

export default SectionArticle;
