// base imports
import React from "react";

// material ui imports
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  logo: {
    borderBottom: "2px solid transparent",
    display: "inline-block",
    transition: "border-bottom 500ms",
  },
  name: {
    fontSize: "1em",
    fontWeight: "bold",
  },
  nameCoding: {
    position: "relative",
  },
  nameDot: {
    color: theme.typography.link.color,
    fontSize: "1.5em",
    marginLeft: "3px",
  },
  nameRe: {
    position: "relative",
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <Typography className={classes.logo}>
      <span className={`${classes.name} ${classes.nameRe}`}>Re</span>
      <span className={classes.name}>cod</span>
      <span className={`${classes.name} ${classes.nameCoding}`}>i</span>
      <span className={classes.name}>ng</span>
      <span className={`${classes.name} ${classes.nameDot}`}>.</span>
      <span className={classes.name}>Tech</span>
    </Typography>
  );
}

export default Logo;
