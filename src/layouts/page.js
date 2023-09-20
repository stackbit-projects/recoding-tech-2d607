// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { markdownify } from "../utils";
import { useRouter } from "next/router";

// Material UI imports
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import components, { Layout } from "../components/index";

// components
import Sidebar from "../components/Sidebar";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
}

function format(crumb) {
  return crumb.split("-").join(" ");
}

const Page = (props) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const {
    page: { sidebar_content = {} },
  } = props;

  useEffect(() => {
    if (router) {
      setBreadcrumbs(router.query.slug);
    }
  }, [router]);

  useEffect(() => {}, [breadcrumbs]);

  return (
    <Layout {...props}>
      <Box mb={4}>
        <Container>
          <Box
            role="presentation"
            onClick={handleClick}
            sx={{ marginBottom: 6 }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Typography variant="body2" color="text.primary">
                home
              </Typography>
              {breadcrumbs && breadcrumbs.length
                ? breadcrumbs.map((crumb, index) => {
                    if (index == breadcrumbs.length - 1) {
                      return (
                        <Typography key={crumb} variant="body2" color="#FF0033">
                          {format(crumb)}
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography key={crumb} variant="body2" color="#FFF">
                          {format(crumb)}
                        </Typography>
                      );
                    }
                  })
                : null}
            </Breadcrumbs>
          </Box>
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={8}>
              <Typography
                component="div"
                className="html-to-react html-to-react-page"
              >
                {markdownify(_.get(props, "page.body", null))}
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
