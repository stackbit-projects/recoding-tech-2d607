import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import FancyCard from "./FancyCard";

const useStyles = makeStyles(theme => ({
  card: {
    border: "1px solid #000",
    borderRadius: 0,
    height: 250,
    position: "relative",
    width: 240
  },
  cardAction: {
    height: "100%",
    position: "absolute",
    width: "100%"
  },
  cardTitle: {
    fontSize: "1.5em",
    marginTop: 170
  },
  em: {
    fontStyle: "italic",
    textAlign: "center"
  },
  sidebar: {
    backgroundColor: theme.palette.secondary.main
  },
  title: {
    textAlign: "center"
  }
}));

const Sidebar = props => {
  const { content } = props;

  console.log("content", content[0]);
  const cardClick = path => {
    const handler = () => Router.push({ pathname: path });
    return handler;
  };

  return (
    <section>
      <Container>
        <Box mt={2}>
          {content.map((page, index) => (
            <Box mb={4} key={index}>
              <FancyCard
                isSidebar={true}
                title={page.title}
                category={page.supertitle}
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

Sidebar.propTypes = {
  content: PropTypes.array
};

export default Sidebar;
