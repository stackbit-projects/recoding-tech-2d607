import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";

// utils
import { htmlToReact, urlFor } from "../utils";

const Author = (props) => {
  const { page } = props;

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Container marginBottom={4} maxWidth="md">
        <Box
          marginBottom={4}
          paddingBottom={4}
          sx={{ borderBottom: "1px solid #8AA29D" }}
        >
          <Grid container>
            <Grid item xs={3}>
              {page.photo && (
                <Image
                  src={urlFor(page.photo.url).width(144).url()}
                  height={144}
                  width={144}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              )}
            </Grid>
            <Grid item xs={9}>
              {page.bio && (
                <Typography component="div" variant="body2">
                  {htmlToReact(page.bio)}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

Author.propTypes = {
  page: PropTypes.object,
};

export default Author;
