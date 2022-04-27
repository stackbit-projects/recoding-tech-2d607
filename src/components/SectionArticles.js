// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import moment from "moment-strftime";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// components
import FancyTitle from "./FancyTitle";

const useStyles = makeStyles((theme) => ({
  box: {
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
    fontSize: "0.8em",
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
  const { section } = props;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!article) {
      setArticle(section.featuredArticle);
    }
  }, [article]);

  const articleClick = (url) => {
    Router.push({ pathname: "/article/" + url });
  };

  const trackerClick = () => {
    Router.push({ pathname: "/tracker" });
  };

  return (
    <section>
      <Container>
        {article ? (
          <>
            <FancyTitle
              title={"Commentary & Analysis"}
              subtitle={"The latest from our staff and network of experts"}
            />
            <Box mb={10}>
              <Card
                variant="outlined"
                className={`${classes.box} ${classes.featured}`}
              >
                <CardActionArea onClick={() => articleClick(article.slug)}>
                  <CardContent>
                    <Typography component="div" variant="supertitle">
                      Featured Article
                    </Typography>
                    <Typography gutterBottom component="div" variant="h2">
                      {article.title}
                    </Typography>
                    <Typography gutterBottom component="div" variant="h5">
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
        <FancyTitle
          title={"Law & Regulation Tracker"}
          subtitle={"Keep up with how governments are recoding tech"}
        />
        <Box my={4} mb={10}>
          <Card
            variant="outlined"
            className={`${classes.box} ${classes.tracker}`}
          >
            <CardActionArea onClick={trackerClick}>
              <CardContent>
                <Typography component="div" variant="supertitle">
                  Keep up with how governments are recoding tech
                </Typography>
                <Typography gutterBottom component="div" variant="h2">
                  Law &amp; Regulation Tracker
                </Typography>
                <Typography component="div" variant="h5">
                  Recoding.tech
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Container>
    </section>
  );
}

SectionArticle.propTypes = {
  section: PropTypes.object,
};

export default SectionArticle;
