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
          <Grid container spacing={8} sx={{ marginTop: 1 }}>
            <Grid container spacing={12} direction="column" item sm={12} md={8}>
              <Grid item sm={12} md={8}>
                <Typography
                  component="div"
                  variant="body2"
                  className="html-to-react"
                >
                  {htmlToReact(page.summary)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4} direction="column" item sm={12} md={4}>
              <Grid item sx={{ width: "100%" }}>
                <RelatedCommentary
                  title={"Further reading"}
                  page={page}
                  commentary={page.relatedCitations}
                  noFilter={true}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <RelatedTopics topics={page.relatedTopics} />
              </Grid>
              {page.relatedDocs ? (
                <Grid item sx={{ width: "100%" }}>
                  <RelatedDocuments {...props} />
                </Grid>
              ) : null}
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
