// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// utils
import client from "../utils/sanityClient";

// material ui imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// material ui icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

// components
import PolicyActionTable from "./PolicyActionTable";
import PolicyActionMobile from "./PolicyActionMobile";

// SANITY QUERIES
const policyActionsQuery = `*[_type == "policy_action" && !(_id match "drafts")]{category, country->{_key, displayTitle, name, slug}, dateInitiated,
                            lastUpdate, _id,
                            slug, status, title,
                            relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)`;

const topicsQuery =
  '*[_type == "topic" && stackbit_model_type == "page" && !(_id match "drafts.*")]{_id, _key, name, slug, type}';

function SectionTracker() {
  const { query } = useRouter();
  // const { section } = props;
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);

  const isMobile = useMediaQuery("(max-width:1064px)");

  // filters
  const [issues, setIssues] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    client.fetch(policyActionsQuery).then((allPolicies) => {
      if (Array.isArray(allPolicies) && allPolicies.length) {
        setActions(allPolicies);
        setAllActions(allPolicies);
      }
    });

    client.fetch(topicsQuery).then((topics) => {
      let allTopics = [];
      topics.forEach((topic) => {
        allTopics = [...allTopics, topic];
      });
      setTopics(allTopics);
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
        if (topic.type && topic.slug && topic.slug.current) {
          newTopics[topic.type] &&
            newTopics[topic.type].set(topic.slug.current, topic);
        }
      });
    }

    let newFilters = [];
    ["issue", "policy", "company", "country"].forEach((type) => {
      if (Array.isArray(query[type]) && query[type].length) {
        query[type].forEach((t) => {
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
    newFilters.sort();
    setFilters(newFilters);
  }, [topics, query]);

  useEffect(() => {
    if (allActions.length) {
      let newActions = allActions;
      if (filters.length) {
        newActions = newActions.filter((action) => {
          let matches = 0;
          if (
            Array.isArray(action.relatedTopics) &&
            action.relatedTopics.length
          ) {
            action.relatedTopics.forEach((topic) => {
              if (filters.findIndex((f) => f._id === topic._id) >= 0)
                matches += 1;
            });
          }
          return matches >= filters.length;
        });
      }
      setActions(newActions);
    }
  }, [filters, allActions]);

  const handleClose = (topic) => {
    if (topic && filters.findIndex((f) => f._id === topic._id) < 0) {
      setFilters([...filters, topic]);
    }
  };

  const handleDelete = (topic) => () => {
    topic && setFilters(filters.filter((f) => f._id !== topic._id));
  };

  const [issueEl, setIssueEl] = React.useState(null);
  const openIssues = Boolean(issueEl);
  const handleClickIssues = (event) => {
    setIssueEl(event.currentTarget);
  };
  const handleCloseIssues = (topic) => () => {
    setIssueEl(null);
    handleClose(topic);
  };

  const [policiesEl, setPoliciesEl] = React.useState(null);
  const openPolicies = Boolean(policiesEl);
  const handleClickPolicies = (event) => {
    setPoliciesEl(event.currentTarget);
  };
  const handleClosePolicies = (topic) => () => {
    setPoliciesEl(null);
    handleClose(topic);
  };

  const [countriesEl, setCountriesEl] = React.useState(null);
  const openCountries = Boolean(countriesEl);
  const handleClickCountries = (event) => {
    setCountriesEl(event.currentTarget);
  };
  const handleCloseCountries = (topic) => () => {
    setCountriesEl(null);
    handleClose(topic);
  };

  const [companiesEl, setCompaniesEl] = React.useState(null);
  const openCompanies = Boolean(companiesEl);
  const handleClickCompanies = (event) => {
    setCompaniesEl(event.currentTarget);
  };
  const handleCloseCompanies = (topic) => () => {
    setCompaniesEl(null);
    handleClose(topic);
  };

  return (
    <section>
      <Box my={4}>
        <Container>
          <Stack alignItems="baseline" direction="row" spacing={4}>
            <Typography component="div" variant="h4">
              Filter by:
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box>
                <Button
                  sx={{ border: "1px solid #DEDEDE" }}
                  id="issues-button"
                  aria-controls="issues-menu"
                  aria-haspopup="true"
                  aria-expanded={openIssues ? "true" : undefined}
                  disableElevation
                  onClick={handleClickIssues}
                  endIcon={
                    openIssues ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                >
                  Issue
                </Button>
                <Menu
                  id="issues-menu"
                  MenuListProps={{
                    "aria-labelledby": "issues-button",
                  }}
                  anchorEl={issueEl}
                  open={openIssues}
                  onClose={handleCloseIssues()}
                >
                  {issues && issues.length
                    ? issues.map((issue) => (
                        <MenuItem
                          key={issue._id}
                          onClick={handleCloseIssues(issue)}
                          disableRipple
                        >
                          {issue.displayTitle || issue.name}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Box>
              <Box>
                <Button
                  sx={{ border: "1px solid #DEDEDE" }}
                  id="policies-button"
                  aria-controls="policies-menu"
                  aria-haspopup="true"
                  aria-expanded={openPolicies ? "true" : undefined}
                  disableElevation
                  onClick={handleClickPolicies}
                  endIcon={
                    openPolicies ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                >
                  Policy
                </Button>
                <Menu
                  id="policies-menu"
                  MenuListProps={{
                    "aria-labelledby": "policies-button",
                  }}
                  anchorEl={policiesEl}
                  open={openPolicies}
                  onClose={handleClosePolicies()}
                >
                  {policies && policies.length
                    ? policies.map((policy) => (
                        <MenuItem
                          key={policy._id}
                          onClick={handleClosePolicies(policy)}
                          disableRipple
                        >
                          {policy.displayTitle || policy.name}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Box>
              <Box>
                <Button
                  sx={{ border: "1px solid #DEDEDE" }}
                  id="countries-button"
                  aria-controls="countries-menu"
                  aria-haspopup="true"
                  aria-expanded={openCountries ? "true" : undefined}
                  disableElevation
                  onClick={handleClickCountries}
                  endIcon={
                    openCountries ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                >
                  Government
                </Button>
                <Menu
                  id="countries-menu"
                  MenuListProps={{
                    "aria-labelledby": "countries-button",
                  }}
                  anchorEl={countriesEl}
                  open={openCountries}
                  onClose={handleCloseCountries()}
                >
                  {countries && countries.length
                    ? countries.map((country) => {
                        if (country) {
                          return (
                            <MenuItem
                              key={country._id}
                              onClick={handleCloseCountries(country)}
                              disableRipple
                            >
                              {country.displayTitle || country.name}
                            </MenuItem>
                          );
                        }
                      })
                    : null}
                </Menu>
              </Box>
              <Box>
                <Button
                  sx={{ border: "1px solid #DEDEDE" }}
                  id="companies-button"
                  aria-controls="companies-menu"
                  aria-haspopup="true"
                  aria-expanded={openCompanies ? "true" : undefined}
                  disableElevation
                  onClick={handleClickCompanies}
                  endIcon={
                    openCompanies ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                >
                  Company
                </Button>
                <Menu
                  id="companies-menu"
                  MenuListProps={{
                    "aria-labelledby": "companies-button",
                  }}
                  anchorEl={companiesEl}
                  open={openCompanies}
                  onClose={handleCloseCompanies()}
                >
                  {companies && companies.length
                    ? companies.map((company) => (
                        <MenuItem
                          key={company._key}
                          onClick={handleCloseCompanies(company)}
                          disableRipple
                        >
                          {company.displayTitle || company.name}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box my={4}>
        <Grid container spacing={2} justifyContent="flex-start">
          {filters.length
            ? filters.map((filter, idx) => (
                <Grid key={`${filter._key + idx}`} item>
                  <Chip
                    label={filter.displayTitle || filter.name}
                    color={filter.type}
                    onDelete={handleDelete(filter)}
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
      <Box my={4}>
        {isMobile ? (
          <PolicyActionMobile actions={actions} isHomepage={false} />
        ) : (
          <PolicyActionTable actions={actions} isHomepage={false} />
        )}
      </Box>
    </section>
  );
}

SectionTracker.propTypes = {
  section: PropTypes.object,
};

export default SectionTracker;
