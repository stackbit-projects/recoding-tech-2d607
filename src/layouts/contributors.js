import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import client from "../utils/sanityClient";

// material ui imports
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";

const authorsQuery = `*[_type == "author" && !(_id match "drafts")]{name, slug, email}|order(lastUpdate desc)`;

const Contributors = (props) => {
  const { page } = props;
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    page.slug
      ? client.fetch(authorsQuery).then((allAuthors) => {
          setAuthors(allAuthors);
          setLoading(false);
        })
      : null;
  }, []);

  useEffect(() => {}, [authors]);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={8}>
        <Container>
          <Grid container spacing={8}>
            {loading ? (
              <Grid container item justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              <p>test</p>
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Contributors.propTypes = {
    page: PropTypes.object,
};

export default Contributors;
