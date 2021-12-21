// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// material ui imports
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Topics = props => {
  const { topics } = props;

  if (!Array.isArray(topics) || !topics.length) return null;

  const title = _.get(props, "title", "Related Topics");

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
            sx={{ borderTop: "1px solid #000", width: "100%" }}
          >
            <Stack direction="row" spacing={1}>
              {topics.map((topic, i) => (
                <Chip
                  key={i}
                  label={topic.name}
                  color={topic.type == "issue" ? "issue" : "policy"}
                  component="a"
                  href={`/${topic.type}/${typeof topic.slug === 'string' ? topic.slug : topic.slug.current}`}
                  clickable
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
  topics: PropTypes.array
};

export default Topics;
