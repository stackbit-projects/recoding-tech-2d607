import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { titleCase } from "title-case";

// Material UI imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import { withPrefix } from "../utils";

const useStyles = makeStyles((theme) => ({
  author: {
    fontStyle: "italic",
    marginTop: 50,
    position: "relative",
    textAlign: "center",
    zIndex: 1,
  },
  hero: {
    marginBottom: 60,
    marginTop: 70,
    paddingBottom: 150,
    paddingTop: 40,
    position: "relative",
  },
  link: {
    color: theme.typography.link.color,
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "relative",
    zIndex: 1,
  },
  links: {
    marginTop: 40,
    textAlign: "center",
  },
  superTitle: {
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  svg: {
    height: 350,
    left: "50%",
    position: "absolute",
    top: "40%",
    transform: "translate(-50%, -50%)",
    width: 750,
    zIndex: 0,
  },

  title: {
    position: "relative",
    zIndex: 1,
  },
}));

function SectionHero(props) {
  const classes = useStyles();
  const theme = useTheme();
  let { page } = props;

  return (
    <section id={page._id} className="block block-hero">
      <Box
        style={{
          backgroundColor:
            page.stackbit_model_type == "data"
              ? "#FFF"
              : page.layout == "policy_action" ||
                page._type == "author" ||
                page.stackbit_url_path == "/contributors" ||
                page.stackbit_url_path == "/newsletter" ||
                page.stackbit_url_path == "/newsletter-new"
              ? theme.palette["secondary"].main
              : page.stackbit_url_path == "/donate" ||
                page.stackbit_url_path == "/donate_new"
              ? "#559482"
              : page.stackbit_url_path == "/library"
              ? "#EDE4C1"
              : theme.palette["topic"].main,
        }}
      >
        <Container maxWidth="lg" sx={{ paddingTop: 6 }}></Container>
        <Container maxWidth="sm" className={classes.hero}>
          <Box className={classes.svg}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 705 279"
            >
              <path
                d="M705 2H445c-78.4 0-78.4 78.6-156.7 78.6H0V277h288.3c78.3 0 78.3-78.6 156.6-78.6H705V2Z"
                fill={
                  page.stackbit_model_type == "data"
                    ? "#ECF0F0"
                    : page.layout == "policy_action" ||
                      page._type == "author" ||
                      page.stackbit_url_path == "/contributors" ||
                      page.stackbit_url_path == "/newsletter" ||
                      page.stackbit_url_path == "/newsletter-new"
                    ? "#3C6E63"
                    : page.stackbit_url_path == "/donate" ||
                      page.stackbit_url_path == "/donate_new"
                    ? "#3C8671"
                    : page.stackbit_url_path == "/library"
                    ? "#DBD7B4"
                    : "#215793"
                }
              />
              {page._type !== "policy_action" ? (
                <path
                  d="M587.5 277H430.8c-78.3 0-78.3-78.6-156.6-78.6H117.5V2h156.7c78.3 0 78.3 78.6 156.6 78.6h156.7V277Z"
                  stroke={page.stackbit_model_type == "data" ? "" : "#EFE9DA"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
            </svg>
          </Box>
          {page._type == "policy_action" ? (
            <Typography
              variant="h4"
              className={classes.superTitle}
              color={"#FFF"}
            >
              Tracker Detail
            </Typography>
          ) : page._type == "topic" ? (
            <Typography
              variant="h4"
              className={classes.superTitle}
              color={page.stackbit_model_type == "page" ? "#FFF" : "#000"}
            >
              Topic
            </Typography>
          ) : page._type == "article" ? (
            <Typography variant="h4" className={classes.superTitle}>
              Commentary & Analysis
            </Typography>
          ) : page._type == "author" ? (
            <Typography
              variant="h4"
              className={classes.superTitle}
              sx={{ color: "#FFF" }}
            >
              contributors
            </Typography>
          ) : null}
          {(page.displayName ||
            page.heroContent ||
            page.title ||
            page.name) && (
            <Typography
              variant="h1"
              className={classes.title}
              color={
                page.stackbit_model_type == "data" ||
                page.stackbit_url_path == "/library"
                  ? "#000"
                  : "#FFF"
              }
              fontSize={page._type == "policy_action" ? "1.6em" : "2em"}
            >
              {titleCase(
                page.displayName
                  ? page.displayName
                  : page.name
                  ? page.name
                  : page.heroContent
                  ? page.heroContent
                  : page.title
              )}
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
          {(page._type == "guide" || page._type == "article") && (
            <Typography
              component="div"
              variant="body1"
              className={classes.author}
            >
              {page.author ? `${page.author.name} – ` : ""}
              {page._type == "guide"
                ? `Last updated: ${DateTime.fromISO(
                    page._updatedAt
                  ).toLocaleString(DateTime.DATE_FULL)}`
                : DateTime.fromISO(page.date).toLocaleString(
                    DateTime.DATE_FULL
                  )}
            </Typography>
          )}
        </Container>
      </Box>
    </section>
  );
}

SectionHero.propTypes = {
  page: PropTypes.object,
};

export default SectionHero;
