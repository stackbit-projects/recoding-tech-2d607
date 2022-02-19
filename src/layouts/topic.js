import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

// utils
import { markdownify } from "../utils";
import client from "../utils/sanityClient";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedGuide from "../components/RelatedGuide";
import RelatedReadings from "../components/RelatedReadings";
import RelatedTopics from "../components/RelatedTopics";
import RelatedActions from "../components/RelatedActions";
import SectionHero from "../components/SectionHero";

const useStyles = makeStyles(() => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
  },
  em: {
    fontStyle: "italic",
  },
  maxWidth: {
    maxWidth: "100% !important",
  },
}));

const Topic = (props) => {
  const classes = useStyles();
  const { page } = props;

  const policyActionsQuery = `*[_type == "policy_action" && references("${page.slug}") && !(_id match "drafts")]{category, country->{_key, displayTitle, name, slug}, dateInitiated, img_alt, img_path, lastUpdate, slug, status, title, relatedTopics[]->{_id, _key, name, slug, type}, type}`;
  const relatedCitationsQuery = `*[!(_id in path("drafts.**")) && _type == "citation" && references("${page.__metadata.id}")]{_id, citation, citationPublication, citationTitle, date, publicationTitle, ref, title, url, websiteTitle} | order(date desc)`;

  const [issues, setIssues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState(null);
  const [readings, setReadings] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    page.slug
      ? client.fetch(policyActionsQuery).then((actions) => {
          setActions(actions);
          setLoading(false);
        })
      : null;

    page.slug
      ? client.fetch(relatedCitationsQuery).then((citations) => {
          setHeadlines(citations);
          setLoading(false);
        })
      : null;

    if (Array.isArray(page.relatedTopics) && page.relatedTopics.length) {
      if (page.type === "issue" || page.type === "policy") {
        const [i, p] = page.relatedTopics.reduce(
          ([i, p], topic) => {
            if (topic.type === "issue") {
              i.push(topic);
            } else if (topic.type === "policy") {
              p.push(topic);
            }
            return [i, p];
          },
          [[], []]
        );
        setIssues(i);
        setPolicies(p);
      }
    }

    if (
      Array.isArray(page.relatedCommentary) &&
      page.relatedCommentary.length
    ) {
      const r = page.relatedCommentary.reduce((r, comment) => {
        if (comment._type === "article") {
          r.push(comment);
        }
        return r;
      }, []);
      setReadings(r);
      //setHeadlines(h);
    }
  }, []);

  useEffect(() => {}, [issues, headlines, policies, readings]);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={8}>
        <Container>
          <RelatedActions page={page} actions={actions} loading={loading} />
          <Grid container spacing={8}>
            <Grid container spacing={12} direction="column" item sm={12} md={8}>
              {page.fastFacts && (
                <Grid item>
                  <Card
                    variant="outlined"
                    className={`${classes.box} ${classes.featured}`}
                  >
                    <CardContent>
                      <Typography component="div" variant="h4">
                        Fast Facts
                      </Typography>
                      <Typography
                        component="div"
                        variant="body1"
                        className={classes.em}
                      >
                        {markdownify(page.fastFacts)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              <Grid item className={classes.maxWidth}>
                <Typography
                  component="div"
                  variant="body1"
                  className="html-to-react"
                >
                  {markdownify(page.topicDescription)}
                </Typography>
                {page.relatedCommentary && page.relatedCommentary.length ? (
                  <RelatedReadings
                    page={page}
                    readings={page.relatedCommentary}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid container spacing={4} direction="column" item sm={12} md={4}>
              <Grid item>
                <RelatedGuide {...props} />
              </Grid>
              <Grid item>
                <RelatedCommentary commentary={headlines} />
              </Grid>
              <Grid item>
                <RelatedTopics title="Related Issues" topics={issues} />
                <RelatedTopics title="Related Policies" topics={policies} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Topic.propTypes = {
  page: PropTypes.object,
};

export default Topic;
