// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
  em: {
    fontStyle: "italic",
    textAlign: "center"
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
  const { page, actions } = props;
  const [related, setRelated] = React.useState(null);

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Country" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" }
  ];

  useEffect(() => {
    const relatedActions = actions.filter(action => {
      if (Array.isArray(action.relatedTopics) && action.relatedTopics.length) {
        return action.relatedTopics.findIndex(topic => topic.name === page.name) >= 0
      } else return false;
    });
    console.log('actions:', relatedActions);
    setRelated(relatedActions);
  }, []);

  // table pagination
  const [current, setCurrent] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrent(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setCurrent(0);
  };

  return Array.isArray(related) && related.length ? (
    <section>
      <Grid
        container
        item
        justifyContent="space-between"
        className={classes.gridTitle}
      >
        <Grid item xs>
          <Typography component="h2" variant="h4" className={classes.title} >
            Law & Regulation Tracker |
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            component="div"
            variant="body1"
            className={classes.em}
          >
            The latest cases, laws, and regulations related to {page.displayTitle ? page.displayTitle : page.name}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography component="div" variant="h4">
            <Link href="/tracker" className={classes.link}>
              View all
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Box my={4} sx={{ borderTop: "1px solid #000" }}>
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
              {related
                .slice(current * rowsPerPage, current * rowsPerPage + rowsPerPage)
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
                                href={`/tracker/${row.slug}`}
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={actions.length}
          rowsPerPage={rowsPerPage}
          page={current}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </section>
    ) : null;
};

RelatedActions.propTypes = {
  citations: PropTypes.array,
  page: PropTypes.object
};

export default RelatedActions;
