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

// material ui icons
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// images
import TrackerBackground from "../assets/tracker-bg.jpg";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "0.8em",
    textTransform: "uppercase",
    width: 180,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    transition: "right 250ms",
  },
  table: {
    backgroundColor: theme.palette.footer.main,
    maxHeight: null,
    padding: 20
  },
  tableCellTitle: {
    position: "relative",
    textTransform: "none",
    "&:after": {
      content: "''",
      display: "block",
      left: 0,
      height: "75%",
      minHeight: "80%",
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
  tableHeader: {
    borderBottom: "1px solid #000",
  },
  tableLink: {
    color: "#000",
    display: "block",
    position: "relative",
    textDecoration: "none",
    maxWidth: "85%",
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
      { id: "assetType", label: "Asset type FIXME" },
      { id: "country.displayTitle", label: "Gov't" },
    ])
    : (headers = [
      { id: "title", label: "Name" },
      { id: "type", label: "Type" },
      { id: "country.displayTitle", label: `Government` },
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
                  background: "#677975",
                  color: "#FFF",
                  left: "50%",
                  mixBlendMode: "multiply",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 448,
                }}
              >
                <Typography component="h2" variant="h2">
                  Law & Regulation Tracker
                </Typography>
                <Typography component="div" variant="body1">
                  We track existing and proposed laws and regulations, along with
                  government investigations and litigation from across the U.S.
                  and Europe, that will shape the rules and accountability for Big
                  Tech.
                </Typography>
                <Button>See all</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer className={classes.table}>
              <Table aria-label="Law and Regulation Tracker Table" >
                <TableHead>
                  <TableRow>
                    {headers.map((column) => (
                      <TableCell key={column.id} className={classes.tableHeader}>
                        <Typography component="div" variant={"tableHeaderHome"}>
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
                                width={column.id == "title" && "350px"}
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
                                    {DateTime.fromISO(value).toLocaleString(
                                      DateTime.DATE_MED
                                    )}
                                  </Typography>
                                ) : column.id == "title" ? (
                                  <Typography
                                    component="div"
                                    variant={"trackerTitleHome"}
                                  >
                                    <Link
                                      className={classes.tableLink}
                                      href={`/tracker/${typeof row.slug === "object"
                                          ? row.slug.current
                                          : row.slug
                                        }`}
                                    >
                                      {titleCase(truncate(value))}
                                    </Link>
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
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              aria-label="Law and Regulation Tracker Table"
              className={classes.table}
            >
              <TableHead>
                <TableRow>
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
                              width={column.id == "title" && null}
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
                                  {DateTime.fromISO(value).toLocaleString(
                                    DateTime.DATE_MED
                                  )}
                                </Typography>
                              ) : column.id == "title" ? (
                                <Typography
                                  component="div"
                                  variant={"trackerTitle"}
                                >
                                  <Link
                                    className={classes.tableLink}
                                    href={`/tracker/${typeof row.slug === "object"
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
