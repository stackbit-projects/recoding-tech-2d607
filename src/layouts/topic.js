import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

// utils
import { markdownify } from "../utils";
import client from "../utils/sanityClient";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import PageRecents from "../components/PageRecents";
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

  const policyActionsQuery = `*[_type == "policy_action" && references("${page.slug}") && !(_id match "drafts")]{category, country->{_key, displayTitle, name, slug}, dateInitiated, img_alt, img_path, lastUpdate, slug, status, title, relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)`;
  const relatedCitationsQuery = `*[!(_id in path("drafts.**")) && _type == "citation" && references("${page.__metadata.id}")]{_id, chicagoCitation, creators[]->{firstName, lastName}, date, publicationTitle, ref, title, url, websiteTitle, institution, place, publisher, blogTitle, network } | order(date desc)`;

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

  console.log(page);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={8}>
        <Container>
          {page.stackbit_model_type == "page" && (
            <Grid container spacing={8}>
              <Grid
                spacing={12}
                direction="column"
                item
                sm={12}
                md={8}
                className={classes.maxWidth}
              >
                <Typography
                  component="div"
                  variant="body2"
                  className="html-to-react"
                  sx={{ fontSize: 14, lineHeight: 2 }}
                >
                  {markdownify(page.topicDescription)}
                </Typography>
              </Grid>
              <Grid
                container
                spacing={4}
                direction="column"
                item
                sm={12}
                md={4}
              >
                <Grid item sx={{ width: "100%" }}>
                  Insert subscribe box here
                </Grid>
              </Grid>
            </Grid>
          )}
          <Box marginTop={4}>
            <PageRecents page={page} readings={page.relatedCommentary} />
            <RelatedActions page={page} actions={actions} loading={loading} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

Topic.propTypes = {
  page: PropTypes.object,
};

export default Topic;
