import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// material ui imports
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import { CustomPortableText } from "../components/PortableText";

// utils
import imageBuilder from "../utils/imageBuilder";
import client from "../utils/sanityClient";

const Author = (props) => {
  const { page } = props;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);

  const postsQuery = `*[_type == "post" && references("${page._id}") && !(_id match "drafts")]{_id, slug, date, ref, title, relatedTopics[]->{_id, displayName, stackbit_model_type} }|order(date desc)`;

  useEffect(() => {
    client.fetch(postsQuery).then((actions) => {
      let newTopics = [];
      actions.map((action) => {
        newTopics = [action.relatedTopics, ...newTopics];
      });
      newTopics = newTopics.flat();
      newTopics = newTopics.filter(
        (topic) => topic.stackbit_model_type == "page"
      );
      newTopics = newTopics.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );

      setPosts(actions);
      setTopics(newTopics);
      setLoading(false);
    });
  }, []);

  useEffect(() => {}, [posts, topics]);
  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Container maxWidth="md" sx={{ marginBottom: 4 }}>
        <Box
          marginBottom={4}
          paddingBottom={4}
          sx={{ borderBottom: "1px solid #8AA29D" }}
        >
          <Grid container>
            <Grid item xs={3}>
              {page.photo && (
                <Image
                  src={imageBuilder(page.photo).width(144).url()}
                  height={144}
                  width={144}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              )}
            </Grid>
            <Grid item xs={9}>
              {page.bio && (
                <Typography component="div" variant="body2">
                  <CustomPortableText value={page.bio} />
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        {loading ? (
          <Grid container item justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Box>
            <Stack
              direction="row"
              justifyContent={"center"}
              spacing={1}
              useFlexGap
              flexWrap="wrap"
            >
              {topics.length &&
                topics.map((topic) => (
                  <Chip
                    color="footer"
                    key={topic._id}
                    label={topic.displayName}
                    sx={{
                      fontWeight: 400,
                      textTransform: "none",
                    }}
                  />
                ))}
            </Stack>
            <Grid
              container
              columnGap={6}
              direction="row"
              alignItems={"center"}
              marginBottom={10}
              marginTop={8}
            >
              {posts.length &&
                posts.map((post) => (
                  <Grid
                    item
                    key={post._id}
                    sx={{
                      marginTop: 2,
                    }}
                    xs={12}
                    sm={5.5}
                  >
                    <Link
                      href={`/${post.slug.current}`}
                      sx={{
                        borderBottom: "1px solid",
                        borderBottomColor: "#EFE9DA",
                        display: "block",
                        paddingBottom: 2,
                        textDecoration: "none !important",
                      }}
                    >
                      <Typography
                        component="div"
                        variant="body1"
                        sx={{
                          color: "#000 !important",
                          fontSize: "1em",
                          fontWeight: "700",
                          "&:hover": {
                            color: "#225C9D !important",
                            textDecoration: "none",
                          },
                        }}
                      >
                        {post.title}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

Author.propTypes = {
  page: PropTypes.object,
};

export default Author;
