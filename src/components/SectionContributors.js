import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import client from "../utils/sanityClient";
import Image from "next/image";
import { toPlainText } from "@portabletext/react";

// material ui imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import { urlFor } from "../utils";

const authorsQuery = `*[_type == "author" && !(_id match "drafts")]{name, slug, email, bio, socialMedia, photo}|order(lastUpdate desc)`;

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
            <Grid container my={6} spacing={4}>
              {authors.map((author) => (
                <Grid
                  container
                  item
                  key={author.slug.current}
                  spacing={2}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Grid item xs={3}>
                    {author.photo && (
                      <Image
                        src={urlFor(author.photo).width(40).url()}
                        height={80}
                        width={80}
                        alt=""
                        style={{ borderRadius: 50 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <Link
                      href={author.slug.current}
                      sx={{
                        textDecoration: "none",
                        "&:active, &:focus, &:hover": {
                          color: "#000",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{ color: "#000", fontWeight: 400 }}
                      >
                        {author.name}
                      </Typography>
                    </Link>
                    {author.bio && (
                      <Typography
                        color="rgba(0,0,0,0.48)"
                        component="div"
                        variant="body2"
                      >
                        {toPlainText(author.bio).substring(0, 200)}...
                      </Typography>
                    )}
                  </Grid>
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
