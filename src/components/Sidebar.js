import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import FancyCard from "./FancyCard";

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
