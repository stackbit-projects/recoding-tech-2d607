// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// utils
import client from "../utils/sanityClient";

// material ui imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// material ui icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// component imports
import Logo from "./Logo";

/** query to get topics in the db that have been published as a page 
 * && is not a draft */ 
const query =
  '*[_type == "topic" && stackbit_model_type == "page" && !(_id match "drafts.*")]{displayTitle, link, slug, type}';

let topics = [];

client.fetch(query).then(allTopics => {
  allTopics.forEach(topic => {
    topics = [...topics, topic];
  });
});

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic"
  },
  header: {},
  link: {
    color: "#000 !important",
    textDecoration: "none"
  },
  logoLink: {
    color: "unset",
    textDecoration: "none"
  },
  nav: {},
  svg: {
    display: "block",
    maxHeight: 20,
    maxWidth: 20,
    width: "100%"
  }
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { page } = props;
  const [issues, setIssues] = useState(null);
  const [policies, setPolicies] = useState(null);
  const [countries, setCountries] = useState(null);
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    if (topics) {
      const topicIssues = topics.filter(topic => topic.type == "issue");
      setIssues(topicIssues);

      const topicPolicies = topics.filter(topic => topic.type == "policy");
      setPolicies(topicPolicies);

      const topicCountries = topics.filter(topic => topic.type == "country");
      setCountries(topicCountries);

      const topicCompanies = topics.filter(topic => topic.type == "company");
      setCompanies(topicCompanies);
    }
  }, [topics]);

  useEffect(() => {}, [issues, policies, countries, companies]);

  const [issueEl, setIssueEl] = React.useState(null);
  const openIssue = Boolean(issueEl);
  const handleClickIssue = event => {
    setIssueEl(event.currentTarget);
  };
  const handleCloseIssue = () => {
    setIssueEl(null);
  };

  const [policyEl, setPolicyEl] = React.useState(null);
  const openPolicy = Boolean(policyEl);
  const handleClickPolicy = event => {
    setPolicyEl(event.currentTarget);
  };
  const handleClosePolicy = () => {
    setPolicyEl(null);
  };

  const [countryEl, setCountryEl] = React.useState(null);
  const openCountry = Boolean(countryEl);
  const handleClickCountry = event => {
    setCountryEl(event.currentTarget);
  };
  const handleCloseCountry = () => {
    setCountryEl(null);
  };

  const [companyEl, setCompanyEl] = React.useState(null);
  const openCompany = Boolean(companyEl);
  const handleClickCompany = event => {
    setCompanyEl(event.currentTarget);
  };
  const handleCloseCompany = () => {
    setCompanyEl(null);
  };

  return (
    <header
      className={classes.header}
      style={{
        backgroundColor:
          page.type && theme.palette[page.type]
            ? theme.palette[page.type].main
            : theme.palette.secondary.main
      }}
    >
      <Box p={4}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Link href="/" className={classes.logoLink}>
              <Logo />
            </Link>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={8}
            className={classes.nav}
            alignItems="center"
            spacing={4}
            justifyContent="flex-end"
          >
            <Grid item xs={12} sm={3}>
              <Typography id="menu-toggle" className={classes.em}>
                Explore by...
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={9}
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  id="issue-button"
                  aria-controls="issue-menu"
                  aria-haspopup="true"
                  aria-expanded={openIssue ? "true" : undefined}
                  onClick={handleClickIssue}
                >
                  Issue
                  {openIssue ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="issue-menu"
                  anchorEl={issueEl}
                  open={openIssue}
                  onClose={handleCloseIssue}
                  MenuListProps={{
                    "aria-labelledby": "issue-button"
                  }}
                >
                  {issues && issues.length
                    ? issues.map(issue => (
                        <MenuItem
                          key={issue.slug.current}
                          onClick={handleCloseIssue}
                        >
                          <Link
                            href={`/issue/${issue.slug.current}`}
                            className={classes.link}
                          >
                            {issue.displayTitle}
                          </Link>
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button
                  id="policy-button"
                  aria-controls="policy-menu"
                  aria-haspopup="true"
                  aria-expanded={openPolicy ? "true" : undefined}
                  onClick={handleClickPolicy}
                >
                  Policy
                  {openPolicy ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="policy-menu"
                  anchorEl={policyEl}
                  open={openPolicy}
                  onClose={handleClosePolicy}
                  MenuListProps={{
                    "aria-labelledby": "policy-button"
                  }}
                >
                  {policies && policies.length
                    ? policies.map(policy => (
                        <MenuItem
                          key={policy.slug.current}
                          onClick={handleCloseIssue}
                        >
                          <Link
                            href={`/policy/${policy.slug.current}`}
                            className={classes.link}
                          >
                            {policy.displayTitle}
                          </Link>
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button
                  id="country-button"
                  aria-controls="country-menu"
                  aria-haspopup="true"
                  aria-expanded={openCountry ? "true" : undefined}
                  onClick={handleClickCountry}
                >
                  Country
                  {openCountry ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="country-menu"
                  anchorEl={countryEl}
                  open={openCountry}
                  onClose={handleCloseCountry}
                  MenuListProps={{
                    "aria-labelledby": "country-button"
                  }}
                >
                  {countries && countries.length
                    ? countries.map(country => (
                        <MenuItem
                          key={country.slug.current}
                          onClick={handleCloseIssue}
                        >
                          <Link
                            href={`/country/${country.slug.current}`}
                            className={classes.link}
                          >
                            {country.displayTitle}
                          </Link>
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button
                  id="company-button"
                  aria-controls="company-menu"
                  aria-haspopup="true"
                  aria-expanded={openCompany ? "true" : undefined}
                  onClick={handleClickCompany}
                >
                  Company
                  {openCompany ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="company-menu"
                  anchorEl={companyEl}
                  open={openCompany}
                  onClose={handleCloseCompany}
                  MenuListProps={{
                    "aria-labelledby": "company-button"
                  }}
                >
                  {companies && companies.length
                    ? companies.map(company => (
                        <MenuItem
                          key={company.slug.current}
                          onClick={handleCloseIssue}
                        >
                          <Link
                            href={`/company/${company.slug.current}`}
                            className={classes.link}
                          >
                            {company.displayTitle}
                          </Link>
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button href="/search">
                  <svg
                    className={classes.svg}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 17 16"
                  >
                    <circle
                      cx="5.65"
                      cy="5.65"
                      r="4.65"
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <path
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="m9.88 9.41 5.18 5.18"
                    />
                  </svg>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}

Header.propTypes = {
  topics: PropTypes.array,
  page: PropTypes.object
};

export default Header;
