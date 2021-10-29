// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash';

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
}));

const Topics = props => {
  const { topics } = props;
  if (!Array.isArray(topics) || !topics.length) return null;
  const classes = useStyles();

  const title = _.get(props, 'title', 'Related Topics');

  return (
    <section>
      <Grid container className={classes.grid}>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              {title}
            </Typography>
          </Grid>
          <Box my={4} pt={8} sx={{ borderTop: "1px solid #000" }}>
            <Container spacing={3}>
              {topics.map((topic, i) => (
                    <Chip
                      key={i}
                      label={topic.name}
                      component="a"
                      href={`/${topic.type}/${topic.slug}`}
                      className={classes.chip}
                      clickable
                    />
                  ))}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

Topics.propTypes = {
  section: PropTypes.object
};

export default Topics;
