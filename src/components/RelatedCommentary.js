// base imports
import React, { useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
// import { DateTime } from "luxon";

// utils
import process from "../utils/processCitations";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "./NextLinkComposed";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = makeStyles(() => ({
  citation: {
    borderBottom: "1px solid",
    borderBottomColor: "#DCDCDC",
    marginBottom: 20,
    paddingBottom: 20,
  },
  lastCitation: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  citationTitle: {
    color: "#000 !important",
    fontSize: "1em !important",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  citationPublication: {
    fontWeight: "bold",
    color: "#7C7B7B",
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic",
  },
  grid: {},
  gridTitle: {
    borderBottom: "1px solid #000",
    marginBottom: 6,
    marginTop: 6,
  },
  noUnderline: {
    textDecoration: "none",
  },
  trackerIcon: {
    color: "#FF0033",
    // left: 0,
    // position: "absolute",
    top: "50%",
    transform: "translateY(30%)",
  },
}));

const RelatedCommentary = (props) => {
  const { commentary, topic, noFilter } = props;
  if (!Array.isArray(commentary) || !commentary.length) return null;
  const classes = useStyles();
  const [sortedCommentary, setSortedCommentary] = useState(null);
  const title = _.get(props, "title", "Related");

  useEffect(() => {
    const sort = commentary.sort((a, b) => {
      if (a.date && b.date) {
        return Date.parse(b.date) - Date.parse(a.date);
      } else {
        return false;
      }
    });
    setSortedCommentary(sort);
  }, []);

  return (
    <section>
      <Grid container className={classes.grid}>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              {title}
            </Typography>
          </Grid>
          {!noFilter ? (
            <Grid item xs={4}>
              <Typography component="div" variant="h4">
                <Link
                  href={{
                    pathname: "/search",
                    query: { filter: topic },
                  }}
                  className={classes.link}
                >
                  View all
                </Link>
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid container item flexDirection="column">
          {sortedCommentary && sortedCommentary.length
            ? sortedCommentary.map((comment, idx) => (
                <Link
                  className={classes.noUnderline}
                  key={comment.__metadata ? comment.__metadata.id : comment._id}
                  href={
                    comment._type == "citation"
                      ? comment.url || `/${comment.layout}/${comment.slug}`
                      : `https://techpolicy.press/${comment.slug.current}`
                  }
                >
                  <Grid
                    item
                    key={
                      comment.__metadata ? comment.__metadata.id : comment._id
                    }
                    className={
                      idx === 3 ? classes.lastCitation : classes.citation
                    }
                  >
                    <Typography
                      component="div"
                      variant="body1"
                      className={classes.citationTitle}
                    >
                      {/* <Link
                    className={classes.citationTitle}
                    href={
                      comment._type == "citation"
                        ? comment.url || `/${comment.layout}/${comment.slug}`
                        : `https://techpolicy.press/${comment.slug.current}`
                    }
                  > */}
                      {comment.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      variant="h5_alt"
                      className={classes.citationPublication}
                    >
                      {comment._type == "citation"
                        ? process(comment)
                        : "Tech Policy Press"}{" "}
                      <ArrowForwardIcon className={classes.trackerIcon} />
                    </Typography>
                  </Grid>
                </Link>
              ))
            : null}
        </Grid>
      </Grid>
    </section>
  );
};

RelatedCommentary.propTypes = {
  commentary: PropTypes.array,
  topic: PropTypes.string,
  noFilter: PropTypes.bool,
};

export default RelatedCommentary;
