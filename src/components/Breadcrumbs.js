import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Link from "../utils/link";

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

  useEffect(() => {
    const crumbs = [];

    if (_type === "policy_action") {
      crumbs.push({ linkText: "Policy Tracker", link: "/tracker/" });
      crumbs.push(title);
    }

    if (_type === "author") {
      crumbs.push({ linkText: "Contributors", link: "/contributors/" });
      crumbs.push(page.name);
    }

    if (_type === "post") {
      crumbs.push(title);
    }

    setBreadcrumbs(crumbs);
  }, []);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ color: "#000" }}
    >
      <Typography variant="body2" color="#000">
        <Link href="/" className={classes.link}>
          Home
        </Link>
      </Typography>
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
              <Typography
                component="div"
                key={crumb}
                variant="body2"
                color="#000"
              >
                <Link href={crumb.link} className={classes.link}>
                  {crumb.linkText}
                </Link>
              </Typography>
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
