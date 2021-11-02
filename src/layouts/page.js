// base imports
import React from "react";
import _ from "lodash";
import { Layout } from "../components/index";
import { markdownify } from "../utils";

// Material UI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import SectionHero from "../components/SectionHero";
import Sidebar from "../components/Sidebar";


const Page = props => {
  const {
    page: { sidebar_content = {} },
  } = props;
  
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
            <div className="post-content inner-sm">
              <Typography>
                {markdownify(_.get(props, "page.content", null))}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            {sidebar_content.length ? <Sidebar content={sidebar_content}/> : null}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Page;
