// base imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles, useTheme } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { visuallyHidden } from "@mui/utils";

// material ui icons
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";

// component imports
import Logo from "./Logo";

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic",
  },
  header: {},
  link: {
    color: "#000 !important",
    textDecoration: "none",
  },
  logoLink: {
    color: "unset",
    textDecoration: "none",
  },
  nav: {},
  svg: {
    display: "block",
    maxHeight: 20,
    maxWidth: 20,
    width: "100%",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { page, data } = props;

  const [issues, policies, countries, companies] = data.topics.reduce(
    ([issues, policies, countries, companies], topic) => {
      switch (topic.type) {
        case "issue":
          issues.push(topic);
          break;
        case "policy":
          policies.push(topic);
          break;
        case "country":
          countries.push(topic);
          break;
        case "company":
          companies.push(topic);
          break;
        default:
          break;
      }
      return [issues, policies, countries, companies];
    },
    [[], [], [], []]
  );

  const [mobileEl, setMobileEl] = useState(null);
  const openMobile = Boolean(mobileEl);
  const handleClickMobile = (event) => {
    setMobileEl(event.currentTarget);
  };
  const handleCloseMobile = () => {
    setMobileEl(null);
  };

  const isMobile = useMediaQuery("(max-width:1244px)");

  const [issueEl, setIssueEl] = useState(null);
  const openIssue = Boolean(issueEl);
  const handleClickIssue = (event) => {
    setIssueEl(event.currentTarget);
  };
  const handleCloseIssue = () => {
    setIssueEl(null);
  };

  const [policyEl, setPolicyEl] = useState(null);
  const openPolicy = Boolean(policyEl);
  const handleClickPolicy = (event) => {
    setPolicyEl(event.currentTarget);
  };
  const handleClosePolicy = () => {
    setPolicyEl(null);
  };

  const [countryEl, setCountryEl] = useState(null);
  const openCountry = Boolean(countryEl);
  const handleClickCountry = (event) => {
    setCountryEl(event.currentTarget);
  };
  const handleCloseCountry = () => {
    setCountryEl(null);
  };

  const [companyEl, setCompanyEl] = useState(null);
  const openCompany = Boolean(companyEl);
  const handleClickCompany = (event) => {
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
            : theme.palette.secondary.main,
      }}
    >
      <Box p={4}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={10} sm={4}>
            <Link href="/" className={classes.logoLink}>
              <Logo />
            </Link>
          </Grid>
          <Grid
            container
            item
            xs={2}
            sm={8}
            className={classes.nav}
            alignItems="center"
            spacing={4}
            justifyContent="flex-end"
          >
            {isMobile ? (
              <Grid item xs={12} sx={{ textAlign: "right" }} id="menu-toggle">
                <Button
                  id="mobile-menu-button"
                  aria-controls="mobile-menu"
                  aria-haspopup="true"
                  aria-expanded={openMobile ? "true" : undefined}
                  onClick={handleClickMobile}
                >
                  {openMobile ? <CloseIcon /> : <MenuIcon />}
                  <Typography sx={visuallyHidden}>
                    Open or Close Menu
                  </Typography>
                </Button>
                <Popover
                  id="mobile-menu"
                  open={openMobile}
                  anchorEl={mobileEl}
                  onClose={handleCloseMobile}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{ mt: 2 }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        page.type && theme.palette[page.type]
                          ? theme.palette[page.type].main
                          : theme.palette.secondary.main,
                      p: 2,
                      width: "90vw",
                    }}
                  >
                    <Typography className={classes.em}>
                      Explore by...
                    </Typography>
                    <Accordion
                      sx={{
                        backgroundColor:
                          page.type && theme.palette[page.type]
                            ? theme.palette[page.type].main
                            : theme.palette.secondary.main,
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        sx={{ display: "flex", marginLeft: 10 }}
                      >
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ textTransform: "none" }}
                        >
                          Issue
                        </Typography>
                        {openIssue ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        {issues && issues.length
                          ? issues.map((issue) => (
                              <Typography
                                key={issue.slug}
                                onClick={handleCloseIssue}
                                component="div"
                                variant="h4"
                                sx={{ marginLeft: 16, textTransform: "none" }}
                              >
                                <Link
                                  href={`/issue/${issue.slug}`}
                                  className={classes.link}
                                >
                                  {issue.displayTitle}
                                </Link>
                              </Typography>
                            ))
                          : null}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{
                        backgroundColor:
                          page.type && theme.palette[page.type]
                            ? theme.palette[page.type].main
                            : theme.palette.secondary.main,
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        sx={{ display: "flex", marginLeft: 10 }}
                      >
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ textTransform: "none" }}
                        >
                          Policy
                        </Typography>
                        {openPolicy ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        {policies && policies.length
                          ? policies.map((policy) => (
                              <Typography
                                key={policy.slug}
                                onClick={handleClosePolicy}
                                component="div"
                                variant="h4"
                                sx={{ marginLeft: 16, textTransform: "none" }}
                              >
                                <Link
                                  href={`/policy/${policy.slug}`}
                                  className={classes.link}
                                >
                                  {policy.displayTitle}
                                </Link>
                              </Typography>
                            ))
                          : null}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{
                        backgroundColor:
                          page.type && theme.palette[page.type]
                            ? theme.palette[page.type].main
                            : theme.palette.secondary.main,
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        sx={{ display: "flex", marginLeft: 10 }}
                      >
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ textTransform: "none" }}
                        >
                          Government
                        </Typography>
                        {openCountry ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        {countries && countries.length
                          ? countries.map((country) => (
                              <Typography
                                key={country.slug}
                                onClick={handleCloseCountry}
                                component="div"
                                variant="h4"
                                sx={{ marginLeft: 16, textTransform: "none" }}
                              >
                                <Link
                                  href={`/country/${country.slug}`}
                                  className={classes.link}
                                >
                                  {country.displayTitle}
                                </Link>
                              </Typography>
                            ))
                          : null}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{
                        backgroundColor:
                          page.type && theme.palette[page.type]
                            ? theme.palette[page.type].main
                            : theme.palette.secondary.main,
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        sx={{ display: "flex", marginLeft: 10 }}
                      >
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ textTransform: "none" }}
                        >
                          Company
                        </Typography>
                        {openCompany ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        {companies && companies.length
                          ? companies.map((company) => (
                              <Typography
                                key={company.slug}
                                onClick={handleCloseCompany}
                                component="div"
                                variant="h4"
                                sx={{ marginLeft: 16, textTransform: "none" }}
                              >
                                <Link
                                  href={`/company/${company.slug}`}
                                  className={classes.link}
                                >
                                  {company.displayTitle}
                                </Link>
                              </Typography>
                            ))
                          : null}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Popover>
              </Grid>
            ) : (
              <>
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
                        "aria-labelledby": "issue-button",
                      }}
                    >
                      {issues && issues.length
                        ? issues.map((issue) => (
                            <MenuItem
                              key={issue.slug}
                              onClick={handleCloseIssue}
                            >
                              <Link
                                href={`/issue/${issue.slug}`}
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
                        "aria-labelledby": "policy-button",
                      }}
                    >
                      {policies && policies.length
                        ? policies.map((policy) => (
                            <MenuItem
                              key={policy.slug}
                              onClick={handleCloseIssue}
                            >
                              <Link
                                href={`/policy/${policy.slug}`}
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
                      Government
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
                        "aria-labelledby": "country-button",
                      }}
                    >
                      {countries && countries.length
                        ? countries.map((country) => (
                            <MenuItem
                              key={country.slug}
                              onClick={handleCloseIssue}
                            >
                              <Link
                                href={`/country/${country.slug}`}
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
                        "aria-labelledby": "company-button",
                      }}
                    >
                      {companies && companies.length
                        ? companies.map((company) => (
                            <MenuItem
                              key={company.slug}
                              onClick={handleCloseIssue}
                            >
                              <Link
                                href={`/company/${company.slug}`}
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
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  page: PropTypes.object.isRequired,
};

export default Header;
