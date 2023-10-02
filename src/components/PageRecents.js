// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ComposedLink from "./NextLinkComposed";
import Typography from "@mui/material/Typography";

const PageRecents = (props) => {
  const { page, readings } = props;
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
          <ComposedLink
            href={{
              pathname: "/search",
              query: { filter: page.__metadata.id },
            }}
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
                borderRadius: "2px",
                color: "#FF0033",
                fontWeight: 500,
                paddingX: "10px",
                paddingY: "6px",
                "&:active, & :focus, &:hover": {
                  color: "#FF0033",
                  textDecoration: "underline",
                },
              }}
            >
              View more
            </Typography>
          </ComposedLink>
        </Grid>
      </Grid>
      <Grid
        container
        columnGap={4}
        alignItems={"center"}
        marginBottom={10}
        marginTop={2}
      >
        {readings && readings.length
          ? readings.map((article) => (
              <Grid
                item
                key={article._id}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  borderBottom: "1px solid",
                  borderBottomColor: "#EFE9DA",
                  maxWidth: isMobile ? "100%" : "30% !important",
                  paddingBottom: 2,
                  paddingTop: 2,
                }}
              >
                <Link
                  href={`/${article.slug.current}`}
                  sx={{
                    textDecoration: "none !important",
                  }}
                >
                  <Typography
                    component="span"
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
  readings: PropTypes.array,
};

export default PageRecents;
