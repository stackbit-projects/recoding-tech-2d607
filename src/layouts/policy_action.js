import React from "react";
import PropTypes from "prop-types";

// utils
import { htmlToReact } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import TrackerActions from "../components/TrackerActions";
import RelatedDocuments from "../components/RelatedDocuments";

const PolicyAction = props => {
  const { page } = props;

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={4}>
        <Container>
          <TrackerActions {...props} />
          <Box my={4}>
            <Grid container>
              <Grid item sm={12} md={8}>
                <Typography component="div" className="html-to-react">
                  {htmlToReact(page.summary)}
                </Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component="div" variant="h4">
                  Further reading
                </Typography>
                <RelatedDocuments {...props} />
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
