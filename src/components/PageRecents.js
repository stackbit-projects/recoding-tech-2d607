// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const PageRecents = (props) => {
  const { page } = props;
  const isMobile = useMediaQuery("(max-width:1064px)");

  return (
    <section>
      <Grid
        container
        alignItems={"flex-end"}
        justifyContent={"space-between"}
        sx={{
          borderBottom: "1px solid #8AA29D",
        }}
      >
        <Grid item>
          <Typography component={"div"} variant="h3">
            Latest on {page.displayName}
          </Typography>
        </Grid>
        <Grid item>
          <Link
            href="/search"
            sx={{
              height: 24,
              textDecoration: "none",
              width: 162,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                backgroundColor: "#FFE5EA",
                borderRadius: 2,
                color: "#FF0033",
                paddingX: "10px",
                paddingY: "6px",
              }}
            >
              View more
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        columnGap={6}
        direction="row"
        flexWrap={"wrap"}
        marginBottom={10}
        marginTop={2}
      >
        {page.relatedCommentary && page.relatedCommentary.length
          ? page.relatedCommentary.map((article) => (
              <Grid
                item
                key={article._id}
                sx={{
                  width: isMobile ? "100%" : "30%",
                }}
              >
                <Link
                  href={`/${article.slug.current}`}
                  sx={{
                    borderBottom: "1px solid",
                    borderBottomColor: "#EFE9DA",
                    display: "block",
                    paddingBottom: 2,
                    textDecoration: "none !important",
                  }}
                >
                  <Typography
                    component="div"
                    variant="body1"
                    sx={{
                      color: "#000 !important",
                      fontSize: "1em",
                      fontWeight: "700",
                      "&:hover": {
                        color: "#225C9D !important",
                        textDecoration: "none",
                      },
                    }}
                  >
                    {article.title}
                  </Typography>
                </Link>
              </Grid>
            ))
          : null}
      </Grid>
    </section>
  );
};

PageRecents.propTypes = {
  page: PropTypes.object,
};

export default PageRecents;
