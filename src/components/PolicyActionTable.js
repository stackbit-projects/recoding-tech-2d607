import React, { useState } from "react";
import { DateTime } from "luxon";
import { titleCase } from "title-case";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// images
import TrackerBackground from "../assets/tracker-bg.jpg";

const useStyles = makeStyles(() => ({
  button: {
    fontSize: "0.8em",
    textTransform: "uppercase",
    width: 180,
  },
  tableCellTitle: {
    position: "relative",
    textTransform: "none",
  },
  tableLink: {
    color: "#000",
    display: "block",
    position: "relative",
    textDecoration: "none",
    // maxWidth: "85%",
  },
}));

function PolicyActionTable(props) {
  const classes = useStyles();
  const { actions, isHomepage } = props;

  const truncate = (title) =>
    title.length > 62 ? `${title.substring(0, 62)}...` : title;

  let headers;

  isHomepage
    ? (headers = [
        { id: "title", label: "Name" },
        { id: "type", label: "Type" },
        { id: "country", label: "Gov't" },
      ])
    : (headers = [
        { id: "title", label: "Name" },
        { id: "type", label: "Type" },
        { id: "country", label: `Government` },
        { id: "dateInitiated", label: "Date Initiated" },
        { id: "status", label: "Status" },
        { id: "lastUpdate", label: "Last Updated" },
      ]);

  // PAGINATION
  const [current, setCurrent] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrent(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrent(0);
  };

  return (
    <>
      {isHomepage ? (
        <Grid container alignItems={"stretch"}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: `url(${TrackerBackground.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
                position: "relative",
              }}
            >
              <Box
                px={4}
                py={6}
                sx={{
                  backgroundImage: `url(${TrackerBackground.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 17%",
                  backgroundSize: "112%",
                  left: "50%",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 448,
                  "&:before": {
                    background: "#427569",
                    content: "''",
                    height: "100%",
                    left: 0,
                    mixBlendMode: "multiply",
                    position: "absolute",
                    top: 0,
                    width: "100%",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#F3F0E6",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h2"
                    sx={{ marginBottom: 1, textTransform: "uppercase" }}
                  >
                    Policy Tracker
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{ fontWeight: 400 }}
                  >
                    We track existing and proposed laws and regulations, along
                    with government investigations and litigation from across
                    the U.S. and Europe, that will shape the rules and
                    accountability for Big Tech.
                  </Typography>
                  <Button
                    href="/tracker"
                    variant="contained"
                    color="fourth"
                    sx={{
                      borderRadius: "2px",
                      color: "#FFF",
                      fontSize: 14,
                      marginTop: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    See all
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer
              sx={{
                backgroundColor: isHomepage
                  ? "rgba(243,240,230, 0.5) "
                  : "#FFF",
                paddingLeft: 2,
              }}
            >
              <Table aria-label="Policy Tracker Table">
                <TableHead
                  sx={{
                    "&:active, &:focus, &:hover": {
                      backgroundColor: isHomepage
                        ? "#f9f7f2 !important"
                        : "#FFF !important",
                    },
                  }}
                >
                  <TableRow
                    sx={{
                      "&:active, &:focus, &:hover": {
                        backgroundColor: isHomepage
                          ? "#f9f7f2 !important"
                          : "#FFF !important",
                      },
                    }}
                  >
                    {headers.map((column) => (
                      <TableCell key={column.id}>
                        <Typography component="div" variant={"tableHeaderHome"}>
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
                        key={row._id}
                      >
                        {headers.map((column) => {
                          let value = row[column.id];
                          // if (!value) {
                          //   if (row.country) {
                          //     value = row.country; // #FIXME
                          //   } else {
                          //     value = row.type;
                          //   }
                          // }
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
                                <Typography
                                  component="div"
                                  variant={"trackerRowHome"}
                                >
                                  {value
                                    ? DateTime.fromISO(value).toLocaleString(
                                        DateTime.DATE_MED
                                      )
                                    : !row.lastUpdate && row.dateInitiated
                                    ? DateTime.fromISO(
                                        row.dateInitiated
                                      ).toLocaleString(DateTime.DATE_MED)
                                    : ""}{" "}
                                  {/* if lastUpdate is blank, automatically just put in the dateInitiated */}
                                </Typography>
                              ) : column.id == "title" ? (
                                <Typography
                                  component="div"
                                  variant={"trackerTitleHome"}
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
                              ) : column.id == "type" ? (
                                <Typography
                                  component="div"
                                  variant={"trackerRowHome"}
                                >
                                  {row.type}
                                </Typography>
                              ) : (
                                <Typography
                                  component="div"
                                  variant={"trackerRowHome"}
                                >
                                  {value}
                                </Typography>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <>
          <TableContainer>
            <Table aria-label="Policy Tracker Table" className={classes.table}>
              <TableHead
                sx={{
                  "&:active, &:focus, &:hover": {
                    backgroundColor: isHomepage
                      ? "#f9f7f2 !important"
                      : "#FFF !important",
                  },
                }}
              >
                <TableRow
                  sx={{
                    "&:active, &:focus, &:hover": {
                      backgroundColor: isHomepage
                        ? "#f9f7f2 !important"
                        : "#FFF !important",
                    },
                  }}
                >
                  {headers.map((column) => (
                    <TableCell key={column.id}>
                      <Typography component="div" variant={`tableHeader`}>
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {actions
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
                        key={row._key}
                      >
                        {headers.map((column) => {
                          let value = row[column.id];
                          // if (!value) {
                          //   if (row.country) {
                          //     value = row.country; // #FIXME
                          //   } else {
                          //     value = "";
                          //   }
                          // }
                          return (
                            <TableCell
                              key={column.id}
                              width={
                                column.id == "title"
                                  ? 340
                                  : column.id == "status"
                                  ? 200
                                  : column.id == "dateInitiated"
                                  ? 150
                                  : 130
                              }
                              className={
                                column.id == "title"
                                  ? classes.tableCellTitle
                                  : null
                              }
                            >
                              {column.id == "dateInitiated" ||
                              column.id == "lastUpdate" ? (
                                <Typography
                                  component="div"
                                  variant={"trackerRow"}
                                >
                                  {value
                                    ? DateTime.fromISO(value).toLocaleString(
                                        DateTime.DATE_MED
                                      )
                                    : !row.lastUpdate && row.dateInitiated
                                    ? DateTime.fromISO(
                                        row.dateInitiated
                                      ).toLocaleString(DateTime.DATE_MED)
                                    : ""}{" "}
                                  {/* if lastUpdate is blank, automatically just put in the dateInitiated */}
                                </Typography>
                              ) : column.id == "title" ? (
                                <Typography
                                  component="div"
                                  variant={"trackerTitle"}
                                >
                                  <Link
                                    className={classes.tableLink}
                                    href={`/tracker/${
                                      typeof row.slug === "object"
                                        ? row.slug.current
                                        : row.slug
                                    }`}
                                  >
                                    {titleCase(value)}
                                  </Link>
                                </Typography>
                              ) : (
                                <Typography
                                  component="div"
                                  variant={"trackerRow"}
                                >
                                  {value}
                                </Typography>
                              )}
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
        </>
      )}
    </>
  );
}

PolicyActionTable.propTypes = {
  actions: PropTypes.array,
  isHomepage: PropTypes.bool,
};

export default PolicyActionTable;
