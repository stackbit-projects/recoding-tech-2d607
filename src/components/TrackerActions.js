// base imports
import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { titleCase } from "title-case";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// Material UI icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles(() => ({
  icon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    transition: "right 250ms",
  },
  tableCellTitle: {
    minWidth: 150,
    maxWidth: 200,
    position: "relative",
    textTransform: "none",
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
  trackerIcon: {
    color: "#FF0033",
    left: 0,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  trackerLink: {
    color: "#000",
    fontWeight: 500,
    paddingLeft: 40,
    position: "relative",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const TrackerActions = (props) => {
  const classes = useStyles();
  const { page } = props;

  const isMobile = useMediaQuery("(max-width:1064px)");

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Government" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" },
  ];

  return (
    <>
      <Typography variant="body2" gutterBottom>
        <Link href="/tracker" className={classes.trackerLink}>
          <ArrowBackIcon className={classes.trackerIcon} />
          Return to law & regulation tracker
        </Link>
      </Typography>
      {isMobile ? (
        <Accordion sx={{ marginBottom: 4 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`content-${page._key}`}
            id={`header-${page._key}`}
            sx={{
              backgroundColor: "#EFE9DA",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Typography component="div" variant="h4">
              {titleCase(page.title)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography variant="h4">Type</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {page.type}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4">Government</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {page.country.displayTitle}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4">Date Initiated</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {DateTime.fromISO(page.dateInitiated).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4">Status</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {page.status}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4">Last Updated</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
              >
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {page.lastUpdate
                    ? DateTime.fromISO(page.lastUpdate).toLocaleString(
                        DateTime.DATE_MED
                      )
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            aria-label="Law and Regulation Tracker Table"
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                {headers.map((column) => (
                  <TableCell key={column.id}>
                    <Typography component="div" variant="tableHeader">
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell className={classes.tableCellTitle}>
                  <Typography component="div" variant="trackerTitle">
                    {titleCase(page.title)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div" variant="trackerRow">
                    {page.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div" variant="trackerRow">
                    {page.country ? page.country.displayTitle : ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div" variant="trackerRow">
                    {DateTime.fromISO(page.dateInitiated).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div" variant="trackerRow">
                    {page.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div" variant="trackerRow">
                    {page.lastUpdate
                      ? DateTime.fromISO(page.lastUpdate).toLocaleString(
                          DateTime.DATE_MED
                        )
                      : ""}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

TrackerActions.propTypes = {
  page: PropTypes.object,
};

export default TrackerActions;
