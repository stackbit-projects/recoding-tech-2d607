import React, { useState } from "react";
import moment from "moment-strftime";
import { titleCase } from "title-case";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
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
  table: {},
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
}));

function PolicyActionTable(props) {
  const classes = useStyles();
  const { actions, isHomepage } = props;

  const truncate = (title) =>
    title.length > 35 ? `${title.substring(0, 35)}...` : title;

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Gov't" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" },
  ];

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
      <TableContainer sx={{ maxHeight: isHomepage ? null : 440 }}>
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
            {actions
              .slice(current * rowsPerPage, current * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._key}>
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
                            column.id == "title" ? classes.tableCellTitle : null
                          }
                        >
                          {column.id == "dateInitiated" ||
                          column.id == "lastUpdate" ? (
                            <Typography component="div" variant="trackerRow">
                              {moment(new Date(value)).strftime("%b %d, %Y")}
                            </Typography>
                          ) : column.id == "title" ? (
                            <Typography component="div" variant="trackerTitle">
                              <Link
                                className={classes.tableLink}
                                href={`/tracker/${
                                  typeof row.slug === "object"
                                    ? row.slug.current
                                    : row.slug
                                }`}
                              >
                                {isHomepage
                                  ? titleCase(truncate(value))
                                  : titleCase(value)}
                              </Link>
                            </Typography>
                          ) : (
                            <Typography component="div" variant="trackerRow">
                              {value}
                            </Typography>
                          )}
                          {column.id == "title" ? (
                            <KeyboardArrowRightIcon className={classes.icon} />
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
      {!isHomepage && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={actions.length}
          rowsPerPage={rowsPerPage}
          page={current}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

PolicyActionTable.propTypes = {
  actions: PropTypes.array,
  isHomepage: PropTypes.bool,
};

export default PolicyActionTable;
