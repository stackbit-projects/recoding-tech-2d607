import React, { useEffect, useState } from "react";
import _ from "lodash";

import PropTypes from "prop-types";

// utils
import { markdownify } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import FancyCard from "../components/FancyCard";
import SectionHero from "../components/SectionHero";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedTopics from "../components/RelatedTopics";

const Article = props => {
  const { page } = props;
  const [topics, setTopics] = useState(null);
  console.log(page);

  useEffect(() => {
    if (Array.isArray(page.relatedTopics) && page.relatedTopics.length) {
      setTopics(page.relatedTopics.filter(topic => topic.type));
    }
  }, []);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={6}>
        <Container>
          <Grid container spacing={8}>
            <Grid container spacing={12} item xs={12} md={8} direction="column">
              <Grid item>
                <FancyCard
                  notClickable
                  category="Key Takeaways"
                  content={markdownify(
                    _.get(props, "page.key_takeaways", null)
                  )}
                />
              </Grid>
              <Grid item>
                <Typography component="div" variant="body1">
                  {markdownify(_.get(props, "page.content", null))}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <RelatedCommentary
                title="Further Readings"
                commentary={page.relatedCommentary}
              />
              <RelatedTopics topics={topics} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Article.propTypes = {
  page: PropTypes.object
};

export default Article;
