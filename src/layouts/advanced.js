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
import SectionHero from "../components/SectionHero";
import SectionCitations from "../components/SectionCitations";

const useStyles = makeStyles(() => ({
  subscribe: {
    border: "1px solid #000",
    borderRadius: 0,
    fontSize: "0.8em",
    fontWeight: "normal",
    textTransform: "uppercase",
    "&:active, &:focus, &:hover": {
      backgroundColor: "#000",
      border: "1px solid #fff",
      color: "#fff",
    },
  },
}));

const Advanced = (props) => {
  const classes = useStyles();

  const { path } = props;

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Container>
        {path === "/" ? (
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
              <Grid item xs={12} sm={12} mt={2}>
                <Box sx={{ p: 4, bgcolor: "#EFE9DA", textAlign: "center" }}>
                  <Typography
                    component="div"
                    variant="supertitle"
                    alignItems={"center"}
                  >
                    Our Monthly update on Gov’t Policy And the latest News and
                    Research
                  </Typography>
                  <Typography component="div" mb={2}>
                    Recoding.Tech Newsletter
                  </Typography>
                  <Button
                    href="https://news.recoding.tech/"
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="outlined"
                    className={classes.subscribe}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <SectionCitations />
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <SectionGuides />
              </Grid> */}
          </Grid>
        ) : (
          _.map(_.get(props, "page.sections", null), (section, section_idx) => {
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
          })
        )}
      </Container>
    </Layout>
  );
};

Advanced.propTypes = {
  citations: PropTypes.array,
  path: PropTypes.string,
};

export default Advanced;
