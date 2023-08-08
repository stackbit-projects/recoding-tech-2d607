import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

// utils
import { htmlToReact } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedTopics from "../components/RelatedTopics";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
}

function format(crumb) {
  return crumb.split("-").join(" ");
}

const Article = (props) => {
  const router = useRouter();
  const { page } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    if (Array.isArray(page.relatedTopics) && page.relatedTopics.length) {
      setTopics(page.relatedTopics.filter((topic) => topic.type));
    }
  }, []);

  useEffect(() => {
    if (router) {
      setBreadcrumbs(router.query.slug);
    }
  }, [router]);

  useEffect(() => {}, [breadcrumbs]);

  return (
    <Layout {...props}>
      <Box my={6}>
        <Container>
          <Box
            role="presentation"
            onClick={handleClick}
            sx={{ marginBottom: 6 }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Typography variant="body2" color="text.primary">
                home
              </Typography>
              {breadcrumbs.length
                ? breadcrumbs.map((crumb) => (
                    <Typography
                      key={crumb}
                      variant="body2"
                      color="text.primary"
                    >
                      {format(crumb)}
                    </Typography>
                  ))
                : null}
            </Breadcrumbs>
          </Box>
          <Grid container spacing={8}>
            <Grid container spacing={4} item xs={12} md={8} direction="row">
              <Grid item>
                {/* <Typography component="div" className="html-to-react">
                  {markdownify(_.get(props, "page.content", null))}
                </Typography> */}
                <Typography component="h1" variant="h2_article">
                  {page.title}
                </Typography>
                {page.key_takeaways && (
                  <Typography component="div" variant="body2">
                    {page.key_taekaways}
                  </Typography>
                )}
                {page.new_content && (
                  <Typography component="div" className="html-to-react-article">
                    {htmlToReact(page.new_content)}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <RelatedCommentary
                title="Further Reading"
                commentary={page.relatedCommentary}
                noFilter={true}
              />
              <RelatedTopics topics={topics} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Article.propTypes = {
  page: PropTypes.object,
};

export default Article;
