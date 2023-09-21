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

  useEffect(() => { }, [authors]);

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
                <Button
                  sx={{
                    height: 24,
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "unset",
                    },
                  }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{
                      backgroundColor: "#FFE5EA",
                      borderRadius: "2px",
                      color: "#FF0033",
                      fontWeight: 500,
                      paddingX: "10px",
                      paddingY: "6px",
                      marginBottom: 0,
                      "&:active, & :focus, &:hover": {
                        color: "#FF0033",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    View more
                  </Typography>
                </Button>
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
                        src={urlFor(author.photo).width(80).url()}
                        height={80}
                        width={80}
                        alt=""
                        style={{ borderRadius: 50 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <Link
                      href={`/author/${author.slug.current}`}
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
                        marginTop={1}
                        variant="body2"
                        sx={{ lineHeight: 1.8 }}
                      >
                        {toPlainText(author.bio).substring(0, 300)}...
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
