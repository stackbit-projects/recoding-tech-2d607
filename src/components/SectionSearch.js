// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";
import Router from "next/router";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import FancyCard from './FancyCard';

const useStyles = makeStyles(theme => ({
  citation: {
    marginBottom: 20,
    paddingBottom: 20
  },
  citationTitle: {
    color: "#000 !important",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  citationPublication: {
    marginTop: 10
  },
  grid: {},
  gridTitle: {
    borderBottom: "1px solid #000",
    marginBottom: 32,
    marginTop: 32
  },
  link: {
    color: theme.typography.link.color
  }
}));

const SectionCitations = props => {
  const classes = useStyles();
  const { citations } = props;
  const [sortedCitations, setSortedCitations] = useState(null);

  useEffect(() => {
    const sort = citations.sort((a, b) => {
      if (a.date && b.date) {
        return Date.parse(b.date) - Date.parse(a.date);
      } else {
        return false;
      }
    });
    setSortedCitations(sort);
  }, []);

  useEffect(() => {}, [sortedCitations]);

  const getHandler = item => {
    const handler = () => Router.push({ pathname: item.url });
    return handler;
  };


  return (
    <Grid container className={classes.grid}>
      <Grid
        container
        item
        justifyContent="space-between"
        className={classes.gridTitle}
      >
        <Grid item xs={8}>
          <Typography component="h2" variant="h4">
            Latest Headlines &amp; Highlights
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography component="div" variant="h4">
            <Link href="/citations" className={classes.link}>
              View all
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item flexDirection="column">
        {sortedCitations && sortedCitations.length
          ? sortedCitations.slice(0, 4).map(citation => (
          <Grid
            container
            item
            justifyContent="space-between"
          >
            <Grid
              item
              key={citation.__metadata.id}
              className={classes.citation}
            >
              <FancyCard
                key={citation.__metadata.id}
                title={citation.title}
                publication={citation.publicationTitle
                      ? citation.publicationTitle
                      : citation.websiteTitle}
                date={moment(citation.date).strftime("%B %e, %Y")}
                onClick={getHandler(citation)}
              />
            </Grid>
            <Grid
              item
              key={citation.__metadata.id}
              className={classes.citation}
            >
              <KeyboardArrowRightIcon />
            </Grid>
          </Grid>
          ))
          : null}
      </Grid>
    </Grid>
  );
};

SectionCitations.propTypes = {
  citations: PropTypes.array
};

export default SectionCitations;
