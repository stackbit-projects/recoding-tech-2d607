// base imports
import React, { useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
  citation: {
    borderBottom: "1px solid #000",
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
}));

const Readings = props => {
  const classes = useStyles();
  const { page } = props;
  const [sortedCommentary, setSortedCommentary] = useState(null);
  const title = _.get(props, 'title', 'Latest Headlines &amp; Highlights')

  useEffect(() => {
    const sort = page.relatedCommentary ? page.relatedCommentary.sort((a, b) => {
      if (a.date && b.date) {
        return Date.parse(b.date) - Date.parse(a.date);
      } else {
        return false;
      }
    }) : [];
    setSortedCommentary(sort);
  }, []);

  useEffect(() => {}, [sortedCommentary]);

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
            {title}
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
        {sortedCommentary && sortedCommentary.length
          ? sortedCommentary.slice(0, 4).map(commentary => (
              <Grid
                item
                key={commentary.__metadata.id}
                className={classes.citation}
              >
                <Typography component="div" variant="body1">
                  <Link className={classes.citationTitle} href={commentary.url || `/${commentary.layout}/${commentary.slug}`}>
                    {commentary.title}
                  </Link>
                </Typography>
                <Typography
                  component="div"
                  variant="h5"
                  className={classes.citationPublication}
                >
                  {commentary.publicationTitle
                    ? commentary.publicationTitle
                    : commentary.websiteTitle}
                </Typography>
                <Typography>
                  {moment(commentary.date).strftime("%B %e, %Y")}
                </Typography>
              </Grid>
            ))
          : null}
      </Grid>
    </Grid>
  );
};

Readings.propTypes = {
  relatedCommentary: PropTypes.array
};

export default Readings;
