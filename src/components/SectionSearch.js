// base imports
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// material ui icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const articlesQuery =
  '*[!(_id in path("drafts.**")) && _type == "post"]{_id, title, date, topics[]->{_key, _id, name, slug}, author[]->{name}, title, slug } | order(date desc)';

const topicsQuery =
  '*[!(_id in path("drafts.**")) && _type == "topic" && stackbit_model_type == "page"]{_id, name, displayTitle, slug, type}';

const useStyles = makeStyles((theme) => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  article: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  articleTitle: {
    color: "#000 !important",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  articlePublication: {
    marginTop: 25,
    marginBottom: 8,
  },
  grid: {},
  gridTitle: {
    marginBottom: 32,
    marginTop: 32,
  },
  link: {
    color: theme.typography.link.color,
  },
}));

const ROWS_PER_PAGE = 21;

const SectionSearch = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(articlesQuery).then((cites) => {
      if (Array.isArray(cites) && cites.length) {
        setAllArticles(cites);
      }
      setLoading(false);
    });

    client.fetch(topicsQuery).then((topics) => {
      let allTopics = [];
      topics.forEach((topic) => {
        allTopics = [...allTopics, topic];
      });
      allTopics = topics.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t._id === value._id || t.name === value.name)
      );
      setTopics(allTopics);
    });
  }, []);

  useEffect(() => {}, [topics]);

  useEffect(() => {
    let filterTopic;
    if (query.filter) {
      filterTopic = topics.filter((topic) => topic._id === query.filter);
      setFilters(filterTopic);
    }
  }, [query, topics]);

  useEffect(() => {
    if (allArticles.length) {
      let newArticles = allArticles;

      if (filters.length) {
        newArticles = newArticles.filter((article) => {
          let matches = 0;
          if (Array.isArray(article.topics) && article.topics.length) {
            article.topics.forEach((topic) => {
              if (filters.findIndex((f) => f._id === topic._id) >= 0)
                matches += 1;
            });
          }
          return matches >= filters.length;
        });
      }

      if (search) {
        newArticles = newArticles.filter((article) => {
          const regex = new RegExp(`${search}`, "i");
          for (const prop in article) {
            const value = article[prop];
            if (typeof value === "string" || value instanceof String) {
              if (value.search(regex) >= 0) return true;
            }
          }
          return false;
        });
      }
      setArticles(newArticles);
    }
    console.log(filters);
  }, [filters, search, allArticles]);

  // table pagination
  const [page, setPage] = useState(1);

  const handleClose = (topic) => {
    if (topic && filters.findIndex((f) => f._id === topic._id) < 0) {
      setFilters([...filters, topic]);
    }
  };

  const [topicEl, setTopicEl] = useState(null);
  const openTopics = Boolean(topicEl);
  const handleClickTopics = (event) => {
    setTopicEl(event.currentTarget);
  };
  const handleCloseTopics = (topic) => () => {
    setTopicEl(null);
    handleClose(topic);
  };

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleDelete = (topic) => () => {
    topic && setFilters(filters.filter((f) => f._id !== topic._id));
  };

  // const handleDelete = (topic) => {
  //   console.log("here....");
  //   if (query.filter && history) {
  //     history.pushState(null, "", location.href.split("?")[0]);
  //   }
  //   if (topic) {
  //     setFilters(filters.filter((f) => f.slug !== topic.slug));
  //   }
  // };

  // const getHandler = (item) => {
  //   const handler = () => Router.push({ pathname: item.url });
  //   return handler;
  // };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#E0EEFF",
          padding: 4,
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
        >
          Showing {articles.length} results for:
        </Typography>
        <TextField
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
          id="search-field"
          label="Enter search term"
          variant="standard"
        />
        <Grid
          container
          alignItems={"center"}
          spacing={4}
          sx={{ marginTop: 1 }}
        >
          <Grid item>
            <Typography
              component="h2"
              variant="h4"
              sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400, marginBottom: 0 }}
            >
              Filter by:
            </Typography>
          </Grid>
          <Grid item>
            <Box>
              <Button
                sx={{
                  border: "1px solid rgba(0,0,0,0.56)",
                  color: "rgba(0,0,0,0.6)",
                }}
                id="topics-button"
                aria-controls="topics-menu"
                aria-haspopup="true"
                aria-expanded={openTopics ? "true" : undefined}
                disableElevation
                onClick={handleClickTopics}
                endIcon={
                  openTopics ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                }
              >
                Topic
              </Button>
              <Menu
                id="topics-menu"
                MenuListProps={{
                  "aria-labelledby": "topics-button",
                }}
                anchorEl={topicEl}
                open={openTopics}
                onClose={handleCloseTopics()}
              >
                {topics && topics.length
                  ? topics.map((topic) => (
                      <MenuItem
                        key={topic._id}
                        onClick={handleCloseTopics(topic)}
                        disableRipple
                      >
                        {topic.displayTitle || topic.name}
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        className={classes.grid}
        spacing={4}
        alignItems="flex-start"
        direction="row-reverse"
        justifyContent="flex-end"
      >
        <Grid
          container
          item
          xs={12}
          md={4}
          direction="column"
          sx={{ marginTop: 4 }}
        >
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} flexWrap={"wrap"} useFlexGap>
              {filters.length
                ? filters.map((filter, index) => (
                    <Chip
                      className={classes.chip}
                      key={`${filter}-${index}`}
                      item
                      label={filter.name}
                      color={filter.type}
                      onDelete={handleDelete(filter)}
                    />
                  ))
                : null}
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          spacing={4}
          xs={12}
          md={8}
          sx={{ marginTop: 4 }}
        >
          <Grid container item xs={12} spacing={2}>
            {articles && articles.length
              ? articles
                  .slice(
                    (page - 1) * ROWS_PER_PAGE,
                    (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
                  )
                  .map((article) => (
                    <Grid key={article._id} item xs={12}>
                      <Link
                        variant="body1"
                        sx={{
                          color: "#000",
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                        href={`/${article.slug.current}`}
                      >
                        {article.title}
                      </Link>
                      <Typography variant="h4" color="rgba(0,0,0,0.6)">
                        {article.publicationTitle
                          ? article.publicationTitle
                          : article.websiteTitle}
                      </Typography>
                    </Grid>
                  ))
              : null}
          </Grid>
          {loading ? (
            <Grid item>
              <CircularProgress color="secondary" />
            </Grid>
          ) : articles && articles.length ? (
            <Grid item>
              <Pagination
                count={Math.ceil(articles.length / ROWS_PER_PAGE)}
                onChange={handleChangePage}
                sx={{ marginLeft: "-16px" }}
              />
            </Grid>
          ) : (
            <Grid item>
              <Typography component="div" variant="body1">
                No articles found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionSearch;
