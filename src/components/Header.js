// base imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { visuallyHidden } from "@mui/utils";

// material ui icons
import CloseIcon from "@mui/icons-material/Close";
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

const Header = () => {
  const classes = useStyles();

  const [mobileEl, setMobileEl] = useState(null);
  const openMobile = Boolean(mobileEl);
  const handleClickMobile = (event) => {
    setMobileEl(event.currentTarget);
  };
  const handleCloseMobile = () => {
    setMobileEl(null);
  };

  const isMobile = useMediaQuery("(max-width:1264px)");

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
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`/topics`} className={classes.link}>
                          Topics
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`/tracker`} className={classes.link}>
                          Policy Tracker
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          Newsletter
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          Podcast
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          Projects
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          Contributors
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
                          About
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
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
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Grid
                    container
                    item
                    xs={8}
                    spacing={2}
                    mt={1}
                    flexWrap={"nowrap"}
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`/topics`} className={classes.link}>
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
                        <Link href={`/tracker`} className={classes.link}>
                          Policy Tracker
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ textTransform: "none" }}
                      >
                        <Link href={`#FIXME`} className={classes.link}>
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
                        <Link href={`#FIXME`} className={classes.link}>
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
                        <Link href={`#FIXME`} className={classes.link}>
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
                        <Link href={`#FIXME`} className={classes.link}>
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
                        <Link href={`#FIXME`} className={classes.link}>
                          About
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} flexGrow={2}>
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
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  page: PropTypes.object.isRequired,
};

export default Header;
