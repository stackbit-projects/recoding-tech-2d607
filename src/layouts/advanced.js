// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import components, { Layout } from "../components/index";
import HomepageActions from "../components/HomepageActions";
import HomepageRecents from "../components/HomepageRecents";
import SectionHero from "../components/SectionHero";
import SectionHeroTracker from "../components/SectionHeroTracker";
import SectionRecentArticles from "../components/SectionRecentArticles";

// material ui icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles(() => ({
  subscribe: {
    borderRadius: 2,
    boxShadow: "none",
    color: "#fff",
    fontSize: "0.8em",
    fontWeight: "normal",
    textTransform: "uppercase",
    "&:active, &:focus, &:hover": {
      backgroundColor: "#000",
    },
  },
}));

const Advanced = (props) => {
  const classes = useStyles();

  const { path } = props;

  return (
    <Layout {...props}>
      <Box>
        {path === "/" ? (
          <>
            <Box
              sx={{
                p: 2,
                bgcolor: "#225C9D",
                color: "#F3F0E6",
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                variant="blurb"
                alignItems={"center"}
                pr={4}
              >
                Subscribe for our monthly update on Government Policy, Tech News
                and Research
              </Typography>
              <Button
                href="https://news.recoding.tech/"
                rel="noopener noreferrer"
                target="_blank"
                variant="contained"
                color="info"
                className={classes.subscribe}
              >
                Subscribe
                <ArrowForwardIosIcon sx={{ ml: 2, width: 12 }} />
              </Button>
            </Box>
            <Container>
              <Grid
                container
                spacing={4}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={8}>
                  {_.map(
                    _.get(props, "page.sections", null),
                    (section, section_idx) => {
                      let component = _.upperFirst(
                        _.camelCase(_.get(section, "type", null))
                      );
                      let Component = components[component];
                      return (
                        <Component
                          key={section_idx}
                          {...props}
                          section={section}
                          site={props}
                        />
                      );
                    }
                  )}
                </Grid>
                <Grid container item xs={12} sm={4}>
                  <Grid item>
                    <SectionRecentArticles />
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={8} mb={8}>
                <HomepageActions />
              </Box>
              <Box mt={8} mb={10}>
                <HomepageRecents />
              </Box>
            </Container>
          </>
        ) : (
          <>
            {path === "/tracker" ? (
              <SectionHeroTracker {...props} />
            ) : (
              <SectionHero {...props} />
            )}
            <Container>
              {_.map(
                _.get(props, "page.sections", null),
                (section, section_idx) => {
                  let component = _.upperFirst(
                    _.camelCase(_.get(section, "type", null))
                  );
                  let Component = components[component];
                  return (
                    <Component
                      key={section_idx}
                      {...props}
                      section={section}
                      site={props}
                    />
                  );
                }
              )}
            </Container>
          </>
        )}
      </Box>
    </Layout>
  );
};

Advanced.propTypes = {
  citations: PropTypes.array,
  path: PropTypes.string,
};

export default Advanced;
