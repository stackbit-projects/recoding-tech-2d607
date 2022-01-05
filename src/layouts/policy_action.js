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
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedTopics from "../components/RelatedTopics";

const PolicyAction = (props) => {
  const { page } = props;

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={8}>
        <Container>
          <TrackerActions {...props} />
          <Grid container spacing={8}>
            <Grid container spacing={12} direction="column" item sm={12} md={8}>
              <Grid item sm={12} md={8}>
                <Typography component="div" className="html-to-react">
                  {htmlToReact(page.summary)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              direction="column"
              item
              sm={12}
              md={4}
              s
            >
              <Grid item>
                <RelatedCommentary
                  title={"Further reading"}
                  page={page}
                  commentary={page.relatedCitations}
                />
              </Grid>
              <Grid item>
                <RelatedTopics topics={page.relatedTopics} />
              </Grid>
              <Grid item>
                <RelatedDocuments {...props} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

PolicyAction.propTypes = {
  page: PropTypes.object,
};

export default PolicyAction;
