import React from "react";
import PropTypes from "prop-types";

// material ui imports
// import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";

const Contributor = (props) => {
  return (
    <Layout {...props}>
      <SectionHero {...props} />
    </Layout>
  );
};

Contributor.propTypes = {
  page: PropTypes.object,
};

export default Contributor;
