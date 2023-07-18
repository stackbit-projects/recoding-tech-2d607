// base imports
import React, { useEffect, useState } from "react";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import client from "../utils/sanityClient";

// MUI icons
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PodcastsIcon from "@mui/icons-material/Podcasts";

const query = `*[!(_id in path("drafts.**")) && _type == "article" && date != null]{_id, title, slug}|order(date desc)[0...5]`; // just get the four most recent citations

const useStyles = makeStyles(() => ({
  citation: {
    borderBottom: "1px solid",
    borderBottomColor: "#DCDCDC",
    marginBottom: 20,
    paddingBottom: 20,
  },
  lastCitation: {
    marginBottom: 20,
  },
  citationTitle: {
    color: "#000 !important",
    fontSize: "1em",
    fontWeight: "700",
    "&:hover": {
      color: "#225C9D !important",
      textDecoration: "none",
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
  more: {
    textDecoration: "none",
    width: 162,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  moreText: {
    backgroundColor: "#FFE5EA",
    borderRadius: 2,
    color: "#FF0033",
    padding: 6,
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
                <Link
                  href={`/article/${citation.slug.current}`}
                  className={classes.link}
                >
                  <Typography
                    component="div"
                    variant="body1"
                    className={classes.citationTitle}
                  >
                    {citation.title}
                  </Typography>
                </Link>
              </Grid>
            ))
          : null}
        <Link href="#FIXME" className={classes.more}>
          <Typography component="div" variant="h5" className={classes.moreText}>
            More Contributors
          </Typography>
        </Link>
      </Grid>
      <Grid
        item
        sx={{
          backgroundColor: "#589383",
          color: "#F3F0E6",
          paddingX: 8,
          paddingY: 4,
          textAlign: "center",
          width: "100%",
        }}
      >
        <PodcastsIcon sx={{ fill: "#273649", width: 30 }} />
        <Typography
          component="div"
          variant="body1"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            marginTop: 2,
            textTransform: "uppercase",
          }}
        >
          The Sunday Show
        </Typography>
        <Typography
          component="div"
          variant="body2"
          sx={{
            marginTop: 1,
          }}
        >
          Tech Policy Press&apos;s Weekly Podcast
        </Typography>
        <Button
          href="#FIXME"
          color="tertiary"
          variant="contained"
          sx={{
            borderRadius: "2px",
            color: "#FFF",
            fontFamily: `"Roboto", sans-serif`,
            fontSize: 14,
            fontWeight: 300,
            marginTop: 2,
            paddingRight: 4,
            position: "relative",
            textTransform: "uppercase",
          }}
        >
          Subscribe Today
          <KeyboardArrowRightIcon
            sx={{
              position: "absolute",
              right: "4px",
              top: "49%",
              transform: "translateY(-50%)",
            }}
          />
        </Button>
      </Grid>
    </Grid>
  );
};

export default SectionCitations;
