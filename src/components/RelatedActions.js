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
      <Box my={4}>
        {isMobile ? (
          <PolicyActionMobile actions={actions} isHomepage={false} />
        ) : (
          <>
            <Grid
              container
              item
              justifyContent={"space-between"}
              sx={{
                borderBottom: "1px solid #8AA29D",
              }}
            >
              <Grid container spacing={2} item xs={12} md={11}>
                <Grid item>
                  <Typography component={"div"} variant="h3">
                    Policy Tracker
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={1}>
                <Link
                  href="/tracker"
                  sx={{
                    height: 24,
                    textAlign: "center",
                    width: 162,
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
                      "&:active, & :focus, &:hover": {
                        color: "#FF0033",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    See all
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <PolicyActionTableBlock actions={actions} isHomepage={false} />
          </>
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
