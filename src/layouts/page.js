// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import components, { Layout } from "../components/index";

// components
import Sidebar from "../components/Sidebar";
import { CustomPortableText } from "../components/PortableText";

const Page = (props) => {
  const {
    page: { sidebar_content = {} },
  } = props;

  return (
    <Layout {...props}>
      <Box mb={4}>
        <Container>
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{ marginTop: 0 }}
          >
            <Grid item xs={12} sm={8}>
              <Typography
                component="div"
                className="html-to-react html-to-react-page"
              >
                <CustomPortableText value={_.get(props, "page.body", null)} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {sidebar_content && sidebar_content.length ? (
                <Sidebar content={sidebar_content} />
              ) : null}
            </Grid>
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
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Page.propTypes = {
  page: PropTypes.object,
};

export default Page;
