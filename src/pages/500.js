import React from "react";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  logo: {
    borderBottom: "2px solid transparent",
    display: "inline-block",
    fontFamily: "'Libre Baskerville', serif",
    transition: "border-bottom 500ms",
    "&:active, &:focus, &:hover": {
      borderBottom: `2px solid #000`,
      transition: "border-bottom 500ms",
    },
  },
  name: {
    fontSize: "2em",
    fontWeight: "bold",
  },
  nameCoding: {
    position: "relative",
    "&::after": {
      backgroundColor: "#FF0033",
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      left: "50%",
      position: "absolute",
      top: "3px",
      transform: "translateX(-50%)",
      width: "7px",
    },
  },
  nameDot: {
    color: "#FF0033",
    fontSize: "2.5em",
    marginLeft: "3px",
  },
  nameRe: {
    marginRight: "6px",
    paddingRight: "4px",
    position: "relative",
    "&::after": {
      backgroundColor: "#FF0033",
      borderRadius: "50%",
      content: "''",
      display: "block",
      height: "7px",
      position: "absolute",
      right: "-5px",
      top: "55%",
      transform: "translateY(-50%)",
      width: "7px",
    },
  },
}));

export default function Custom500() {
  const classes = useStyles();

  return (
    <Box
      sx={{ backgroundColor: "#C2CECC", height: "100vh", position: "relative" }}
    >
      <Container>
        <Typography component="h1" variant="body1" className={classes.logo}>
          <span className={`${classes.name} ${classes.nameRe}`}>Re</span>
          <span className={classes.name}>cod</span>
          <span className={`${classes.name} ${classes.nameCoding}`}>i</span>
          <span className={classes.name}>ng</span>
          <span className={`${classes.name} ${classes.nameDot}`}>.</span>
          <span className={classes.name}>Tech</span>
        </Typography>
        <Box
          sx={{
            left: "50%",
            minWidth: { xs: 300, md: 600 },
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography component="div" variant="h2" gutterBottom>
            (500) A server-side error has occurred
          </Typography>
          <Typography component="div" variant="body1" sx={{ fontSize: 24 }}>
            Return{" "}
            <Link
              href="/"
              variant="body1"
              sx={{ color: "#FF0033", fontSize: 24 }}
            >
              home
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
