import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// components imports
import CtaButtons from "./CtaButtons";

const useStyles = makeStyles(theme => ({
  hero: {
    position: "relative"
  },
  links: {
    marginTop: 80,
    textAlign: "center"
  },
  svg: {
    height: 250,
    left: "50%",
    position: "absolute",
    top: "30%",
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
  let { section } = props;

  return (
    <section
      id={_.get(section, "section_id", null)}
      className="block block-hero"
    >
      <Box paddingY={6} style={{ backgroundColor: "#c2cecc" }}>
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
          {_.get(section, "title", null) && (
            <Typography variant="h1" className={classes.title}>
              {_.get(section, "title", null)}
            </Typography>
          )}
          {_.get(section, "actions", null) && (
            <div className={classes.links}>
              <CtaButtons
                {...props}
                actions={_.get(section, "actions", null)}
              />
            </div>
          )}
        </Container>
      </Box>
    </section>
  );
}

SectionHero.propTypes = {
  section: PropTypes.object
};

export default SectionHero;
