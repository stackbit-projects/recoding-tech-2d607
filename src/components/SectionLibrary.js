// base imports
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const citationsQuery =
  '*[!(_id in path("drafts.**")) && _type == "citation"]{_id, title, date, topics[]->{_key, _id, name, slug}, creators[]->{firstName, lastName}, title, url, websiteTitle, publicationTitle, publisher, institution, place, network, blogTitle } | order(date desc)';

const topicsQuery =
  '*[!(_id in path("drafts.**")) && _type == "tag"]{_id, name, displayName, slug, _type}';

const useStyles = makeStyles((theme) => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  citation: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  citationTitle: {
    color: "#000 !important",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  citationPublication: {
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
  const [citations, setCitations] = useState([]);
  const [allCitations, setAllCitations] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(citationsQuery).then((cites) => {
      if (Array.isArray(cites) && cites.length) {
        setAllCitations(cites);
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
    if (allCitations.length) {
      let newCitations = allCitations;

      if (filters.length) {
        newCitations = newCitations.filter((citation) => {
          let matches = 0;
          if (Array.isArray(citation.topics) && citation.topics.length) {
            citation.topics.forEach((topic) => {
              if (filters.findIndex((f) => f._id === topic._id) >= 0)
                matches += 1;
            });
          }
          return matches >= filters.length;
        });
      }

      if (search) {
        newCitations = newCitations.filter((citation) => {
          let matches = 0;
          if (Array.isArray(citation.topics) && citation.topics.length) {
            citation.topics.forEach((topic) => {
              if (search.findIndex((f) => f._id === topic._id) >= 0)
                matches += 1;
            });
          }
          return matches >= search.length;
        });
      }
      setCitations(newCitations);
    }
  }, [filters, search, allCitations]);

  // table pagination
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (topic) => () => {
    if (query.filter && history) {
      history.pushState(null, "", location.href.split("?")[0]);
    }
    if (topic) {
      setFilters(filters.filter((f) => f.slug !== topic.slug));
    }
  };

  return (
    <Box marginBottom={8}>
      <Box
        sx={{
          borderBottom: "1px solid #8AA29D",
          marginBottom: 8,
          paddingBottom: 4,
        }}
      >
        <Typography component="h2" variant="h4" marginBottom={4}>
          Explore Our Library of Research, Policy Papers, Investigative
          Journalism, & Op-Eds
        </Typography>
        <Autocomplete
          multiple
          color="secondary.main"
          id="topics-search"
          options={topics}
          getOptionLabel={(option) => (option.name ? option.name : option._id)}
          sx={{ width: 400 }}
          value={search}
          onChange={(event, newValue) => {
            event.preventDefault();
            setSearch(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type search term"
              sx={{ "& label": { fontFamily: "'Lexend', sans-serif" } }}
            />
          )}
        />
      </Box>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} flexWrap={"wrap"} useFlexGap>
          {filters.length
            ? filters.map((filter) => (
                <Chip
                  className={classes.chip}
                  key={filter._id}
                  item
                  label={filter.displayName || filter.name}
                  color={filter.type}
                  onDelete={handleDelete(filter)}
                />
              ))
            : null}
        </Stack>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        {citations && citations.length
          ? citations
              .slice(
                (page - 1) * ROWS_PER_PAGE,
                (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
              )
              .map((citation) => (
                <Grid key={citation._id} item xs={12} sm={4}>
                  <Link
                    variant="body1"
                    sx={{
                      color: "#000",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                    target="_blank"
                    rel="noreferrer"
                    href={citation.url}
                  >
                    {citation.title}
                  </Link>
                  <Typography variant="h4" color="rgba(0,0,0,0.6)">
                    {citation.publicationTitle
                      ? citation.publicationTitle
                      : citation.websiteTitle
                      ? citation.websiteTitle
                      : citation.institution
                      ? citation.institution
                      : citation.blogTitle
                      ? citation.blogTitle
                      : citation.publisher
                      ? citation.publisher
                      : citation.place
                      ? citation.place
                      : citation.network}
                  </Typography>
                </Grid>
              ))
          : null}
      </Grid>
      {loading ? (
        <Grid item>
          <CircularProgress color="secondary" />
        </Grid>
      ) : citations && citations.length ? (
        <Grid item>
          <Pagination
            count={Math.ceil(citations.length / ROWS_PER_PAGE)}
            onChange={handleChangePage}
            sx={{ marginLeft: "-16px" }}
          />
        </Grid>
      ) : (
        <Grid item>
          <Typography component="div" variant="body1">
            No citations found.
          </Typography>
        </Grid>
      )}
    </Box>
  );
};

export default SectionSearch;
