// base imports
import React, { useEffect, useState } from "react";
import moment from "moment-strftime";
import Router, { useRouter } from "next/router";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// components
import FancyCard from "./FancyCard";
import SearchBar from "./SearchBar";

const citationsQuery =
  '*[!(_id in path("drafts.**")) && _type == "citation"]{_id, title, date, topics[]->{_key, _id, name, slug}, creators[]->{firstName, lastName}, title, url, websiteTitle, publicationTitle, publisher, institution, place, network, blogTitle } | order(date desc)';

const topicsQuery =
  '*[!(_id in path("drafts.**")) && _type == "topic"]{_id, name, displayTitle, slug, type}';

const useStyles = makeStyles((theme) => ({
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
    marginTop: 10,
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

const ROWS_PER_PAGE = 4;

const SectionSearch = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const [citations, setCitations] = useState([]);
  const [allCitations, setAllCitations] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);

  // filters
  const [issues, setIssues] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);

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
      setTopics(topics);
    });
  }, []);

  useEffect(() => {
    const newTopics = {
      issue: new Map(),
      policy: new Map(),
      company: new Map(),
      country: new Map(),
    };
    if (Array.isArray(topics) && topics.length) {
      topics.map((topic) => {
        if (topic.type && topic.slug) {
          newTopics[topic.type] && newTopics[topic.type].set(topic.slug, topic);
        }
      });
    }

    let newFilters = [];
    // ["issue", "policy", "company", "country"].forEach((type) => {
    //   if (query[type]) {
    //     query[type].forEach((t) => {
    //       const exists = newTopics[type].get(t);
    //       if (exists) {
    //         newFilters.push(exists);
    //       }
    //     });
    //   } else {
    //     const exists = newTopics[type].get(query[type]);
    //     if (exists) {
    //       newFilters.push(exists);
    //     }
    //   }
    // });

    setIssues(Array.from(newTopics.issue.values()));
    setPolicies(Array.from(newTopics.policy.values()));
    setCompanies(Array.from(newTopics.company.values()));
    setCountries(Array.from(newTopics.country.values()));
    newFilters.sort();
    setFilters(newFilters);
  }, [topics]);

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
          const regex = new RegExp(`${search}`, "i");
          for (const prop in citation) {
            const value = citation[prop];
            if (typeof value === "string" || value instanceof String) {
              if (value.search(regex) >= 0) return true;
            }
          }
          return false;
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

  const handleClick = (topic) => () => {
    if (topic && filters.findIndex((f) => f.slug === topic.slug) < 0) {
      setFilters([...filters, topic]);
    }
  };

  const handleDelete = (topic) => () => {
    if (query.filter && history) {
      history.pushState(null, "", location.href.split("?")[0]);
    }
    if (topic) {
      setFilters(filters.filter((f) => f.slug !== topic.slug));
    }
  };

  const getHandler = (item) => {
    const handler = () => Router.push({ pathname: item.url });
    return handler;
  };

  return (
    <Grid
      container
      className={classes.grid}
      spacing={4}
      alignItems="flex-start"
      direction="row-reverse"
      justifyContent="flex-end"
    >
      <Grid container item xs={12} md={4} direction="column">
        <Grid item className={classes.gridTitle}>
          <Typography component="h2" variant="h2" sx={{ marginTop: 4 }}>
            Filter...
          </Typography>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={12}>
            <Typography component="h2" variant="h4">
              Issues
            </Typography>
          </Grid>
          <Grid item>
            <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
              {issues.map((topic, i) => (
                <Chip
                  key={i}
                  label={topic.displayTitle || topic.name}
                  color={topic.type}
                  clickable
                  onClick={handleClick(topic)}
                  sx={{ marginBottom: "6px !important" }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              Policies
            </Typography>
          </Grid>
          <Grid item>
            <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
              {policies.map((topic, i) => (
                <Chip
                  key={i}
                  label={topic.displayTitle || topic.name}
                  color={topic.type}
                  clickable
                  onClick={handleClick(topic)}
                  sx={{ marginBottom: "6px !important" }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              Companies
            </Typography>
          </Grid>
          <Grid item>
            <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
              {companies.map((topic, i) => (
                <Chip
                  key={i}
                  label={topic.displayTitle || topic.name}
                  color={topic.type}
                  clickable
                  onClick={handleClick(topic)}
                  sx={{ marginBottom: "6px !important" }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              Governments
            </Typography>
          </Grid>
          <Grid item>
            <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
              {countries.map((topic, i) => (
                <Chip
                  key={`chip-${i}`}
                  label={topic.displayTitle || topic.name}
                  color={topic.type}
                  clickable
                  onClick={handleClick(topic)}
                  sx={{ marginBottom: "6px !important" }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        justifyContent="space-between"
        className={classes.gridTitle}
        spacing={4}
        xs={12}
        md={8}
      >
        <Grid item xs={12}>
          <SearchBar handleSearch={(value) => setSearch(value)} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            {filters.length
              ? filters.map((filter) => (
                  <Chip
                    key={filter._id}
                    item
                    label={filter.displayTitle || filter.name}
                    color={filter.type}
                    onDelete={handleDelete(filter)}
                  />
                ))
              : null}
          </Stack>
        </Grid>
        <Grid container flexDirection="column" item xs={12}>
          {citations && citations.length
            ? citations
                .slice(
                  (page - 1) * ROWS_PER_PAGE,
                  (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
                )
                .map((citation, idx) => (
                  <Grid
                    key={citation._id}
                    container
                    item
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={10}
                      key={citation._id}
                      className={classes.citation}
                    >
                      <FancyCard
                        key={`${citation._id + idx}`}
                        title={citation.title}
                        citation={citation}
                        publication={
                          citation.publicationTitle
                            ? citation.publicationTitle
                            : citation.websiteTitle
                        }
                        date={moment(citation.date).strftime("%B %e, %Y")}
                        onClick={getHandler(citation)}
                      />
                    </Grid>
                    <Grid
                      item
                      key={citation._id}
                      className={classes.citation}
                      xs={2}
                    >
                      <KeyboardArrowRightIcon />
                    </Grid>
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
      </Grid>
    </Grid>
  );
};

export default SectionSearch;
