// base imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

// component imports
import Logo from "./Logo";
import SearchBarHeader from "./SearchBarHeader";

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
  const { data } = props;
  const [mobileEl, setMobileEl] = useState(null);
  const openMobile = Boolean(mobileEl);
  const handleClickMobile = (event) => {
    setMobileEl(event.currentTarget);
  };
  const handleCloseMobile = () => {
    setMobileEl(null);
  };

  const isMobile = useMediaQuery("(max-width:1264px)");

  const [anchorElTopics, setAnchorElTopics] = React.useState(null);
  const openTopics = Boolean(anchorElTopics);
  const handleClickTopics = (event) => {
    setAnchorElTopics(event.currentTarget);
  };
  const handleCloseTopics = () => {
    setAnchorElTopics(null);
  };

  const [anchorElProjects, setAnchorElProjects] = React.useState(null);
  const openProjects = Boolean(anchorElProjects);
  const handleClickProjects = (event) => {
    setAnchorElProjects(event.currentTarget);
  };
  const handleCloseProjects = () => {
    setAnchorElProjects(null);
  };

  return (
    <header className={classes.header}>
      <Box
        p={4}
        mb={4}
        mt={isMobile ? 0 : 4}
        sx={{
          boxShadow: isMobile ? "" : "0px 2px 1px -1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={10} sm={2}>
            <Link href="/" className={classes.logoLink}>
              <Logo />
              <Typography sx={{ display: "none" }}>Home</Typography>
            </Link>
          </Grid>
          <Grid
            container
            item
            xs={2}
            sm={10}
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
                      <Accordion elevation={0} sx={{ marginLeft: 0 }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="topics-mobile-content"
                          id="topics-mobile-header"
                          sx={{
                            display: "flex",
                            position: "relative",
                            width: 140,
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h4"
                            paddingTop={2}
                            sx={{ textTransform: "none" }}
                          >
                            Topics
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.config.header.topicsLinks &&
                            data.config.header.topicsLinks.map((link) => (
                              <Typography
                                key={link.url}
                                component="div"
                                variant="body2"
                                marginBottom={2}
                              >
                                <Link
                                  href={link.url}
                                  sx={{
                                    color: "#000",
                                    fontSize: "1.1em",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                  }}
                                >
                                  {link.label}
                                </Link>
                              </Typography>
                            ))}
                        </AccordionDetails>
                      </Accordion>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/tracker`} className={classes.link}>
                          Policy Tracker
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/newsletter`} className={classes.link}>
                          Newsletter
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          Podcast
                        </Link>
                      </Typography>
                      <Accordion
                        elevation={0}
                        sx={{ "&:before": { height: 0 }, marginLeft: 0 }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="projects-mobile-content"
                          id="projects-mobile-header"
                          sx={{
                            display: "flex",
                            position: "relative",
                            width: 140,
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h4"
                            paddingTop={2}
                            sx={{ textTransform: "none" }}
                          >
                            Projects
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.config.header.projectsLinks &&
                            data.config.header.projectsLinks.map((link) => (
                              <Typography
                                key={link.url}
                                component="div"
                                variant="body2"
                                marginBottom={2}
                              >
                                <Link
                                  href={link.url}
                                  sx={{
                                    color: "#000",
                                    fontSize: "1.1em",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                  }}
                                >
                                  {link.label}
                                </Link>
                              </Typography>
                            ))}
                        </AccordionDetails>
                      </Accordion>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/contributors`} className={classes.link}>
                          Contributors
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/about-us`} className={classes.link}>
                          About
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/search`} className={classes.link}>
                          Search
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
                  alignItems="flex-end"
                  justifyContent="space-between"
                  spacing={6}
                >
                  <Grid
                    container
                    item
                    xs={9}
                    spacing={1}
                    mt={1}
                    flexWrap={"nowrap"}
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Button
                        id="topics-button"
                        aria-controls={openTopics ? "topics-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openTopics ? "true" : undefined}
                        onClick={handleClickTopics}
                        sx={{
                          fontSize: "1em",
                          fontWeight: 500,
                          marginTop: "3px",
                          paddingTop: 0,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            backgroundColor: "#f2f2f2",
                            borderRadius: 0,
                          },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Topics
                      </Button>
                      <Menu
                        id="topics-menu"
                        anchorEl={anchorElTopics}
                        open={openTopics}
                        onClose={handleCloseTopics}
                        MenuListProps={{
                          "aria-labelledby": "topics-button",
                        }}
                        elevation={0}
                        sx={{
                          marginTop: 9,
                          "& ul": {
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            maxWidth: "60vw !important",
                            width: "60vw",
                          },
                        }}
                      >
                        {data.config.header.topicsLinks &&
                          data.config.header.topicsLinks.map((link) => (
                            <MenuItem key={link.url}>
                              <Link
                                href={link.url}
                                sx={{
                                  color: "#000",
                                  fontSize: "1.3em",
                                  fontWeight: 500,
                                  textDecoration: "none",
                                }}
                              >
                                {link.label}
                              </Link>
                            </MenuItem>
                          ))}
                      </Menu>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2"
                          }
                        }}
                      >
                        <Link href={`/tracker`} className={classes.link}>
                          Policy Tracker
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2"
                          }
                        }}
                      >
                        <Link href={`/newsletter`} className={classes.link}>
                          Newsletter
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2"
                          }
                        }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          Podcast
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        id="projects-button"
                        aria-controls={
                          openProjects ? "projects-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openProjects ? "true" : undefined}
                        onClick={handleClickProjects}
                        sx={{
                          fontSize: "1em",
                          fontWeight: 500,
                          marginTop: "3px",
                          paddingTop: 0,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            backgroundColor: "#f2f2f2",
                            borderRadius: 0,
                          },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Projects
                      </Button>
                      <Menu
                        id="projects-menu"
                        anchorEl={anchorElProjects}
                        open={openProjects}
                        onClose={handleCloseProjects}
                        MenuListProps={{
                          "aria-labelledby": "projects-button",
                        }}
                        elevation={0}
                        sx={{
                          marginTop: 9,
                          "& ul": {
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            maxWidth: "60vw !important",
                            width: "60vw",
                          },
                        }}
                      >
                        {data.config.header.projectsLinks &&
                          data.config.header.projectsLinks.map((link) => (
                            <MenuItem key={link.url}>
                              <Link
                                href={link.url}
                                sx={{
                                  color: "#000",
                                  fontSize: "1.3em",
                                  fontWeight: 500,
                                  textDecoration: "none",
                                }}
                              >
                                {link.label}
                              </Link>
                            </MenuItem>
                          ))}
                      </Menu>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                      sx={{
                        fontWeight: 500,
                        marginBottom: 0,
                        padding: 1,
                        textTransform: "none",
                        "&:active, &:focus, &:hover": {
                          background: "#f2f2f2"
                        }
                      }}
                      >
                        <Link href={`/contributors`} className={classes.link}>
                          Contributors
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2"
                          }
                        }}
                      >
                        <Link href={`/about-us`} className={classes.link}>
                          About
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} flexGrow={2}>
                    <SearchBarHeader />
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
    config: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  page: PropTypes.object.isRequired,
};

export default Header;
