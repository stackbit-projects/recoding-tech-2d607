import React from "react";
import _ from "lodash";

import { Link, withPrefix, classNames } from "../utils";
import Icon from "./Icon";

// material ui imports
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  header: {},
  name: {
    fontSize: "2.5em",
    fontWeight: "bold"
  },
  nameCoding: {
    position: "relative",
    "&::after": {
      backgroundColor: theme.typography.link.color,
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      left: "50%",
      position: "absolute",
      top: "2px",
      transform: "translateX(-50%)",
      width: "7px"
    }
  },
  nameDot: {
    color: theme.typography.link.color
  },
  nameRe: {
    marginRight: "6px",
    paddingRight: "3px",
    position: "relative",
    "&::after": {
      backgroundColor: theme.typography.link.color,
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      position: "absolute",
      right: "-5px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "7px"
    }
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Box m={4}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <span className={`${classes.name} ${classes.nameRe}`}>Re</span>
            <span className={classes.name}>cod</span>
            <span className={`${classes.name} ${classes.nameCoding}`}>i</span>
            <span className={classes.name}>ng</span>
            <span className={`${classes.name} ${classes.nameDot}`}>.</span>
            <span className={classes.name}>Tech</span>
          </Grid>
          <Grid item>
            <Typography>Navigation baby</Typography>
          </Grid>
        </Grid>
      </Box>
      <div className="site-header-wrap">
        <div className="site-header-inside">
          <div className="site-branding">
            {_.get(props, "data.config.header.profile_img", null) && (
              <p className="profile">
                <Link href={withPrefix("/")}>
                  <img
                    src={withPrefix(
                      _.get(props, "data.config.header.profile_img", null)
                    )}
                    className="avatar"
                    alt={_.get(
                      props,
                      "data.config.header.profile_img_alt",
                      null
                    )}
                  />
                </Link>
              </p>
            )}
            <div className="site-identity">
              <p className="site-title">
                <Link href={withPrefix("/")}>
                  {_.get(props, "data.config.header.title", null)}
                </Link>
              </p>
              {_.get(props, "data.config.header.tagline", null) && (
                <p className="site-description">
                  {_.get(props, "data.config.header.tagline", null)}
                </p>
              )}
            </div>
            {(_.get(props, "data.config.header.has_nav", null) ||
              _.get(props, "data.config.header.has_social", null)) && (
              <button id="menu-toggle" className="menu-toggle">
                <span className="screen-reader-text">Menu</span>
                <span className="icon-menu" aria-hidden="true" />
              </button>
            )}
          </div>
          {(_.get(props, "data.config.header.has_nav", null) ||
            _.get(props, "data.config.header.has_social", null)) && (
            <nav
              id="main-navigation"
              className="site-navigation"
              aria-label="Main Navigation"
            >
              <div className="site-nav-wrap">
                <div className="site-nav-inside">
                  {_.get(props, "data.config.header.has_nav", null) && (
                    <ul className="menu">
                      {_.map(
                        _.get(props, "data.config.header.nav_links", null),
                        (action, action_idx) => {
                          let pageUrl = _.trim(
                            _.get(props, "page.stackbit_url_path", null),
                            "/"
                          );
                          let actionUrl = _.trim(
                            _.get(action, "url", null),
                            "/"
                          );
                          return (
                            <li
                              key={action_idx}
                              className={classNames("menu-item", {
                                "current-menu-item": pageUrl === actionUrl,
                                "menu-button":
                                  _.get(action, "style", null) === "button"
                              })}
                            >
                              <Link
                                href={withPrefix(_.get(action, "url", null))}
                                {...(_.get(action, "new_window", null)
                                  ? { target: "_blank" }
                                  : null)}
                                {...(_.get(action, "new_window", null) ||
                                _.get(action, "no_follow", null)
                                  ? {
                                      rel:
                                        (_.get(action, "new_window", null)
                                          ? "noopener "
                                          : "") +
                                        (_.get(action, "no_follow", null)
                                          ? "nofollow"
                                          : "")
                                    }
                                  : null)}
                                className={classNames({
                                  button:
                                    _.get(action, "style", null) === "button"
                                })}
                              >
                                {_.get(action, "label", null)}
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                  {_.get(props, "data.config.header.has_social", null) &&
                    false && (
                      <div className="social-links">
                        {_.map(
                          _.get(props, "data.config.header.social_links", null),
                          (action, action_idx) =>
                            action && (
                              <Link
                                key={action_idx}
                                href={withPrefix(_.get(action, "url", null))}
                                {...(_.get(action, "new_window", null)
                                  ? { target: "_blank" }
                                  : null)}
                                {...(_.get(action, "new_window", null) ||
                                _.get(action, "no_follow", null)
                                  ? {
                                      rel:
                                        (_.get(action, "new_window", null)
                                          ? "noopener "
                                          : "") +
                                        (_.get(action, "no_follow", null)
                                          ? "nofollow"
                                          : "")
                                    }
                                  : null)}
                                className={classNames({
                                  "button button-icon":
                                    _.get(action, "style", null) === "icon"
                                })}
                              >
                                {_.get(action, "style", null) === "icon" &&
                                _.get(action, "icon_class", null) ? (
                                  <React.Fragment>
                                    <Icon
                                      {...props}
                                      icon={_.get(action, "icon_class", null)}
                                    />
                                    <span className="screen-reader-text">
                                      {_.get(action, "label", null)}
                                    </span>
                                  </React.Fragment>
                                ) : (
                                  _.get(action, "label", null)
                                )}
                              </Link>
                            )
                        )}
                      </div>
                    )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
