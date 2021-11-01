// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";
import Router, { useRouter } from "next/router";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import FancyCard from './FancyCard';
import SearchBar from './SearchBar';

const useStyles = makeStyles(theme => ({
  citation: {
    marginBottom: 20,
    paddingBottom: 20
  },
  citationTitle: {
    color: "#000 !important",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  citationPublication: {
    marginTop: 10
  },
  grid: {},
  gridTitle: {
    marginBottom: 32,
    marginTop: 32
  },
  link: {
    color: theme.typography.link.color
  }
}));

const ROWS_PER_PAGE = 4;

const SectionCitations = props => {
  const classes = useStyles();
  const { query } = useRouter();
  const { topics } = props;
  const [citations, setCitations] = useState(null);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState(null);

  // filters
  const [issues, setIssues] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const newTopics = {
      issue: new Map(),
      policy: new Map(),
      company: new Map(),
      country: new Map(),
    };
    if (Array.isArray(topics) && topics.length) {
      topics.map(topic => {
        if (topic.type && topic.slug) {
          newTopics[topic.type] && newTopics[topic.type].set(topic.slug, topic);
        }
      });
    }

    let newFilters = [];
    ['issue', 'policy', 'company', 'country'].forEach(type => {
      if (Array.isArray(query[type]) && query[type].length) {
        query[type].forEach(t => {
          const exists = newTopics[type].get(t);
          if (exists) {
            newFilters.push(exists);
          }
        });
      } else {
        const exists = newTopics[type].get(query[type]);
        if (exists) {
          newFilters.push(exists);
        }
      }
    });
    setIssues(Array.from(newTopics.issue.values()));
    setPolicies(Array.from(newTopics.policy.values()));
    setCompanies(Array.from(newTopics.company.values()));
    setCountries(Array.from(newTopics.country.values()));
    newFilters.sort()
    setFilters(newFilters);
  }, [query]);

  useEffect(() => {
    if (props.citations) {
      let newCitations = props.citations;
      if (filters) {
        newCitations = newCitations.filter(citation => {
          let matches = 0;
          if (Array.isArray(citation.relatedTopics) && citation.relatedTopics.length) {
            citation.relatedTopics.forEach(topic => {
              if (filters.findIndex(f => f.slug === topic.slug) >= 0) matches += 1;
            });
          }
          return matches >= filters.length;
        });
        newCitations.sort((a, b) => {
          if (a.date && b.date) {
            return Date.parse(b.date) - Date.parse(a.date);
          } else {
            return false;
          }
        });
      }
      if (search) {
        newCitations = newCitations.filter(citation => {
          const regex = new RegExp(`/${search}/`, 'i');
          for (const prop in citation) {
            if (typeof prop === 'string' || prop instanceof String) {
              if (prop.search(regex) > 0) return true;
            }
          }
          return false;
        });
      }
      setCitations(newCitations);
    }
  }, [filters, search]);

  // table pagination
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = topic => () => {
    if (topic && filters.findIndex(f => f.slug === topic.slug) < 0) {
      setFilters([...filters, topic]);
    }
  }

  const handleDelete = topic => () => {
    if (topic) {
      setFilters(filters.filter(f => f.slug !== topic.slug));
    }
  }

  const getHandler = item => {
    const handler = () => Router.push({ pathname: item.url });
    return handler;
  };


  return (
    <Grid container className={classes.grid}>
      <Grid
        container
        item
        justifyContent="space-between"
        className={classes.gridTitle}
        sm={12}
        md={8}
      >
        <Grid item>
          <SearchBar handleSearch={value => setSearch(value)} />
        </Grid>
        <Box my={4}>
          <Grid container spacing={2} justifyContent="flex-start">
            { filters.length ? filters.map(filter => (
                <Grid key={filter.__metadata.id} item>
                  <Chip label={filter.displayTitle || filter.name} color={filter.type} onDelete={handleDelete(filter)}/>
                </Grid>
            )) : null}
          </Grid>
        </Box>
        <Grid container flexDirection="column">
          {citations && citations.length
            ? citations.slice((page - 1) * ROWS_PER_PAGE, (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE).map(citation => (
            <Grid
              key={citation.__metadata.id}
              container
              item
              justifyContent="space-between"
            >
              <Grid
                item
                key={citation.__metadata.id}
                className={classes.citation}
              >
                <FancyCard
                  key={citation.__metadata.id}
                  title={citation.title}
                  publication={citation.publicationTitle
                        ? citation.publicationTitle
                        : citation.websiteTitle}
                  date={moment(citation.date).strftime("%B %e, %Y")}
                  onClick={getHandler(citation)}
                />
              </Grid>
              <Grid
                item
                key={citation.__metadata.id}
                className={classes.citation}
              >
                <KeyboardArrowRightIcon />
              </Grid>
            </Grid>
            ))
            : null}
        </Grid>
        {citations && citations.length && (
          <Box my={4}>
            <Stack spacing={2}>
              <Pagination count={Math.ceil(citations.length / ROWS_PER_PAGE)} onChange={handleChangePage} />
            </Stack>
          </Box>
        )}
      </Grid>
      <Grid container item xs={2} flexDirection="column">
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Typography component="h2" variant="h2">
            Filters
          </Typography>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              Issues
            </Typography>
          </Grid>
          <Box my={4} pt={8}>
            <Container spacing={3}>
              {issues.map((topic, i) => (
                    <Chip
                      key={i}
                      label={topic.name}
                      color={topic.type}
                      clickable
                      onClick={handleClick(topic)}
                    />
                  ))}
            </Container>
          </Box>
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
          <Box my={4} pt={8}>
            <Container spacing={3}>
              {policies.map((topic, i) => (
                    <Chip
                      key={i}
                      label={topic.name}
                      color={topic.type}
                      clickable
                      onClick={handleClick(topic)}
                    />
                  ))}
            </Container>
          </Box>
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
          <Box my={4} pt={8}>
            <Container spacing={3}>
              {companies.map((topic, i) => (
                    <Chip
                      key={i}
                      label={topic.name}
                      color={topic.type}
                      clickable
                      onClick={handleClick(topic)}
                    />
                  ))}
            </Container>
          </Box>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              Countries
            </Typography>
          </Grid>
          <Box my={4} pt={8}>
            <Container spacing={3}>
              {countries.map((topic, i) => (
                    <Chip
                      key={i}
                      label={topic.name}
                      color={topic.type}
                      clickable
                      onClick={handleClick(topic)}
                    />
                  ))}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

SectionCitations.propTypes = {
  citations: PropTypes.array,
  topics: PropTypes.array
};

export default SectionCitations;
