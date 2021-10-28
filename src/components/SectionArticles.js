// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
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
      zIndex: "-1"
    },
    "&:active, &:focus, &:hover": {
      "&::before": {
        left: "-14px",
        top: 10,
        transition: "left 250ms, top 250ms"
      }
    }
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic"
  },
  featured: {
    backgroundColor: theme.palette.footer.main
  },
  tracker: {
    backgroundColor: theme.palette.policy.main
  }
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

  const articleClick = url => {
    Router.push({ pathname: '/article/' + url });
  };

  const trackerClick = () => {
    Router.push({ pathname: "/tracker" });
  };

  return (
    <section>
      <Container>
        <Box my={4}>
          <Card
            variant="outlined"
            className={`${classes.box} ${classes.tracker}`}
          >
            <CardActionArea onClick={trackerClick}>
              <CardContent>
                <Typography component="div" variant="h4">
                  Keep up with how governments are recoding tech
                </Typography>
                <Typography component="div" variant="h2">
                  Law &amp; Regulation Tracker
                </Typography>
                <Typography component="div" variant="h5">
                  Recoding.tech
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        {article ? (
          <Box mb={4}>
            <Card
              variant="outlined"
              className={`${classes.box} ${classes.featured}`}
            >
              <CardActionArea onClick={() => articleClick(article.slug)}>
                <CardContent>
                  <Typography component="div" variant="h4">
                    Featured Article
                  </Typography>
                  <Typography component="div" variant="h2">
                    {article.title}
                  </Typography>
                  <Typography component="div" variant="h5">
                    {article.author.name}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    className={classes.em}
                  >
                    {article.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ) : null}
      </Container>
    </section>
  );
}

SectionArticle.propTypes = {
  section: PropTypes.object
};

export default SectionArticle;
