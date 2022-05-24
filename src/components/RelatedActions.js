// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// components
import PolicyActionTable from "./PolicyActionTable";
import PolicyActionMobile from "./PolicyActionMobile";

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic",
    textAlign: "center",
  },
  title: {
    borderRight: "2px solid #000",
    paddingRight: 20,
  },
}));

const RelatedActions = (props) => {
  const classes = useStyles();
  const { page, actions, loading } = props;

  const isMobile = useMediaQuery("(max-width:1064px)");

  return loading ? (
    <section>
      <Grid container item justifyContent="center">
        <CircularProgress />
      </Grid>
    </section>
  ) : Array.isArray(actions) && actions.length ? (
    <section>
      <Grid container item justifyContent="space-between">
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
          <PolicyActionMobile actions={actions} isHomepage={false} />
        ) : (
          <PolicyActionTable actions={actions} isHomepage={false} />
        )}
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
