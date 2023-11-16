// base imports
import React, { useEffect, useState } from "react";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const recentArticlesQuery = `*[_type == "post" && !(_id in path("drafts.**")) ]{title, date, slug}|order(date desc)[0...20]`;

const HomepageRecents = () => {
  const [articles, setArticles] = useState([]);
  const isMobile = useMediaQuery("(max-width:1064px)");

  useEffect(() => {
    client.fetch(recentArticlesQuery).then((recents) => {
      if (Array.isArray(recents) && recents.length) {
        setArticles(recents);
      }
    });
  }, []);

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
            Recent
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
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        columnGap={6}
        direction="row"
        alignItems={"center"}
        marginBottom={10}
        marginTop={2}
      >
        {articles && articles.length
          ? articles.map((article, index) => (
              <Grid
                item
                key={`${article._id}-${index}`}
                sx={{
                  marginTop: 2,
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

export default HomepageRecents;
