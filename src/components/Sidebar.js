import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// material ui imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import { urlFor } from "../utils";

const Sidebar = (props) => {
  const { content } = props;
  const defineSrc = (photoSrc) => {
    return urlFor(photoSrc).url() || "";
  };

  return (
    <section>
      <Container>
        {content[0].type == "sidebar_about" && (
          <>
            <Typography
              component="h2"
              variant="h4"
              borderBottom="1px solid #000"
              paddingBottom={2}
            >
              Staff
            </Typography>
            {content[0].staff &&
              content[0].staff.length &&
              content[0].staff.map((author) => (
                <Grid
                  container
                  item
                  key={author.slug.current}
                  spacing={2}
                  xs={12}
                  marginBottom={4}
                >
                  {author.photo && (
                    <Grid item xs={3}>
                      <Image
                        src={defineSrc(author.photo)}
                        height={80}
                        width={80}
                        alt=""
                        style={{ borderRadius: 50 }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={author.photo ? 9 : 12}>
                    <Link
                      href={`/author/${author.slug.current}`}
                      sx={{
                        textDecoration: "none",
                        "&:active, &:focus, &:hover": {
                          color: "#000",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
                      >
                        {author.name}
                      </Typography>
                    </Link>
                    {author.specialTitle && (
                      <Typography
                        color="rgba(0,0,0,0.48)"
                        component="div"
                        variant="body2"
                      >
                        {author.specialTitle}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ))}
            <Typography
              component="h2"
              variant="h4"
              borderBottom="1px solid #000"
              paddingBottom={2}
            >
              Board of directors
            </Typography>
            {content[0].board &&
              content[0].board.length &&
              content[0].board.map((author) => (
                <Grid
                  container
                  item
                  key={author.slug.current}
                  spacing={2}
                  xs={12}
                  marginBottom={4}
                >
                  {author.photo && (
                    <Grid item xs={3}>
                      <Image
                        src={urlFor(author.photo).width(80).url()}
                        height={80}
                        width={80}
                        alt=""
                        style={{ borderRadius: 50 }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={author.photo ? 9 : 12}>
                    <Link
                      href={`/author/${author.slug.current}`}
                      sx={{
                        textDecoration: "none",
                        "&:active, &:focus, &:hover": {
                          color: "#000",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
                      >
                        {author.name}
                      </Typography>
                    </Link>
                    {author.specialTitle && (
                      <Typography
                        color="rgba(0,0,0,0.48)"
                        component="div"
                        variant="body2"
                      >
                        {author.specialTitle}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ))}
            <Typography
              component="h2"
              variant="h4"
              borderBottom="1px solid #000"
              paddingBottom={2}
            >
              Masthead
            </Typography>
            {content[0].masthead &&
              content[0].masthead.length &&
              content[0].masthead.map((author) => (
                <Grid
                  container
                  item
                  key={author.slug.current}
                  spacing={2}
                  xs={12}
                  marginBottom={4}
                >
                  {author.photo && (
                    <Grid item xs={3}>
                      <Image
                        src={urlFor(author.photo).width(80).url()}
                        height={80}
                        width={80}
                        alt=""
                        style={{ borderRadius: 50 }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={author.photo ? 9 : 12}>
                    <Link
                      href={`/author/${author.slug.current}`}
                      sx={{
                        textDecoration: "none",
                        "&:active, &:focus, &:hover": {
                          color: "#000",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
                      >
                        {author.name}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              ))}
          </>
        )}
      </Container>
    </section>
  );
};

Sidebar.propTypes = {
  content: PropTypes.array,
};

export default Sidebar;
