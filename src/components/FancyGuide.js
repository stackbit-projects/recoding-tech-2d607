// base imports
import React from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

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
    textAlign: "left",
  },
  guide: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const FancyGuide = ({ guide, onClick = () => {} }) => {
  const classes = useStyles();

  return (
    <Card
      key={guide._id}
      variant="outlined"
      className={`${classes.card} ${classes.guide}`}
    >
      <CardActionArea
        onClick={() => onClick(guide.slug)}
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
  );
};

FancyGuide.propTypes = {
  guide: PropTypes.object,
  onClick: PropTypes.func,
};

export default FancyGuide;
