import React from "react";
import _ from "lodash";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Link from "@mui/material/Link";

// utils
import { withPrefix } from "../utils";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.typography.link.color,
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "relative",
    zIndex: 1
  }
}));

function CtaButtons(props) {
  const classes = useStyles();
  let actions = _.get(props, "actions", null);

  return _.map(actions, (action, action_idx) => (
    <Link
      key={action_idx}
      variant="link"
      href={withPrefix(_.get(action, "url", null))}
      {...(_.get(action, "new_window", null) ? { target: "_blank" } : null)}
      {...(_.get(action, "new_window", null) || _.get(action, "no_follow", null)
        ? {
            rel:
              (_.get(action, "new_window", null) ? "noopener " : "") +
              (_.get(action, "no_follow", null) ? "nofollow" : "")
          }
        : null)}
      className={classes.link}
    >
      {_.get(action, "label", null)}
    </Link>
  ));
}

export default CtaButtons;
