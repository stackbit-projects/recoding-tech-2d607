// base imports
import React from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "13px",
    fontWeight: 600,
    display: "flex",
    flexDirection: "column",
    "&>:first-child:hover": {
      textDecoration: "underline",
    },
    "&:not(:last-child)": {
      borderBottom: "1px solid #E2D7BB77",
      paddingBottom: "10px",
    },
  },
}));

const RelatedArticles = (props) => {
  const classes = useStyles();
  const { articles } = props;

  if (!Array.isArray(articles) || !articles.length) return null;

  return (
    <section>
      <Grid container>
        <Grid container item justifyContent="space-between">
          <Grid item xs={12}>
            <Typography component="h2" variant="h4">
              Related
            </Typography>
          </Grid>
          <Box
            mb={4}
            pt={2}
            sx={{ borderTop: "1px solid #8AA29D", width: "100%" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {articles.map((article, i) => (
                <div key={i} className={classes.title}>
                  <Link
                    href={`/${article.slug.current}`}
                    sx={{ textDecoration: "none" }}
                  >
                    {article.title}
                  </Link>
                </div>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

RelatedArticles.propTypes = {
  section: PropTypes.object,
  articles: PropTypes.array,
};

export default RelatedArticles;
