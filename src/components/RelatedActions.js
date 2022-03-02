// base imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
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
import useMediaQuery from "@mui/material/useMediaQuery";

// Material UI icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  em: {
    fontStyle: "italic",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    transition: "right 250ms",
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
      zIndex: "-1",
    },
    "&:hover": {
      "& a": {
        textDecoration: "underline",
      },
      "& svg": {
        right: 10,
        transition: "right 250ms",
      },
    },
  },
  tableLink: {
    color: "#000",
    position: "relative",
    textDecoration: "none",
  },
  title: {
    borderRight: "2px solid #000",
    paddingRight: 20,
  },
  trackerIcon: {
    left: 0,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  trackerLink: {
    color: "#000",
    fontStyle: "italic",
    paddingLeft: 40,
    position: "relative",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const RelatedActions = (props) => {
  const classes = useStyles();
  const { page, actions, loading } = props;

  const isMobile = useMediaQuery("(max-width:1064px)");

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Government" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" },
  ];

  // table pagination
  const [current, setCurrent] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrent(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrent(0);
  };

  return loading ? (
    <section>
      <Grid container item justifyContent="center">
        <CircularProgress />
      </Grid>
    </section>
  ) : Array.isArray(actions) && actions.length ? (
    <section>
      <Grid
        container
        item
        justifyContent="space-between"
        className={classes.gridTitle}
      >
        <Grid container spacing={2} item xs={12} md={11}>
          <Grid item>
            <Typography component="h2" variant="h4" className={classes.title}>
              Law & Regulation Tracker
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="body1" className={classes.em}>
              The latest cases, laws, and regulations related to{" "}
              {page.displayTitle ? page.displayTitle : page.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography component="div" variant="h4">
            <Link href="/tracker" className={classes.link}>
              View all
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Box my={4} sx={{ borderTop: "1px solid #000" }}>
        {isMobile ? (
          actions
            .sort((a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate))
            .reverse()
            .slice(current * rowsPerPage, current * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Accordion key={row._key} sx={{ marginBottom: 4 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`content-${row._key}`}
                  id={`header-${row._key}`}
                  sx={{
                    backgroundColor: "#EFE9DA",
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography component="div" variant="h4">
                    {row.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid
                      container
                      item
                      xs={12}
                      sx={{ mb: 2 }}
                      alignItems="center"
                    >
                      <Grid item>
                        <Link
                          href={`/tracker/${
                            typeof row.slug === "object"
                              ? row.slug.current
                              : row.slug
                          }`}
                          variant="body2"
                          sx={{ color: "#000" }}
                        >
                          View details
                        </Link>
                      </Grid>
                      <Grid item>
                        <KeyboardArrowRightIcon />
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography variant="h4">
                        Type
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "normal", }}
                      >
                        {row.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography variant="h4">
                        Government
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "normal", }}
                      >
                        {row.country.displayTitle}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography variant="h4">
                        Date Initiated
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{fontWeight: "normal",}}
                      >
                        {moment(new Date(row.dateInitiated)).strftime(
                          "%b %d, %Y"
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography variant="h4">
                        Status
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "normal",}}
                      >
                        {row.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography variant="h4">
                        Last Updated
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "normal", }}
                      >
                        {moment(new Date(row.lastUpdate)).strftime("%b %d, %Y")}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              aria-label="Law and Regulation Tracker Table"
              className={classes.table}
            >
              <TableHead>
                <TableRow>
                  {headers.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {actions
                  .sort(
                    (a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate)
                  )
                  .reverse()
                  .slice(
                    current * rowsPerPage,
                    current * rowsPerPage + rowsPerPage
                  )
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={
                          typeof row.slug === "object"
                            ? row.slug.current
                            : row.slug
                        }
                      >
                        {headers.map((column) => {
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
                              {column.id == "dateInitiated" ||
                              column.id == "lastUpdate" ? (
                                moment(new Date(value)).strftime("%b %d, %Y")
                              ) : column.id == "title" ? (
                                <Link
                                  className={classes.tableLink}
                                  href={`/tracker/${
                                    typeof row.slug === "object"
                                      ? row.slug.current
                                      : row.slug
                                  }`}
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
        )}
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
  actions: PropTypes.array,
  page: PropTypes.object,
  loading: PropTypes.bool,
};

export default RelatedActions;
