import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import client from "../utils/sanityClient";

// material ui imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const authorsQuery = `*[_type == "author" && !(_id match "drafts")]{name, slug, email}|order(lastUpdate desc)`;

const Contributors = () => {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    client.fetch(authorsQuery).then((allAuthors) => {
      setAuthors(allAuthors);
      setLoading(false);
    });
  }, []);

  useEffect(() => {}, [authors]);

  return (
    <Box my={8}>
      <Container>
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress color="tertiary" />
          </Grid>
        ) : (
          <>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ borderBottom: loading ? "" : "1px solid #8AA29D" }}
            >
              <Grid item>
                <Typography component="h2" variant="h4">
                  Meet our contributors
                </Typography>
              </Grid>
              <Grid item>
                <Button>Search/Filter</Button>
              </Grid>
            </Grid>
            <Grid container my={6}>
              {authors.map((author) => (
                <Grid item key={author.slug}>
                  <Typography
                    component="div"
                    variant="h4"
                    sx={{ fontWeight: 400 }}
                  >
                    {author.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

Contributors.propTypes = {
  page: PropTypes.object,
};

export default Contributors;
