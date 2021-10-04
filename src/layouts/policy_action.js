import React from "react";
import PropTypes from "prop-types";

// utils
import { htmlToReact, withPrefix, markdownify } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import TrackerActions from "../components/TrackerActions";

const PolicyAction = props => {
  const { page } = props;
  console.log(page);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={4}>
        <Container>
          <TrackerActions {...props} />
          <Box my={4}>
            <Grid container>
              <Grid item sm={12} md={8}>
                {htmlToReact(page.summary)}
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component="div" variant="h4">
                  Further reading
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

PolicyAction.propTypes = {
  page: PropTypes.object
};

export default PolicyAction;
