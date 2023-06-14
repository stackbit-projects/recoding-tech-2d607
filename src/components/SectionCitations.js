// base imports
import React, { useEffect, useState } from "react";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// MUI icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// utils
import client from "../utils/sanityClient";
import process from "../utils/processCitations";

const query = `*[!(_id in path("drafts.**")) && _type == "citation" && date != null]{_id, date, title, shortTitle, url, creators[]->{firstName, lastName}, institution, place, blogTitle, websiteTitle, publicationTitle}|order(date desc)[0...4]`; // just get the four most recent citations

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.error.main,
    paddingLeft: 10,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 16,
  },
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
    fontSize: "1.2em",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  citationPublication: {
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 25,
    marginBottom: 8,
    position: "relative",
  },
  em: {
    fontSize: "0.81em",
    fontStyle: "italic",
  },
  grid: {},
  gridTitle: {
    borderBottom: "1px solid #000",
    marginBottom: 32,
    marginTop: 32,
    width: "100%",
  },
  link: {
    textDecoration: "none !important",
  },
}));

const SectionCitations = () => {
  const classes = useStyles();
  const [citations, setCitations] = useState([]);

  useEffect(() => {
    client.fetch(query).then((cites) => {
      setCitations(cites);
    });
  }, []);

  return (
    <Grid container className={classes.grid}>
      <Grid item className={classes.gridTitle}>
        <Typography component="h2" variant="h4">
          New by our contributors
        </Typography>
      </Grid>
      <Grid container item flexDirection="column">
        {citations && citations.length
          ? citations.map((citation, idx) => (
              <Grid
                item
                key={citation._id}
                className={
                  idx === citations.length - 1
                    ? classes.lastCitation
                    : classes.citation
                }
              >
                <Link href={citation.url} className={classes.link}>
                  <Typography
                    component="div"
                    variant="body1"
                    className={classes.citationTitle}
                  >
                    {citation.title}
                  </Typography>
                  <Typography
                    component="div"
                    variant="h5"
                    className={classes.citationPublication}
                  >
                    {process(citation)}
                    <ArrowForwardIcon className={classes.arrow} />
                  </Typography>
                </Link>
              </Grid>
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default SectionCitations;
