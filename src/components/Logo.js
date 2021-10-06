// base imports
import React from "react";

// material ui imports
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
  logo: {
    transition: "0.6s",
    transformStyle: "preserve-3d",
    "&:active, &:focus, &:hover": {
      // transform: "scaleY(-1)",
      transform: "rotate(180deg)",
      transformOrigin: "40% 50%",
      transition: "0.6s"
    }
  },
  name: {
    fontSize: "2em",
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
      top: "3px",
      transform: "translateX(-50%)",
      width: "7px"
    }
  },
  nameDot: {
    color: theme.typography.link.color,
    fontSize: "2.5em",
    marginLeft: "3px"
  },
  nameRe: {
    marginRight: "6px",
    paddingRight: "4px",
    position: "relative",
    "&::after": {
      backgroundColor: theme.typography.link.color,
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      position: "absolute",
      right: "-5px",
      top: "55%",
      transform: "translateY(-50%)",
      width: "7px"
    }
  }
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
