// base imports
import React from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

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
      zIndex: "-1"
    }
  },
  content: {
    fontStyle: "italic"
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic"
  },
  featured: {
    backgroundColor: theme.palette.footer.main
  },
  noClick: {
    cursor: "default"
  }
}));

const FancyCard = ({
  author,
  category,
  content,
  date,
  publication,
  notClickable,
  title,
  onClick = () => {}
}) => {
  const classes = useStyles();

  return (
    <Card
      variant="outlined"
      className={`${classes.featured} ${
        notClickable ? classes.boxNoHover : classes.box
      }`}
    >
      <CardActionArea
        onClick={onClick}
        className={notClickable ? classes.noClick : ""}
      >
        <CardContent>
          {category && (
            <Typography component="div" variant="h4">
              {category}
            </Typography>
          )}
          {title && (
            <Typography component="div" variant="h2">
              {title}
            </Typography>
          )}
          {author && (
            <Typography component="div" variant="h3">
              {author}
            </Typography>
          )}
          {publication && (
            <Typography component="div" variant="h4">
              {publication}
            </Typography>
          )}
          {date && (
            <Typography component="div" variant="body1" className={classes.em}>
              {date}
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
  content: PropTypes.string,
  date: PropTypes.string,
  notClickable: PropTypes.bool,
  publication: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default FancyCard;
