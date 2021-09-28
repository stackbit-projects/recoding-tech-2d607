// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// Material UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// components
import components, { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import SectionCitations from "../components/SectionCitations";

function Advanced(props) {
  const { citations } = props;

  return (
    <Layout {...props}>
      <SectionHero {...props} />
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
          <Grid item xs={12} sm={4}>
            <SectionCitations citations={citations} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

Advanced.propTypes = {
  citations: PropTypes.array
};

export default Advanced;
