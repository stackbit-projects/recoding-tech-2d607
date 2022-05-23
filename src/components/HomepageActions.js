// base imports
import React, { useEffect, useState } from "react";
import moment from "moment-strftime";
import { titleCase } from "title-case";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
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
    position: "relative",
    textTransform: "none",
    "&:after": {
      backgroundColor: theme.palette.footer.main,
      content: "''",
      display: "block",
      left: 0,
      height: "75%",
      // minHeight: 40,
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
    display: "block",
    position: "relative",
    textDecoration: "none",
    maxWidth: "85%",
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

const policyActionsQuery = `*[_type == "policy_action" && !(_id match "drafts")]{category, country->{_key, displayTitle, name, slug}, dateInitiated,
                            lastUpdate, _id,
                            slug, status, title,
                            relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)[0...4]`;

const HomepageActions = () => {
  const classes = useStyles();
  const [actions, setActions] = useState([]);

  const isMobile = useMediaQuery("(max-width:1064px)");

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Gov't" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" },
  ];

  const truncate = (title) =>
    title.length > 35 ? `${title.substring(0, 35)}...` : title;

  useEffect(() => {
    client.fetch(policyActionsQuery).then((actions) => {
      if (Array.isArray(actions) && actions.length) {
        setActions(actions);
      }
    });
  }, []);

  return Array.isArray(actions) && actions.length ? (
    <section>
      <Grid
        container
        item
        justifyContent="space-between"
        className={classes.gridTitle}
      ></Grid>
      <Box my={1}>
        {isMobile ? (
          actions.map((row) => (
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
                  <Grid
                    item
                    xs={6}
                    sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                  >
                    <Typography variant="h4">Type</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                      {row.type}
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
                      {row.country.displayTitle}
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
                      {row.status}
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
                      {moment(new Date(row.lastUpdate)).strftime("%b %d, %Y")}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <TableContainer>
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
                {actions.map((row) => {
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
                              <Typography
                                component="div"
                                variant="trackerTitle"
                              >
                                <Link
                                  className={classes.tableLink}
                                  href={`/tracker/${
                                    typeof row.slug === "object"
                                      ? row.slug.current
                                      : row.slug
                                  }`}
                                >
                                  {titleCase(truncate(value))}
                                </Link>
                              </Typography>
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
      </Box>
    </section>
  ) : null;
};

export default HomepageActions;
