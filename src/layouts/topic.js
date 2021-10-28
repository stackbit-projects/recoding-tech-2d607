import React, { useEffect, useState } from 'react';
import _ from 'lodash';

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
import SectionHero from "../components/SectionHero";
import RelatedReadings from "../components/RelatedReadings";
import RelatedTopics from "../components/RelatedTopics";

const Topic = props => {
  const { page } = props;
  console.log(page);
  const [topics, setTopics] = useState(null);
  const [issues, setIssues] = useState(null);
  const [policies, setPolicies] = useState(null);

  useEffect(() => {
    if (Array.isArray(page.relatedTopics) && page.relatedTopics.length ) {
      if (page.type === 'issue' || page.type === 'policy') {
        const [i, p] = page.relatedTopics.reduce(([i, p], topic) => {
          if (topic.type === 'issue') {
            i.push(topic);
          } else if (topic.type === 'policy') {
            p.push(topic)
          }
          return [i, p];
        }, [[], []]);
        setIssues(i);
        setPolicies(p);
      } else {
        setTopics(page.relatedTopics.filter(topic => topic.type));
      }
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
                <Typography component="div" variant="body1">
                  {markdownify(_.get(props, 'page.content', null))}
                </Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <RelatedReadings {...props} />
                { page.type === 'issue' || page.type ==='policy' ? (
                  <>
                    <RelatedTopics title="Related Issues" topics={issues} />
                    <RelatedTopics title="Related Policies" topics={policies} />
                  </>
                ) : (
                  <RelatedTopics topics={topics} />
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

Topic.propTypes = {
  page: PropTypes.object
};

export default Topic;
