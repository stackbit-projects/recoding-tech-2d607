import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { titleCase } from "title-case";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// images
import TrackerBackground from "../assets/tracker-bg.jpg";

const useStyles = makeStyles((theme) => ({
  author: {
    fontStyle: "italic",
    marginTop: 50,
    position: "relative",
    textAlign: "center",
    zIndex: 1,
  },
  link: {
    color: theme.typography.link.color,
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "relative",
    zIndex: 1,
  },
  links: {
    marginTop: 40,
    textAlign: "center",
  },
  superTitle: {
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  svg: {
    height: 250,
    left: "50%",
    position: "absolute",
    top: "40%",
    transform: "translate(-50%, -50%)",
    width: 650,
    zIndex: 0,
  },

  title: {
    position: "relative",
    zIndex: 1,
  },
}));

function format(crumb) {
  return titleCase(crumb.split("-").join(" "));
}

function SectionHero(props) {
  const router = useRouter();
  const classes = useStyles();
  let { page } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (router) {
      setBreadcrumbs(router.query.slug);
    }
  }, [router]);

  useEffect(() => {}, [breadcrumbs]);

  return (
    <section id={page.__metadata.id} className="block block-hero">
      <Box
        sx={{
          backgroundImage: `url(${TrackerBackground.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          paddingBottom: 12,
          paddingTop: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            color: "#FFF",
            "&:before": {
              background: "#427569",
              content: "''",
              height: "100%",
              left: 0,
              mixBlendMode: "multiply",
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: 0,
            },
          }}
        >
          <Container maxWidth={"xl"} sx={{ position: "relative", zIndex: 1 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              color="#FFF"
            >
              <Typography component="span" variant="body2" color="#FFF">
                Home
              </Typography>
              {breadcrumbs.length
                ? breadcrumbs.map((crumb) => (
                    <Typography
                      key={crumb}
                      variant="body2"
                      color="#FFF"
                      component="span"
                    >
                      {format(crumb)}
                    </Typography>
                  ))
                : null}
            </Breadcrumbs>
          </Container>
          <Container
            maxWidth="sm"
            sx={{ marginTop: 4, position: "relative", zIndex: 1 }}
          >
            {(page.displayName || page.heroContent || page.title) && (
              <Typography variant="h1" className={classes.title}>
                {titleCase(page.title)}
              </Typography>
            )}
          </Container>
          <Container
            maxWidth="md"
            sx={{
              marginTop: 3,
              position: "relative",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            <Typography component="div" variant="body2" sx={{ lineHeight: 2 }}>
              {page.heroContent}
            </Typography>
          </Container>
        </Box>
      </Box>
    </section>
  );
}

SectionHero.propTypes = {
  page: PropTypes.object,
};

export default SectionHero;
