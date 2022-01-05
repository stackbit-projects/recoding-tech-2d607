// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";

//utils
import { htmlToReact } from "../utils";

function Guide(props) {
  const { page } = props;
  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={4}>
        <Container maxWidth="md">
          <Typography component="div" variant="body1" gutterBottom>
            {page.subtitle}
          </Typography>
          <Typography component="div" className="html-to-react">
            {htmlToReact(props.page.content)}
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}

Guide.propTypes = {
  page: PropTypes.object
};

export default Guide;
