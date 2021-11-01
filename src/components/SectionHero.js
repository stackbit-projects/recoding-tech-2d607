import React from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import { withPrefix } from "../utils";

const useStyles = makeStyles(theme => ({
  author: {
    fontStyle: "italic",
    marginTop: 50,
    position: "relative",
    textAlign: "center",
    zIndex: 1
  },
  hero: {
    position: "relative"
  },
  link: {
    color: theme.typography.link.color,
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "relative",
    zIndex: 1
  },
  links: {
    marginTop: 40,
    textAlign: "center"
  },
  superTitle: {
    textAlign: "center",
    position: "relative",
    zIndex: 1
  },
  svg: {
    height: 250,
    left: "50%",
    position: "absolute",
    top: "40%",
    transform: "translate(-50%, -50%)",
    width: 650,
    zIndex: 0
  },

  title: {
    position: "relative",
    zIndex: 1
  }
}));

function SectionHero(props) {
  const classes = useStyles();
  const theme = useTheme();
  let { page } = props;
  console.log('page.type:', page.type);
  return (
    <section id={page.__metadata.id} className="block block-hero">
      <Box paddingY={16} style={{ backgroundColor: page.type && theme.palette[page.type] ? theme.palette[page.type].main : theme.palette.secondary.main }}>
        <Container maxWidth="sm" className={classes.hero}>
          <Box className={classes.svg}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 705 279"
            >
              <path
                d="M705 2H445c-78.4 0-78.4 78.6-156.7 78.6H0V277h288.3c78.3 0 78.3-78.6 156.6-78.6H705V2Z"
                fill="#B3C1C0"
                opacity=".3"
              />
              <path
                d="M587.5 277H430.8c-78.3 0-78.3-78.6-156.6-78.6H117.5V2h156.7c78.3 0 78.3 78.6 156.6 78.6h156.7V277Z"
                stroke="#EFE9DA"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          {page.__metadata.modelName == "policy_action" ? (
            <Typography variant="h4" className={classes.superTitle}>
              Tracker Detail
            </Typography>
          ) : page.__metadata.modelName == "guide" ? (
            <Typography variant="h4" className={classes.superTitle}>
              Quick-start Guide
            </Typography>
          ) : page.__metadata.modelName == "topic" ? (
            <Typography variant="h4" className={classes.superTitle}>
            {page.type}
            </Typography>
          ) : null}
          {(page.displayTitle || page.heroContent || page.title) && (
            <Typography variant="h1" className={classes.title}>
              {page.displayTitle
                ? page.displayTitle
                : page.heroContent
                ? page.heroContent
                : page.title}
            </Typography>
          )}
          {page.heroLinkUrl && (
            <div className={classes.links}>
              <Link
                variant="link"
                href={withPrefix(page.heroLinkUrl)}
                className={classes.link}
              >
                {page.heroLinkText}
              </Link>
            </div>
          )}
          {page.__metadata.modelName == "guide" && (
            <Typography
              component="div"
              variant="body1"
              className={classes.author}
            >
              {page.author.name} – Last updated{" "}
              {moment(page.datePublished).strftime("%B %e, %Y")}
            </Typography>
          )}
        </Container>
      </Box>
    </section>
  );
}

SectionHero.propTypes = {
  page: PropTypes.object
};

export default SectionHero;
