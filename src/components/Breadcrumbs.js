import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
// import Link from "../utils/link";
import NextLink from "next/link";

// Material UI
import { makeStyles } from "@mui/styles";

// function format(crumb) {
//     return titleCase(crumb.split("-").join(" "));
// }

const useStyles = makeStyles(() => ({
  link: {
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      color: "#ff0033",
    },
  },
}));

const CustomBreadcrumbs = ({ page }) => {
  const classes = useStyles();
  const { title, _type } = page;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const truncate = (title) =>
    +title.length > 50 ? `${title.substring(0, 50)}...` : title;

  useEffect(() => {
    const crumbs = [];

    if (_type === "policy_action") {
      crumbs.push({ linkText: "Policy Tracker", link: "/tracker/" });
      crumbs.push(truncate(title));
    }

    if (_type === "author") {
      crumbs.push({ linkText: "Contributors", link: "/contributors/" });
      crumbs.push(page.name);
    }

    if (_type === "post") {
      crumbs.push(truncate(title));
    }

    setBreadcrumbs(crumbs);
  }, []);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ color: "#000" }}
    >
      <NextLink href="/" className={classes.link}>
        <Typography variant="body2" color="#000">
          Home
        </Typography>
      </NextLink>
      {breadcrumbs.length
        ? breadcrumbs.map((crumb, idx) => {
            if (idx === breadcrumbs.length - 1) {
              return (
                <Typography
                  key={crumb}
                  variant={
                    _type === "post" ? "currentCrumbPost" : "currentCrumb"
                  }
                  className={classes.current}
                >
                  {crumb}
                </Typography>
              );
            } else {
              return (
                <NextLink
                  key={`${crumb}-link`}
                  href={crumb.link}
                  className={classes.link}
                >
                  <Typography
                    component="div"
                    key={crumb}
                    variant="body2"
                    color="#000"
                  >
                    {crumb.linkText}
                  </Typography>
                </NextLink>
              );
            }
          })
        : null}
    </Breadcrumbs>
  );
};

CustomBreadcrumbs.propTypes = {
  page: PropTypes.object,
};

export default CustomBreadcrumbs;
