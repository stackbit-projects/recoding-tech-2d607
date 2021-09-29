// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// material ui icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: "0.8em",
    textTransform: "uppercase",
    width: 180
  },
  policyButton: {
    backgroundColor: theme.palette.policy.main
  },
  countryButton: {
    backgroundColor: theme.palette.country.main
  },
  companyButton: {
    backgroundColor: theme.palette.company.main
  }
}));

function SectionTracker(props) {
  const classes = useStyles();
  const { actions, section } = props;

  let issues, policies, companies;
  actions.filter(action => {
    issues = action.relatedTopics
      .filter(topic => topic.type == "issue")
      .map(topic => topic.displayTitle);

    policies = action.relatedTopics
      .filter(topic => topic.type == "policy")
      .map(topic => topic.displayTitle);

    companies = action.relatedTopics
      .filter(topic => topic.type == "company")
      .map(topic => topic.displayTitle);
  });

  const countries = actions.map(action => action.country);

  const [issueEl, setIssueEl] = React.useState(null);
  const openIssues = Boolean(issueEl);
  const handleClickIssues = event => {
    setIssueEl(event.currentTarget);
  };
  const handleCloseIssues = () => {
    setIssueEl(null);
  };

  const [policiesEl, setPoliciesEl] = React.useState(null);
  const openPolicies = Boolean(policiesEl);
  const handleClickPolicies = event => {
    setPoliciesEl(event.currentTarget);
  };
  const handleClosePolicies = () => {
    setPoliciesEl(null);
  };

  const [countriesEl, setCountriesEl] = React.useState(null);
  const openCountries = Boolean(countriesEl);
  const handleClickCountries = event => {
    setCountriesEl(event.currentTarget);
  };
  const handleCloseCountries = () => {
    setCountriesEl(null);
  };

  const [companiesEl, setCompaniesEl] = React.useState(null);
  const openCompanies = Boolean(companiesEl);
  const handleClickCompanies = event => {
    setCompaniesEl(event.currentTarget);
  };
  const handleCloseCompanies = () => {
    setCompaniesEl(null);
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
                  "aria-labelledby": "issues-button"
                }}
                anchorEl={issueEl}
                open={openIssues}
                onClose={handleCloseIssues}
              >
                {issues.length
                  ? issues.map(issue => (
                      <MenuItem
                        key={issue.replace(" ", "-")}
                        onClick={handleCloseIssues}
                        disableRipple
                      >
                        {issue}
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
                  "aria-labelledby": "policies-button"
                }}
                anchorEl={policiesEl}
                open={openPolicies}
                onClose={handleClosePolicies}
              >
                {policies.length
                  ? policies.map(policy => (
                      <MenuItem
                        key={policy.replace(" ", "-")}
                        onClick={handleClosePolicies}
                        disableRipple
                      >
                        {policy}
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
                Country
              </Button>
              <Menu
                id="countries-menu"
                MenuListProps={{
                  "aria-labelledby": "countries-button"
                }}
                anchorEl={countriesEl}
                open={openCountries}
                onClose={handleCloseCountries}
              >
                {countries.length
                  ? countries.map(country => (
                      <MenuItem
                        key={country.slug}
                        onClick={handleCloseCountries}
                        disableRipple
                      >
                        {country.displayTitle}
                      </MenuItem>
                    ))
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
                  "aria-labelledby": "companies-button"
                }}
                anchorEl={companiesEl}
                open={openCompanies}
                onClose={handleCloseCompanies}
              >
                {companies.length
                  ? companies.map(company => (
                      <MenuItem
                        key={companies.replace(" ", "-")}
                        onClick={handleCloseCompanies}
                        disableRipple
                      >
                        {company}
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </section>
  );
}

SectionTracker.propTypes = {
  actions: PropTypes.array,
  section: PropTypes.object
};

export default SectionTracker;
