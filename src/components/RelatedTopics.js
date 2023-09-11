// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

const Topics = (props) => {
  const classes = useStyles();
  const { topics } = props;

  if (!Array.isArray(topics) || !topics.length) return null;

  const title = _.get(props, "label", "Topics");

  return (
    <section>
      <Grid container>
        <Grid container item justifyContent="space-between">
          <Grid item xs={12}>
            <Typography component="h2" variant="h4">
              {title}
            </Typography>
          </Grid>
          <Box
            mb={4}
            pt={2}
            sx={{ borderTop: "1px solid #8AA29D", width: "100%" }}
          >
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {topics.map((topic, i) => (
                <Chip
                  key={i}
                  label={topic.displayTitle || topic.name}
                  style={{
                    backgroundColor: "#EFE9DA",
                    fontWeight: 300,
                    textTransform: "none",
                  }}
                  component="a"
                  className={classes.chip}
                  href={`/category/${
                    typeof topic.slug == "string"
                      ? topic.slug
                      : topic.slug.current
                  }`}
                  clickable
                  sx={{ marginBottom: "6px !important" }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

Topics.propTypes = {
  section: PropTypes.object,
  topics: PropTypes.array,
};

export default Topics;
