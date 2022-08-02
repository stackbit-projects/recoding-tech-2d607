// base imports
import React, { useEffect, useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { titleCase } from "title-case";

// utils
import client from "../utils/sanityClient";
import process from "../utils/processCitations";

// material ui imports
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

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
  boxNoHover: {
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
  },
  content: {
    fontStyle: "italic",
  },
  em: {
    fontSize: "0.95em",
    fontStyle: "italic",
  },
  featured: {
    backgroundColor: theme.palette.footer.main,
  },
  sidebar: {
    backgroundColor: theme.palette.secondary.main,
  },
  noClick: {
    cursor: "default",
  },
}));

const FancyCard = ({
  author,
  category,
  citation,
  citationToFetch,
  content,
  date,
  notClickable,
  lastUpdated,
  isArticle,
  isSidebar,
  title,
  onClick = () => {},
}) => {
  const classes = useStyles();
  const [reading, setReading] = useState(null);

  useEffect(() => {
    if (citation) {
      setReading(citation);
    }

    if (citationToFetch) {
      client.fetch(`*[_id == "${citationToFetch}"][0]`).then((ref) => {
        setReading(ref);
      });
    }
  }, [citation, citationToFetch]);

  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: reading ? 4 : 0 }}
      className={`${isSidebar ? classes.sidebar : classes.featured} ${
        notClickable ? classes.boxNoHover : classes.box
      }`}
    >
      <CardActionArea
        onClick={
          reading ? () => Router.push({ pathname: reading.url }) : onClick
        }
        className={notClickable ? classes.noClick : ""}
      >
        <CardContent>
          {category && (
            <Typography component="div" variant="supertitle">
              {category}
            </Typography>
          )}
          {(reading || title) && (
            <Typography component="div" variant="h2_article" gutterBottom>
              {reading ? titleCase(reading.title) : titleCase(title)}
            </Typography>
          )}
          {(reading || author) && (
            <Typography gutterBottom component="div" variant="h5_card">
              {!isArticle ? process(reading) : author}
            </Typography>
          )}
          {(reading || date) && (
            <Typography component="div" variant="body1" className={classes.em}>
              {DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
            </Typography>
          )}
          {lastUpdated && (
            <Typography component="div" variant="body1" className={classes.em}>
              Last updated:{" "}
              {DateTime.fromISO(lastUpdated).toLocaleString(DateTime.DATE_FULL)}
            </Typography>
          )}
          <Typography
            component="div"
            variant="body1"
            className={classes.content}
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

FancyCard.propTypes = {
  author: PropTypes.string,
  category: PropTypes.string,
  citation: PropTypes.object,
  citationToFetch: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  isArticle: PropTypes.bool,
  isSidebar: PropTypes.bool,
  notClickable: PropTypes.bool,
  publication: PropTypes.string,
  title: PropTypes.string,
  lastUpdated: PropTypes.string,
  onClick: PropTypes.func,
};

export default FancyCard;
