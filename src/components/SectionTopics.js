// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// components
import FancyTitle from "./FancyTitle";

const useStyles = makeStyles((theme) => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  em: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: "0.9em",
  },
  title: {
    borderRight: "2px solid #000",
    paddingRight: 20,
  },
}));

const SectionTopics = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { section } = props;
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    if (
      Array.isArray(section.featuredTopics) &&
      section.featuredTopics.length
    ) {
      setTopics(section.featuredTopics.filter((topic) => topic.displayName));
    }
  }, []);

  useEffect(() => {}, [topics]);

  return (
    <section>
      <Container>
        <Box my={4} mb={10}>
          <FancyTitle
            title="Featured Topics"
            subtitle="New issues, policies, governments, and companies we’re covering"
          />
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {topics
              ? topics.map((topic, i) => (
                  <Chip
                    key={i}
                    label={topic.displayName || topic.name}
                    sx={{ marginBottom: "6px !important" }}
                    component="a"
                    href={`/${topic.type}/${
                      typeof topic.slug == "string"
                        ? topic.slug
                        : typeof topic.slug == "object"
                        ? topic.slug.current
                        : topic.name
                    }`}
                    className={classes.chip}
                    style={{
                      backgroundColor:
                        topic.type && theme.palette[topic.type]
                          ? theme.palette[topic.type].main
                          : theme.palette.secondary.main,
                    }}
                    clickable
                  />
                ))
              : null}
          </Stack>
        </Box>
      </Container>
    </section>
  );
};

SectionTopics.propTypes = {
  section: PropTypes.object,
};

export default SectionTopics;
