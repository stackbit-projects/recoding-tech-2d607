import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

// utils
import { htmlToReact } from "../utils";
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

  const policyActionsQuery = `*[_type == "policy_action" && references("${page.__metadata.id}") && !(_id match "drafts")]{category, country, dateInitiated, img_alt, img_path, lastUpdate, slug, status, title, relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)`;
  const relatedPostsQuery = `*[_type == "post" && references("${page.__metadata.id}") && !(_id match "drafts")]{_id, slug, author[]->{name}, date, ref, title }|order(date desc)[0...21]`;

  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    client.fetch(policyActionsQuery).then((actions) => {
      setActions(actions);
      setLoading(false);
    });

    client
      .fetch(relatedPostsQuery)
      .then((posts) => {
        setHeadlines(posts);
        setLoading(false);
      })
      .catch("Error: " + console.error);
  }, []);

  useEffect(() => {}, [actions, headlines]);

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
                  {htmlToReact(page.description)}
                </Typography>
              </Grid>
              <Grid spacing={4} direction="column" item sm={12} md={4}>
                <Grid item sx={{ width: "100%" }}>
                  Insert subscribe box here
                </Grid>
              </Grid>
            </Grid>
          )}
          <Box marginTop={4}>
            <PageRecents page={page} readings={headlines} />
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
