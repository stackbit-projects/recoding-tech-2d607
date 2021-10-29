import React, { useEffect, useState } from 'react'
import _ from 'lodash'

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
    if (Array.isArray(page.relatedTopics) && page.relatedTopics.length ) {
      setTopics(page.relatedTopics.filter(topic => topic.type));
    }
  }, []);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={4}>
        <Container>
          <Box my={4}>
            <Grid container>
              <Grid item sm={12} md={8}>
                <FancyCard title="Key Takeaways" content={markdownify(_.get(props, 'page.key_takeaways', null))} />
                <Typography component="div" variant="body1">
                  {markdownify(_.get(props, 'page.content', null))}
                </Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <RelatedCommentary title="Further Readings" commentary={page.relatedCommentary} />
                <RelatedTopics topics={topics} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

Article.propTypes = {
  page: PropTypes.object
};

export default Article;
