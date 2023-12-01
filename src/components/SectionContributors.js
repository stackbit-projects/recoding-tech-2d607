import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Image from "next/image";
import { toPlainText } from "@portabletext/react";

// material ui imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// MUI icons
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

// utils
import { urlFor } from "../utils";
import client from "../utils/sanityClient";

const authorsQuery = `*[_type == "author" && !(_id in path("drafts.**"))] {_id, name, firstName, lastName, slug, email, bio, socials, _updatedAt, photo, "relatedPostTopics": *[_type=='post' && references(^._id)]{ _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }} | order(lastName asc)[0..24]`;
const authorsCountQuery = `count(*[_type == "author" && !(_id in path("drafts.**"))])`;
const nextAuthorsQuery = (lastAuthor) => {
  return `*[_type == "author" && !(_id in path("drafts.**")) && lastName > '${lastAuthor.lastName}']{_id, name, firstName, lastName, slug, email, bio, socials, _updatedAt, photo, "relatedPostTopics": *[_type=='post' && references(^._id)]{ _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }} | order(lastName asc)[0..24]`;
};

const Contributors = () => {
  const { query } = useRouter();
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [topics, setTopics] = useState([]);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [filters, setFilters] = useState({});

  // open/close search/filter menu
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-popover" : undefined;

  // clear the text search input
  const handleClearTextSearch = () => {
    setSearchValue("");
    setSearch("");
    setFilteredAuthors(filteredAuthors);
  };

  // handle whether a filter is checked
  // const handleFilterChange = (id) => {
  //   setFilters({ ...filters, [id]: filters[id] == true ? false : true });
  // };

  /* eslint-disable no-unused-vars */

  // clear all checkbox filters
  const handleClearFilters = () => {
    let clearedFilters = Object.values(filters).map((value) => (value = false));
    setFilters(clearedFilters);
  };
  /* eslint-enable no-unused-vars */

  // const handleCloseTopic = (topic) => {
  //   if (topic && filters.findIndex((f) => f._id === topic._id) < 0) {
  //     setFilters([...filters, topic]);
  //   }
  // };

  const handleDelete = (topic) => () => {
    setFilters({ ...filters, [topic]: filters[topic] == true ? false : true });
  };

  const fetchNextResults = async () => {
    const lastAuthor = authors[authors.length - 1];
    const oldAuthors = authors;
    const newAuthors = await client.fetch(nextAuthorsQuery(lastAuthor));
    setAuthors([...oldAuthors, ...newAuthors]);
  };

  const searchQuery = `*[_type == "author" && !(_id in path("drafts.**")) && (name match '${searchValue}*'|| firstName match '${searchValue}*' || lastName match '${searchValue}*') ] 
    {_id, name, firstName, lastName, slug, email, bio, socials, _updatedAt, photo, 
      "relatedPostTopics": *[_type=='post' && references(^._id)]
      { _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }} `;

  /**
   * four use cases:
   * - filter, no search
   * - search, no filter DONE
   * - search, then filter DONE
   */
  // const fetchSearch = async () => {
  //   const query = `*[_type == "author" && !(_id in path("drafts.**")) && (name match '${searchValue}*'|| firstName match '${searchValue}' || lastName match '${searchValue}') ]
  //   {_id, name, firstName, lastName, slug, email, bio, socials, _updatedAt, photo,
  //     "relatedPostTopics": *[_type=='post' && references(^._id)]
  //     { _id, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type} }} `;

  //   const results = await client.fetch(query);
  //   // setFilteredAuthors(results);
  //   // setLoading(false);
  //   return results
  // };

  useEffect(() => {
    let sorted;
    client.fetch(authorsQuery).then((data) => {
      sorted = data.sort((a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });
      setAuthors(sorted);
      setLoading(false);
    });

    client.fetch(authorsCountQuery).then((data) => {
      setTotalAuthors(data);
    });
  }, []);

  useEffect(() => {
    let authorsList = [];
    let topicsList = [];
    let filtersList = {};

    authorsList = authors.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t._id === value._id && t.name === value.name)
    );

    authorsList.map((author) => {
      let authorTopics = author.relatedPostTopics.reduce(
        (prev, next) => prev.concat(next.relatedTopics),
        []
      );
      author.relatedTopics = authorTopics;
      topicsList.push(authorTopics);
    });

    topicsList = topicsList
      .flat()
      .filter(
        (value, index, self) =>
          value &&
          value.stackbit_model_type == "page" &&
          index === self.findIndex((t) => t && t._id === value._id)
      );

    topicsList.map((topic) => (filtersList[topic.displayName] = false));

    const sortedTopics = topicsList.sort((a, b) => {
      if (a.displayName < b.displayName) {
        return -1;
      }
      if (a.displayName > b.displayName) {
        return 1;
      }
      return 0;
    });

    setFilteredAuthors(authorsList);
    setTopics(sortedTopics);
    setFilters(filtersList);
    setLoading(false);
  }, [authors]);

  useEffect(() => {
    if (searchValue.length != 0 || search.length != 0) {
      client.fetch(searchQuery).then((results) => {
        // setAuthors(results)
        setFilteredAuthors(results);
        setLoading(false);
      });
    } else {
      setFilteredAuthors(authors);
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    let searchFilter = authors;
    // let results;
    // if (searchValue.length != 0 || search.length != 0) {
    //   client.fetch(searchQuery).then(results => {
    //     setFilteredAuthors(results)
    //     setLoading(false)
    //   });
    //  }

    // console.log("results!", results)

    // if (search) {
    //   searchFilter = filteredAuthors.filter((author) => {
    //     const regex = new RegExp(`${search}`, "i");
    //     for (const prop in author) {
    //       const value = author[prop];
    //       if (typeof value === "string" || value instanceof String) {
    //         if (value.search(regex) >= 0) return true;
    //       }
    //     }
    //     return false;
    //   });
    // }

    if (Object.keys(filters).length) {
      let filtersList = Object.values(filters);
      filtersList = filtersList.filter((f) => f === true);
      if (filtersList.length) {
        searchFilter = searchFilter.filter((author) => {
          let matches = 0;
          if (
            Array.isArray(author.relatedTopics) &&
            author.relatedTopics.length
          ) {
            author.relatedTopics.forEach((topic) => {
              if (topic && filters[topic.displayName] == true) matches += 1;
            });
          }

          return matches >= filtersList.length;
        });
      }
    }

    const sortedFiltered = searchFilter.sort((a, b) => {
      if (a.lastName) {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    setFilteredAuthors(sortedFiltered);

    // if (!searchValue || !search) {
    //   setLoading(false)
    //   handleClearTextSearch()
    //   setFilteredAuthors(sortedFiltered)
    // }
  }, [filters]);

  useEffect(() => {
    let filterTopic;
    if (query.filter) {
      filterTopic = topics.filter(
        (topic) => topic.displayName === query.filter
      );
      setFilters(filterTopic);
    }
  }, [query, topics]);

  // useEffect(() => {}, [authors, filteredAuthors, topics]);

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
                  aria-describedby={id}
                  onClick={handleClick}
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
                    Search / filter
                  </Typography>
                </Button>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
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
                            setLoading(true);
                            setSearch(e.target.value);
                            setSearchValue(e.target.value);
                            handleClose();
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
                    {/* <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: "1px solid #8AA29D" }}
                      >
                        <Grid item>
                          <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              marginBottom: 0,
                            }}
                          >
                            Filter by
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button onClick={handleClearFilters}>
                            <Typography
                              component="div"
                              variant="h5"
                              sx={{
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
                              Clear
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>
                      <FormGroup
                        sx={{
                          flexWrap: "nowrap",
                          maxHeight: "615px",
                          overflow: "scroll",
                        }}
                      >
                        {topics
                          ? topics.map((topic) => (
                              <FormControlLabel
                                key={topic._id}
                                sx={{
                                  span: {
                                    fontFamily: "'Lexend', sans-serif",
                                  },
                                }}
                                control={
                                  <Checkbox
                                    checked={filters[topic.displayName]}
                                    onChange={() =>
                                      handleFilterChange(topic.displayName)
                                    }
                                  />
                                }
                                label={
                                  topic.displayName
                                    ? topic.displayName
                                    : topic.name
                                }
                              />
                            ))
                          : null}
                      </FormGroup>{" "} */}
                  </Paper>
                </Popper>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems={"space-between"}
              justifyContent={"flex-start"}
              spacing={2}
              sx={{ marginTop: 1 }}
            >
              <Grid item xs={12} sm={2}></Grid>
              <Grid item>
                <Stack direction="row" spacing={1} flexWrap={"wrap"} useFlexGap>
                  {Object.keys(filters).length
                    ? Object.keys(filters).map((filter, index) => {
                        if (filters[filter] == true) {
                          return (
                            <Chip
                              key={`${filter}-${index}`}
                              item
                              label={`${filter}`}
                              onDelete={handleDelete(filter)}
                              sx={{
                                fontFamily: "'Open sans', sans-serif",
                                fontWeight: 500,
                                textTransform: "none",
                              }}
                            />
                          );
                        }
                      })
                    : null}
                </Stack>
              </Grid>
            </Grid>
            <Grid container my={6} spacing={4}>
              {filteredAuthors.length ? (
                filteredAuthors.map((author) => (
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
                          src={urlFor(author.photo).url()}
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
                          {toPlainText(author.bio).substring(0, 300)}
                          {toPlainText(author.bio).length > 300 ? "..." : ""}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid container item justifyContent="center">
                  <Typography variant="div">{`No authors found with the name '${searchValue}.' Clear the search filter to return to previous results.`}</Typography>
                </Grid>
              )}
            </Grid>
          </>
        )}
        {authors.length < totalAuthors && !searchValue ? (
          <Grid container item justifyContent="center">
            <Button onClick={fetchNextResults}>
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
                  textAlign: "center",
                  "&:active, & :focus, &:hover": {
                    color: "#FF0033",
                    textDecoration: "underline",
                  },
                }}
              >
                View More
              </Typography>
            </Button>
          </Grid>
        ) : null}
      </Container>
    </Box>
  );
};

Contributors.propTypes = {
  page: PropTypes.object,
  authors: PropTypes.array,
};

export default Contributors;
