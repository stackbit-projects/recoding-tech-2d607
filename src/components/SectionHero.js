import React from "react";
import _ from "lodash";

import { markdownify } from "../utils";
import CtaButtons from "./CtaButtons";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  hero: {
    position: "relative"
  },
  svg: {
    height: 250,
    left: "50%",
    position: "absolute",
    top: "50%",
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
      <Box marginY={4}>
        <Container maxWidth="sm" className={classes.hero}>
          <Box className={classes.svg}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 705 279"
            >
              <path
                d="M705 2H445c-78.4 0-78.4 78.6-156.7 78.6H0V277h288.3c78.3 0 78.3-78.6 156.6-78.6H705V2Z"
                fill="#C2CECC"
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
        </Container>
      </Box>
      {_.get(section, "content", null) && (
        <div className="block-content inner-sm">
          {markdownify(_.get(section, "content", null))}
        </div>
      )}
      {_.get(section, "actions", null) && (
        <div className="block-buttons inner-sm">
          <CtaButtons
            {...this.props}
            actions={_.get(section, "actions", null)}
          />
        </div>
      )}
    </section>
  );
}

export default SectionHero;
