import React from "react";
// import PropTypes from "prop-types";
import Router from "next/router";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import FancyCard from "./FancyCard";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #000",
    borderRadius: 0,
    height: 250,
    position: "relative",
    width: 240,
  },
  cardAction: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  cardTitle: {
    fontSize: "1.5em",
    marginTop: 170,
  },
  em: {
    fontStyle: "italic",
    textAlign: "center",
  },
  sidebar: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: "center",
  },
}));

const Sidebar = (props) => {
  const { content } = props;
  const classes = useStyles();

  console.log("content", content[0])
  const cardClick = (path) => {
    const handler = () => Router.push({ pathname: path });
    return handler
  };

  return (
    <section>
      <Container>
        <Box my={4} pt={8}>
          {content.map((page, index) => (
            <Box mt={2}>
              <FancyCard
                key={index}
                isSidebar={true}
                title={page.title}
                onClick={cardClick(page.stackbit_url_path)}
                lastUpdated={page.__metadata.updatedAt}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default Sidebar;
