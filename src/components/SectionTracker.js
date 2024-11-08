// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useRouter } from "next/router";

// utils
import client from "../utils/sanityClient";

// material ui imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// material ui icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

// components
import PolicyActionTable from "./PolicyActionTable";
import PolicyActionMobile from "./PolicyActionMobile";

// SANITY QUERIES
const policyActionsQuery = `*[_type == "policy_action" && !(_id in path("drafts.**")) ]{category, country, dateInitiated,
                            lastUpdate, _id,
                            slug, status, title,
                            relatedTopics[]->{_id, name, slug, displayName}, type}|order(lastUpdate desc)`;

function SectionTracker() {
  // const { query } = useRouter();
  // const { section } = props;
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const isMobile = useMediaQuery("(max-width:1064px)");

  // filters
  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);

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

  // open/close search/filter menu
  const handleSearchClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSearchClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-popover" : undefined;

  // clear the text search input
  const handleClearTextSearch = () => {
    setSearchValue("");
    setSearch("");
  };

  const searchQuery = `*[_type == "policy_action" && !(_id in path("drafts.**")) && (title match '${searchValue}*')]{category, country, dateInitiated,
                                lastUpdate, _id, slug, status, title, relatedTopics[]->{_id, name, slug, displayName}, type}|order(lastUpdate desc)`;

  useEffect(() => {
    let topicsList = [];
    let newGovts = [];
    let newTypes = [];

    console.log(searchValue);
    setLoading(true);

    client
      .fetch(searchValue ? searchQuery : policyActionsQuery)
      .then((allPolicies) => {
        if (Array.isArray(allPolicies)) {
          allPolicies.map((policy) => {
            if (policy.country) {
              newGovts.push(policy.country);
            }
            if (policy.type) {
              newTypes.push(policy.type);
            }
            if (policy.relatedTopics && policy.relatedTopics.length) {
              policy.relatedTopics.map((topic) => {
                topicsList.push(topic);
              });
              topicsList = topicsList.filter(
                (value, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t._id === value._id && t.name === value.name
                  )
              );
            }
          });

          newGovts = [...new Set(newGovts)];
          newTypes = [...new Set(newTypes)];

          const sortedTopics = topicsList.sort((a, b) => {
            if (a.displayName < b.displayName) {
              return -1;
            }
            if (a.displayName > b.displayName) {
              return 1;
            }
            return 0;
          });

          setTypes(newTypes.sort());
          setCountries(newGovts.sort());
          setTopics(sortedTopics);
          setActions(allPolicies);
          setAllActions(allPolicies);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchValue]);

  // useEffect(() => {}, [query]);

  useEffect(() => {
    if (allActions.length) {
      let newActions = allActions;
      if (filters.length) {
        newActions = newActions.filter((action) => {
          let matches = 0;
          filters.map((filter) => {
            if (!filter.id) {
              if (action.type == filter) {
                matches += 1;
              }
              if (action.country == filter) {
                matches += 1;
              }
            }
            if (
              Array.isArray(action.relatedTopics) &&
              action.relatedTopics.length
            ) {
              action.relatedTopics.forEach((topic) => {
                if (filters.findIndex((f) => f._id === topic._id) >= 0)
                  matches += 1;
              });
            }
          });
          return matches >= filters.length;
        });
      }
      setActions(newActions);
    }
  }, [filters, allActions]);

  // useEffect(() => {}, [actions, countries, types, topics]);

  return (
    <section>
      <Box my={4}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid #8AA29D",
            paddingBottom: 2,
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          }}
        >
          <Grid item>
            <Stack
              alignItems="end"
              justifyContent="flex-start"
              direction="row"
              spacing={6}
            >
              <Typography
                component="div"
                variant="h4"
                sx={{ marginBottom: "0 !important", alignSelf: "center" }}
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
                            sx={{ fontWeight: 400 }}
                          >
                            {topic.displayName || topic.name}
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
                      openCountries ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )
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
                                sx={{ fontWeight: 400 }}
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
                            sx={{ fontWeight: 400 }}
                          >
                            {type}
                          </MenuItem>
                        ))
                      : null}
                  </Menu>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid item>
            <Button
              aria-describedby={id}
              onClick={handleSearchClick}
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
                Search
              </Typography>
            </Button>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleSearchClose}
              placement={"bottom-end"}
              sx={{ background: "#FFF" }}
            >
              <Paper
                elevation={1}
                sx={{ marginLeft: 1, marginTop: 1, padding: 4 }}
              >
                <FormControl variant="outlined" sx={{ marginBottom: 4 }}>
                  <InputLabel
                    htmlFor="search-input"
                    sx={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    Search by name
                  </InputLabel>
                  <Input
                    id="search-input"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        setSearch(e.target.value);
                        setSearchValue(e.target.value);
                        handleSearchClose();
                      }
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="clear search term"
                          onClick={handleClearTextSearch}
                          onMouseDown={handleClearTextSearch}
                        >
                          <CancelIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Paper>
            </Popper>
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 4, mb: 4 }}>
          <CircularProgress color="tertiary" />
        </Grid>
      ) : (
        <>
          <Box my={4}>
            <Grid container spacing={2} justifyContent="flex-start">
              {filters.length
                ? filters.map((filter, idx) => (
                    <Grid key={`${filter._key + idx}`} item>
                      <Chip
                        label={filter.displayName || filter.name || filter}
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
        </>
      )}
    </section>
  );
}

SectionTracker.propTypes = {
  section: PropTypes.object,
};

export default SectionTracker;
