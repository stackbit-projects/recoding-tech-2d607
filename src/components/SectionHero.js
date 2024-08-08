import React from "react";
import PropTypes from "prop-types";
import { titleCase } from "title-case";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import CustomBreadcrumbs from "./Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  advanced_hero: {
    lineHeight: "1.67",
    fontSize: "2em",
    paddingTop: 35,
    zIndex: 1,
    position: "relative",
  },
  author: {
    fontStyle: "italic",
    marginTop: 50,
    position: "relative",
    textAlign: "center",
    zIndex: 1,
  },
  author_hero: {
    lineHeight: "1.67",
    fontSize: "2em",
    paddingTop: 10,
    zIndex: 1,
    position: "relative",
  },
  hero: {
    marginBottom: 150,
    marginTop: 70,
    paddingBottom: 100,
    paddingTop: 0,
    position: "relative",
  },
  hero_text_box: {
    paddingTop: 15,
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
    height: 360,
    left: "50%",
    position: "absolute",
    top: "20%",
    transform: "translate(-50%, -50%)",
    width: 1050,
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

function SectionHero(props) {
  const classes = useStyles();
  let { page } = props;

  return (
    <section id={page._id} className="block block-hero">
      <Box
        style={{ backgroundColor: "#FFF" }}
      // style={{
      //   backgroundColor:
      //     page.stackbit_model_type == "data" || page.layout == "policy_action" || page.stackbit_url_path == "/contributors"
      //       ? "#FFF"
      //       : page._type == "author" ||
      //         page.stackbit_url_path == "/newsletter"
      //         ? theme.palette["secondary"].main
      //         : page.stackbit_url_path == "/library"
      //           ? "#EDE4C1"
      //           : theme.palette["topic"].main,
      // }}
      >
        <Container maxWidth="xl">
          <Box
            role="presentation"
            onClick={handleClick}
            sx={{ paddingY: 6 }}
            marginBottom={12}
          >
            {page._type === "policy_action" || page._type === "author" ? (
              <CustomBreadcrumbs page={page} />
            ) : null}
          </Box>
        </Container>
        <Container maxWidth="sm" className={classes.hero}>
          <Box className={classes.svg}>
            {/* <svg xmlns="http://www.w3.org/2000/svg"
              width="1126"
              height="440"
              fill="none"
              viewBox="0 0 1126 440">
              <path fill="#215793" d="M1126 0H711C586 0 586 126 460 126H0v314h460c126 0 126-126 251-126h415V0Z" />
            </svg> */}

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
                    : page.layout == "policy_action"
                      ? "#215793"
                      : page._type == "author" ||
                        page.stackbit_url_path == "/contributors" ||
                        page.stackbit_url_path == "/newsletter"
                        ? "#3C6E63"
                        : page.stackbit_url_path == "/library"
                          ? "#DBD7B4"
                          : "#215793"
                }
              />
              {/* this was the white outline shape that used to be part of the design
               {page._type !== "policy_action" ? (
                <path
                  d="M587.5 277H430.8c-78.3 0-78.3-78.6-156.6-78.6H117.5V2h156.7c78.3 0 78.3 78.6 156.6 78.6h156.7V277Z"
                  stroke={page.stackbit_model_type == "data" ? "" : "#EFE9DA"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null} */}
            </svg>
          </Box>
          <Container maxWidth="sm" className={classes.hero_text_box}>
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
                Contributors
              </Typography>
            ) : null}

            {page._type === "advanced" || page._type === "author" ? (
              <Typography
                variant="h1"
                className={
                  page._type === "advanced"
                    ? classes.advanced_hero
                    : classes.author_hero
                }
                color={
                  page.stackbit_model_type == "data" ||
                    page.stackbit_url_path == "/library"
                    ? "#000"
                    : "#FFF"
                }
              >
                {page.title || page.name}
              </Typography>
            ) : (
              <Typography
                sx={{
                  typography: {
                    // this is to accommodate long policy action titles
                    sm: "h1_hero",
                    xs: "h2_hero",
                  },
                }}
                className={classes.title}
                color={
                  page.stackbit_model_type == "data" ||
                    page.stackbit_url_path == "/library"
                    ? "#000"
                    : "#FFF"
                }
                fontSize={page._type == "author" ? "16em" : "2em"}
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
          </Container>
        </Container>
      </Box>
    </section>
  );
}

SectionHero.propTypes = {
  page: PropTypes.object,
};

export default SectionHero;
