// base imports
import React from "react";

// Material UI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";

const Issue = props => {
  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Container>
        <Typography>Law &amp; Regulation Tracker</Typography>
      </Container>
    </Layout>
  );
};

export default Issue;
