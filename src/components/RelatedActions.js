// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// components
import PolicyActionTableBlock from "./PolicyActionTableBlock";
import PolicyActionMobile from "./PolicyActionMobile";

const RelatedActions = (props) => {
  const { actions, loading } = props;

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
            <Typography component="h2" variant="h4">
              Law & Regulation Tracker
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1}>
          <Link
            href="/tracker"
            sx={{
              height: 24,
              textAlign: "center",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                backgroundColor: "#FFE5EA",
                borderRadius: "2px",
                color: "#FF0033",
                fontWeight: 500,
                paddingX: "10px",
                paddingY: "6px",
              }}
            >
              See all
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Box my={4} sx={{ borderTop: "1px solid #000" }}>
        {isMobile ? (
          <PolicyActionMobile actions={actions} isHomepage={false} />
        ) : (
          <PolicyActionTableBlock actions={actions} isHomepage={false} />
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
