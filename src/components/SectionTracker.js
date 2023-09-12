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
const policyActionsQuery = `*[_type == "policy_action" && !(_id match "drafts")]{category, country, dateInitiated,
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
  const [types, setTypes] = useState([]);
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
    let newGovts = [];
    let newTypes = [];
    if (Array.isArray(actions) && actions.length) {
      actions.map((action) => {
        if (action.country) {
          newGovts.push(action.country);
        }
        if (action.type) {
          newTypes.push(action.type);
        }
      });
    }

    newGovts = [...new Set(newGovts)];
    newTypes = [...new Set(newTypes)];

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
    setTypes(newTypes);
    setCountries(newGovts);
    newFilters.sort();
    setFilters(newFilters);
  }, [topics, query]);

  useEffect(() => {}, [countries, types]);

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

  const [topicEl, setTopicEl] = useState(null);
  const openTopics = Boolean(topicEl);
  const handleClickTopics = (event) => {
    setTopicEl(event.currentTarget);
  };
  const handleCloseTopics = (topic) => () => {
    setTopicEl(null);
    handleClose(topic);
  };

  const [countriesEl, setCountriesEl] = useState(null);
  const openCountries = Boolean(countriesEl);
  const handleClickCountries = (event) => {
    setCountriesEl(event.currentTarget);
  };
  const handleCloseCountries = (topic) => () => {
    setCountriesEl(null);
    handleClose(topic);
  };

  const [typesEl, setTypesEl] = useState(null);
  const openTypes = Boolean(typesEl);
  const handleClickTypes = (event) => {
    setTypesEl(event.currentTarget);
  };
  const handleCloseTypes = (topic) => () => {
    setTypesEl(null);
    handleClose(topic);
  };

  return (
    <section>
      <Box my={4}>
        <Container
          sx={{
            borderBottom: "1px solid #8AA29D",
            paddingBottom: 2,
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          }}
        >
          <Stack
            alignItems="end"
            justifyContent="flex-start"
            direction="row"
            spacing={6}
          >
            <Typography
              component="div"
              variant="h4"
              sx={{ marginBottom: "0 !important" }}
            >
              Filter by:
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box>
                <Button
                  sx={{ border: "1px solid #DEDEDE" }}
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
                              key={country}
                              onClick={handleCloseCountries(country)}
                              disableRipple
                            >
                              {country}
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
                  id="types-button"
                  aria-controls="types-menu"
                  aria-haspopup="true"
                  aria-expanded={openTypes ? "true" : undefined}
                  disableElevation
                  onClick={handleClickTypes}
                  endIcon={
                    openTypes ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                >
                  Type
                </Button>
                <Menu
                  id="types-menu"
                  MenuListProps={{
                    "aria-labelledby": "types-button",
                  }}
                  anchorEl={typesEl}
                  open={openTypes}
                  onClose={handleCloseTypes()}
                >
                  {types && types.length
                    ? types.map((type) => (
                        <MenuItem
                          key={type}
                          onClick={handleCloseTypes(type)}
                          disableRipple
                        >
                          {type}
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
