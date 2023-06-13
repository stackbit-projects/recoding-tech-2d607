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
    <header className={classes.header} >
      <Box p={4} sx={{ boxShadow: isMobile ? '' : '0px 2px 1px -1px rgba(0, 0, 0, 0.2)' }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={10} sm={3}>
            <Link href="/" className={classes.logoLink}>
              <Logo />
            </Link>
          </Grid>
          <Grid
            container
            item
            xs={2}
            sm={9}
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
                      p: 2,
                      width: "90vw",
                    }}
                  >
                    <nav>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`/topics`}
                          className={classes.link}
                        >
                          Topics
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`/tracker`}
                          className={classes.link}
                        >
                          Law & Regulation Tracker
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`#FIXME`}
                          className={classes.link}
                        >
                          Newsletter
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`#FIXME`}
                          className={classes.link}
                        >
                          Podcast
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`#FIXME`}
                          className={classes.link}
                        >
                          Projects
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`#FIXME`}
                          className={classes.link}
                        >
                          Contributors
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link
                          href={`#FIXME`}
                          className={classes.link}
                        >
                          About
                        </Link>
                      </Typography>
                    </nav>
                  </Box>
                </Popover>
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  item
                  xs={12}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`/topics`}
                        className={classes.link}
                      >
                        Topics
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`/tracker`}
                        className={classes.link}
                      >
                        Law & Regulation Tracker
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`#FIXME`}
                        className={classes.link}
                      >
                        Newsletter
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`#FIXME`}
                        className={classes.link}
                      >
                        Podcast
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`#FIXME`}
                        className={classes.link}
                      >
                        Projects
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`#FIXME`}
                        className={classes.link}
                      >
                        Contributors
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ textTransform: "none" }}
                    >
                      <Link
                        href={`#FIXME`}
                        className={classes.link}
                      >
                        About
                      </Link>
                    </Typography>
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
