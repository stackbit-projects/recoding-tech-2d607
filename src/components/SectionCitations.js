// base imports
import React, { useEffect, useState } from "react";
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
            <Link href="/search" className={classes.link}>
              View all
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item flexDirection="column">
        {sortedCitations && sortedCitations.length
          ? sortedCitations.slice(0, 4).map(citation => (
              <Grid
                item
                key={citation.__metadata.id}
                className={classes.citation}
              >
                <Typography component="div" variant="body1">
                  <Link className={classes.citationTitle} href={citation.url}>
                    {citation.title}
                  </Link>
                </Typography>
                <Typography
                  component="div"
                  variant="h5"
                  className={classes.citationPublication}
                >
                  {citation.publicationTitle
                    ? citation.publicationTitle
                    : citation.websiteTitle}
                </Typography>
                <Typography>
                  {moment(citation.date).strftime("%B %e, %Y")}
                </Typography>
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
