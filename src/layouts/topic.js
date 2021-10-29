import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import PropTypes from "prop-types";

// utils
import { markdownify } from "../utils";

// material ui imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedGuide from "../components/RelatedGuide";
import RelatedReadings from "../components/RelatedReadings";
import RelatedTopics from "../components/RelatedTopics";
import RelatedActions from "../components/RelatedActions";

const useStyles = makeStyles(theme => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic"
  },
}));

const Topic = props => {
  const classes = useStyles();
  const { page } = props;
  console.log(page);
  const [topics, setTopics] = useState(null);
  const [issues, setIssues] = useState(null);
  const [policies, setPolicies] = useState(null);
  const [readings, setReadings] = useState(null);
  const [headlines, setHeadlines] = useState(null);

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

    if (Array.isArray(page.relatedCommentary) && page.relatedCommentary.length ) {
      const [r, h] = page.relatedCommentary.reduce(([r, h], comment) => {
        console.log('comment:', comment.__metadata.modelName);
        if (comment.__metadata.modelName === 'citation') {
          console.log('citation!');
          h.push(comment);
        } else if (comment.__metadata.modelName === 'article') {
          console.log('article!');
          r.push(comment)
        }
        return [r, h];
      }, [[], []]);
      setReadings(r);
      setHeadlines(h);
      console.log('readings:', readings);
      console.log('headlines:', headlines);
    }
  }, []);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={4}>
        <Container>
          <Box my={4}>
            <RelatedActions {...props} />
            <Grid container>
              <Grid item sm={12} md={8}>
                {page.fast_facts && (
                  <Card
                    variant="outlined"
                    className={`${classes.box} ${classes.featured}`}
                  >
                      <CardContent>
                        <Typography component="div" variant="h2">
                        Fast Facts
                        </Typography>
                        <Typography
                          component="div"
                          variant="body1"
                          className={classes.em}
                        >
                          {markdownify(page.fast_facts)}
                        </Typography>
                      </CardContent>
                  </Card>
                )}
                <Typography component="div" variant="body1">
                  {markdownify(_.get(props, 'page.topicDescription', null))}
                </Typography>
                <RelatedReadings readings={readings} />
              </Grid>
              <Grid item sm={12} md={4}>
                <RelatedGuide {...props} />
                <RelatedCommentary commentary={headlines} />
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
