// base imports
import React, { useEffect, useState } from "react";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import client from "../utils/sanityClient";

const query =
  '*[_type == "citation"]{_id, citation, citationPublication, citationTitle, date, publicationTitle, ref, title, url, websiteTitle}[0...5]';

let citations = [];

client.fetch(query).then(cites => {
  cites.forEach(citation => {
    citations = [...citations, citation];
  });
});

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

const SectionCitations = () => {
  const classes = useStyles();
  const [sortedCitations, setSortedCitations] = useState(null);

  useEffect(() => {
    if (citations.length) {
      const sort = citations.sort((a, b) => {
        if (a.date && b.date) {
          return Date.parse(b.date) - Date.parse(a.date);
        } else {
          return false;
        }
      });
      setSortedCitations(sort);
    }
  }, [citations]);

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
          ? sortedCitations.map(citation => (
              <Grid item key={citation._id} className={classes.citation}>
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

export default SectionCitations;
