import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { titleCase } from "title-case";

// Material UI imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import { withPrefix } from "../utils";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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

function handleClick(event) {
  event.preventDefault();
}

function format(crumb) {
  return titleCase(crumb.split("-").join(" "));
}

function SectionHero(props) {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  let { page } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (router) {
      setBreadcrumbs(router.query.slug);
    }
  }, [router]);

  useEffect(() => {}, [breadcrumbs]);

  return (
    <section id={page.__metadata.id} className="block block-hero">
      <Box
        style={{
          backgroundColor:
            page.stackbit_model_type == "data"
              ? "#FFF"
              : page.layout == "policy_action" ||
                page.__metadata.modelName == "author"
              ? "#427569"
              : page.stackbit_url_path == "/library"
              ? "#EDE4C1"
              : theme.palette["topic"].main,
        }}
      >
        <Container maxWidth="xl">
          <Box role="presentation" onClick={handleClick} sx={{ paddingY: 6 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ color: "#FFF" }}
            >
              <Typography variant="body2" color="#FFF">
                Home
              </Typography>
              {breadcrumbs.length
                ? breadcrumbs.map((crumb, index) => {
                    if (index == breadcrumbs.length - 1) {
                      return (
                        <Typography key={crumb} variant="body2" color="#FF0033">
                          {format(crumb)}
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography key={crumb} variant="body2" color="#FFF">
                          {format(crumb)}
                        </Typography>
                      );
                    }
                  })
                : null}
            </Breadcrumbs>
          </Box>
        </Container>
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
                      page.__metadata.modelName == "author"
                    ? "#3C6E63"
                    : page.stackbit_url_path == "/library"
                    ? "#DBD7B4"
                    : "#215793"
                }
              />
              <path
                d="M587.5 277H430.8c-78.3 0-78.3-78.6-156.6-78.6H117.5V2h156.7c78.3 0 78.3 78.6 156.6 78.6h156.7V277Z"
                stroke={page.stackbit_model_type == "data" ? "#000" : "#EFE9DA"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          {page.__metadata.modelName == "policy_action" ? (
            <Typography
              variant="h4"
              className={classes.superTitle}
              color={"#FFF"}
            >
              Tracker Detail
            </Typography>
          ) : page.__metadata.modelName == "guide" ? (
            <Typography variant="h4" className={classes.superTitle}>
              Quick-start Guide
            </Typography>
          ) : page.__metadata.modelName == "topic" ? (
            <Typography
              variant="h4"
              className={classes.superTitle}
              color={page.stackbit_model_type == "page" ? "#FFF" : "#000"}
            >
              {page.type}
            </Typography>
          ) : page.__metadata.modelName == "article" ? (
            <Typography variant="h4" className={classes.superTitle}>
              Commentary & Analysis
            </Typography>
          ) : page.__metadata.modelName == "author" ? (
            <Typography
              variant="h4"
              className={classes.superTitle}
              sx={{ color: "#FFF" }}
            >
              contributors
            </Typography>
          ) : null}
          {(page.displayTitle ||
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
              fontSize={
                page.__metadata.modelName == "policy_action" ? "1.6em" : "2em"
              }
            >
              {titleCase(
                page.displayTitle
                  ? page.displayTitle
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
          {(page.__metadata.modelName == "guide" ||
            page.__metadata.modelName == "article") && (
            <Typography
              component="div"
              variant="body1"
              className={classes.author}
            >
              {page.author ? `${page.author.name} – ` : ""}
              {page.__metadata.modelName == "guide"
                ? `Last updated: ${DateTime.fromISO(
                    page.__metadata.updatedAt
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
