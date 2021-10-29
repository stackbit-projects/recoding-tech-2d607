// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
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

const RelatedActions = props => {
  const classes = useStyles();
  const { page, citations } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actions, setActions] = React.useState(null);

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Country" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" }
  ];

  useEffect(() => {
    setActions(citations.filter(citation => {
      console.log('citation:', citation);
      if (Array.isArray(citation.topics) && citation.topics.length) {
        return citation.topics.findIndex(topic => topic.name === page.name) >= 0
      } else return false;
    }));
  }, []);


  return Array.isArray(actions) && actions.length ? (
    <section>
      <Box my={4}>
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
              {actions
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.slug}
                    >
                      {headers.map(column => {
                        let value = row[column.id];
                        if (!value) {
                          if (row.country) {
                            value = row.country.displayTitle; // #FIXME
                          } else {
                            value = "";
                          }
                        }
                        return (
                          <TableCell
                            key={column.id}
                            className={
                              column.id == "title"
                                ? classes.tableCellTitle
                                : null
                            }
                          >
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id == "title" ? (
                              <Link
                                className={classes.tableLink}
                                href={row.slug}
                              >
                                {value}
                              </Link>
                            ) : (
                              value
                            )}
                            {column.id == "title" ? (
                              <KeyboardArrowRightIcon
                                className={classes.icon}
                              />
                            ) : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </section>
    ) : null;
};

RelatedActions.propTypes = {
  citations: PropTypes.array,
  page: PropTypes.object
};

export default RelatedActions;
