// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import moment from "moment-strftime";
import { titleCase } from "title-case";

// utils
import client from "../utils/sanityClient";

// material ui imports
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// material ui icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const policyActionsQuery = `*[_type == "policy_action" && !(_id match "drafts")]{category, country->{_key, displayTitle, name, slug}, dateInitiated,
                            lastUpdate, _id,
                            slug, status, title,
                            relatedTopics[]->{_id, _key, name, slug, type}, type}`;

const topicsQuery =
  '*[_type == "topic" && stackbit_model_type == "page" && !(_id match "drafts.*")]{_id, _key, name, slug, type}';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "0.8em",
    textTransform: "uppercase",
    width: 180,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    transition: "right 250ms",
  },
  table: {},
  tableCellTitle: {
    position: "relative",
    textTransform: "none",
    "&:after": {
      backgroundColor: theme.palette.footer.main,
      content: "''",
      display: "block",
      left: 0,
      height: "75%",
      // minHeight: 40,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      zIndex: "-1",
    },
    "&:hover": {
      "& a": {
        textDecoration: "underline",
      },
      "& svg": {
        right: 10,
        transition: "right 250ms",
      },
    },
  },
  tableLink: {
    color: "#000",
    display: "block",
    position: "relative",
    textDecoration: "none",
    maxWidth: "85%",
  },
}));

function SectionTracker(props) {
  const classes = useStyles();
  const { query } = useRouter();
  const { section } = props;
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);

  const isMobile = useMediaQuery("(max-width:1064px)");

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Government" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" },
  ];

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

  // table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <section>
      <Box my={4}>
        <Container maxWidth="md">
          <Typography variant="body1" component="div">
            {section.intro}
          </Typography>
        </Container>
      </Box>
      <Box my={4}>
        <Container>
          <Typography component="div" variant="h3">
            Filter by:
          </Typography>
          <Grid container spacing={2} justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="issues-button"
                color="issue"
                aria-controls="issues-menu"
                aria-haspopup="true"
                aria-expanded={openIssues ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickIssues}
                endIcon={
                  openIssues ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="policies-button"
                color="policy"
                aria-controls="policies-menu"
                aria-haspopup="true"
                aria-expanded={openPolicies ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickPolicies}
                endIcon={
                  openPolicies ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="countries-button"
                color="country"
                aria-controls="countries-menu"
                aria-haspopup="true"
                aria-expanded={openCountries ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickCountries}
                endIcon={
                  openCountries ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="companies-button"
                color="company"
                aria-controls="companies-menu"
                aria-haspopup="true"
                aria-expanded={openCompanies ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickCompanies}
                endIcon={
                  openCompanies ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
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
            </Grid>
          </Grid>
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
          actions
            .sort((a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate))
            .reverse()
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Accordion key={row._key} sx={{ marginBottom: 4 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`content-${row._key}`}
                  id={`header-${row._key}`}
                  sx={{
                    backgroundColor: "#EFE9DA",
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography component="div" variant="h4">
                    {titleCase(row.title)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid
                      container
                      item
                      xs={12}
                      sx={{ mb: 2 }}
                      alignItems="center"
                    >
                      <Grid item>
                        <Link
                          href={`/tracker/${
                            typeof row.slug === "object"
                              ? row.slug.current
                              : row.slug
                          }`}
                          variant="body2"
                          sx={{ color: "#000" }}
                        >
                          View details
                        </Link>
                      </Grid>
                      <Grid item>
                        <KeyboardArrowRightIcon />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        borderBottom: "1px solid #ccc",
                        borderTop: "1px solid #ccc",
                        paddingTop: 2,
                      }}
                    >
                      <Typography variant="h4">Type</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        borderBottom: "1px solid #ccc",
                        borderTop: "1px solid #ccc",
                        paddingTop: 2,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                        {row.type}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4">Government</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                        {row.country.displayTitle}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4">Date Initiated</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                        {moment(new Date(row.dateInitiated)).strftime(
                          "%b %d, %Y"
                        )}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4">Status</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                        {row.status}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4">Last Updated</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                        {moment(new Date(row.lastUpdate)).strftime("%b %d, %Y")}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              aria-label="Law and Regulation Tracker Table"
              className={classes.table}
            >
              <TableHead>
                <TableRow>
                  {headers.map((column) => (
                    <TableCell key={column.id}>
                      <Typography component="div" variant="tableHeader">
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {actions
                  .sort(
                    (a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate)
                  )
                  .reverse()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._key}
                      >
                        {headers.map((column) => {
                          let value = row[column.id];
                          if (!value) {
                            if (row.country) {
                              value = row.country.displayTitle; // #FIXME
                            } else {
                              value = "";
                            }
                          }
                          return (
                            <TableCell
                              key={column.id}
                              className={
                                column.id == "title"
                                  ? classes.tableCellTitle
                                  : null
                              }
                            >
                              {column.id == "dateInitiated" ||
                              column.id == "lastUpdate" ? (
                                moment(new Date(value)).strftime("%b %d, %Y")
                              ) : column.id == "title" ? (
                                <Typography
                                  component="div"
                                  variant="trackerTitle"
                                >
                                  <Link
                                    className={classes.tableLink}
                                    href={`/tracker/${
                                      typeof row.slug === "object"
                                        ? row.slug.current
                                        : row.slug
                                    }`}
                                  >
                                    {titleCase(value)}
                                  </Link>
                                </Typography>
                              ) : (
                                <Typography
                                  component="div"
                                  variant="trackerRow"
                                >
                                  {value}
                                </Typography>
                              )}
                              {column.id == "title" ? (
                                <KeyboardArrowRightIcon
                                  className={classes.icon}
                                />
                              ) : null}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={actions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </section>
  );
}

SectionTracker.propTypes = {
  section: PropTypes.object,
};

export default SectionTracker;
