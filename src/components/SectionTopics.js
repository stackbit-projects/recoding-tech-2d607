// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(theme => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
}));

const SectionTopics = props => {
  const classes = useStyles();
  const { section } = props;
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    if (Array.isArray(section.featuredTopics) && section.featuredTopics.length ) {
      setTopics(section.featuredTopics.filter(topic => topic.type));
    }
  }, []);

  useEffect(() => {}, [topics]);

  return (
    <section>
      <Box my={4}>
        <Container>
          <Typography component="h2" variant="h3" gutterBottom>
            Featured Topics
          </Typography>
          <Stack direction="row" spacing={3}>
            {topics
              ? topics.map((topic, i) => (
                  <Chip
                    key={i}
                    label={topic.name}
                    component="a"
                    href={`/${topic.type}/${topic.name}`}
                    className={classes.chip}
                    clickable
                  />
                ))
              : null}
          </Stack>
        </Container>
      </Box>
    </section>
  );
};

SectionTopics.propTypes = {
  section: PropTypes.object
};

export default SectionTopics;
