// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// Material UI icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles(theme => ({
  icon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    transition: "right 250ms"
  },
  tableCellTitle: {
    minWidth: 150,
    position: "relative",
    textTransform: "none",
    "&:after": {
      backgroundColor: theme.palette.footer.main,
      content: "''",
      display: "block",
      left: 0,
      minHeight: 40,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      zIndex: "-1"
    },
    "&:hover": {
      "& a": {
        textDecoration: "underline"
      },
      "& svg": {
        right: 10,
        transition: "right 250ms"
      }
    }
  },
  tableLink: {
    color: "#000",
    position: "relative",
    textDecoration: "none"
  },
  trackerIcon: {
    left: 0,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  trackerLink: {
    color: "#000",
    fontStyle: "italic",
    paddingLeft: 40,
    position: "relative",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const TrackerActions = props => {
  const classes = useStyles();
  const { page } = props;

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Country" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" }
  ];

  return (
    <>
      <Typography gutterBottom>
        <Link href="/tracker" className={classes.trackerLink}>
          <KeyboardArrowLeftIcon className={classes.trackerIcon} />
          Return to law &amp; regulation tracker
        </Link>
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          aria-label="Law and Regulation Tracker Table"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              {headers.map(column => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1} key={page.slug}>
              <TableCell key={page.slug} className={classes.tableCellTitle}>
                <Link className={classes.tableLink} href={page.slug}>
                  {page.title}
                </Link>
                <KeyboardArrowRightIcon className={classes.icon} />
              </TableCell>
              <TableCell key={page.slug}>{page.type}</TableCell>
              <TableCell key={page.slug}>{page.country.displayTitle}</TableCell>
              <TableCell key={page.slug}>
                {moment(page.dateInitiated).strftime("%B %e, %Y")}
              </TableCell>
              <TableCell key={page.slug}>{page.status}</TableCell>
              <TableCell key={page.slug}>{page.lastUpdate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

TrackerActions.propTypes = {
  page: PropTypes.object
};

export default TrackerActions;
