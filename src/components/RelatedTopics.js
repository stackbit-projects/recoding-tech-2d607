// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash';

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
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
      <Box my={4}>
        <Container>
          <Typography component="h2" variant="h3" gutterBottom>
            {title}
          </Typography>
          <Container spacing={3}>
            {topics.map((topic, i) => (
                  <Chip
                    key={i}
                    label={topic.name}
                    component="a"
                    href={`/${topic.type}/${topic.name}`}
                    className={classes.chip}
                    clickable
                  />
                ))}
          </Container>
        </Container>
      </Box>
    </section>
  );
};

Topics.propTypes = {
  section: PropTypes.object
};

export default Topics;
