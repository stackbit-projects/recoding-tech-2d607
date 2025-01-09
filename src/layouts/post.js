import React from "react";
import { DateTime } from "luxon";
// import { useRouter } from "next/router";
import Image from "next/image";
import PropTypes from "prop-types";
// import _ from "lodash";
import { toPlainText } from "@portabletext/react";
import urlFor from "../utils/imageBuilder";
import { CustomPortableText } from "../components/PortableText";

// utils
// import { markdownify } from "../utils";
import slugify from "slugify";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedTopics from "../components/RelatedTopics";

// table of contents
import { PortableText } from "@portabletext/react";
import { ImageBlock } from "../components/PortableText/ImageBlock";
import RelatedArticles from "../components/RelatedArticles";
import NewsletterSubscribe from "../components/NewsletterSubscribe";

const slug = (heading) => {
  let slug = "";

  if (typeof heading === "string") {
    slug = `#${slugify(heading, {
      remove: /[*+~.()'"!:@?/]/g,
    })}`;
  }

  if (typeof heading === "object" && heading.props && heading.props.text) {
    slug = `#${slugify(heading.props.text, {
      remove: /[*+~.()'"!:@?/]/g,
    })}`;
  }

  return slug;
};

const ToCserializer = {
  block: {
    h1: ({ children }) => (
      <Grid item xs={12} sm={6} md={6} mt={0} mb={2}>
        <Typography component="div" marginLeft={1} variant="tocText">
          <Link
            href={slug(children[0])}
            sex={{
              textDecoration: "underline",
            }}
          >
            {children}
          </Link>
        </Typography>
      </Grid>
    ),
    h2: ({ children }) => (
      <Grid item xs={12} sm={6} md={6} mt={0} mb={2}>
        <Typography component="div" marginLeft={1} variant="tocText">
          <Link
            href={slug(children[0])}
            sex={{
              textDecoration: "underline",
            }}
          >
            {children}
          </Link>
        </Typography>
      </Grid>
    ),
    // ignore other block types
    h3: () => null,
    h4: () => null,
    image: () => null,
    iframeEmbed: () => null,
    file: () => null,
    normal: () => null,
    blockquote: () => null,
  },
  list: {
    bullet: () => null,
    number: () => null,
  },
};

const Post = (props) => {
  // const router = useRouter();
  const { page } = props;

  let body1 = null;
  let body2 = null;

  if (page.body && page.disableNewsletterSignup !== true) {
    // find the center of the page
    try {
      let center = Math.ceil(page.body.length / 2);
      while (
        ["number", "bullet"].includes(page.body[center]?.listItem) ||
        ["h2", "h3", "h4"].includes(page.body[center - 1]?.style)
      ) {
        const newCenter = Math.min(center + 1, page.body.length);
        if (center == newCenter) {
          break;
        }
        center = newCenter;
      }
      body1 = page.body.slice(0, center);
      body2 = page.body.slice(center);
    } catch (error) {
      // ignore
    }
  }

  return (
    <Layout {...props}>
      <Box my={6}>
        <Container>
          <Grid container spacing={8}>
            <Grid container spacing={4} item xs={12} md={8} direction="row">
              <Grid item>
                {/* <Typography component="div" className="html-to-react">
                  {markdownify(_.get(props, "page.content", null))}
                </Typography> */}
                <Typography
                  component="h1"
                  variant="h2_article"
                  sx={{ borderBottom: "1px solid #8AA29D", paddingBottom: 2 }}
                >
                  {page.title}
                </Typography>
                {page.authors &&
                  page.authors.length &&
                  page.authors.map((auth, index) => (
                    <Typography
                      key={auth.slug.current}
                      component="span"
                      variant="body2"
                      sx={{
                        color: "#616161",
                        fontSize: 12,
                        textTransform: "uppercase",
                      }}
                    >
                      {index == page.authors.length - 1
                        ? `${auth.name} / `
                        : `${auth.name}, `}
                    </Typography>
                  ))}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "#616161",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {DateTime.fromISO(page.date)
                    .setLocale("en-us")
                    .toLocaleString(DateTime.DATE_MED)}
                </Typography>
                {/* {page.toc && (
                  // <Grid item xs={12} sm={12} mt={2}>
                  //   <Box
                  //     sx={{
                  //       p: 2,
                  //       bgcolor: "#F3F0E699",
                  //     }}
                  //   >
                  //     <Typography
                  //       component="div"
                  //       variant="h4"
                  //       sx={{
                  //         borderBottom: "1px solid #8AA29D",
                  //         marginBottom: 2,
                  //         paddingBottom: 2,
                  //       }}
                  //     >
                  //       Table of Contents
                  //     </Typography>
                  //     <Typography component="div" className="html-to-react">
                  //       {markdownify(_.get(props, "page.toc", null))}
                  //     </Typography>
                  //   </Box>
                  // </Grid>
                )} */}
                {page.featuredImage && page.toc && (
                  <Typography component="div" className="html-to-react-article">
                    <ImageBlock value={page.featuredImage} />
                  </Typography>
                )}

                {page.toc && (
                  <>
                    <Box mb={0}>
                      <Typography variant="tocTitle">
                        {page.tocTitle || "Contents"}
                      </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={1}
                      mt={2}
                      mb={2}
                      flexDirection="column"
                      maxHeight={200}
                      // maxWidth={'100%'}
                    >
                      <PortableText
                        value={page.toc}
                        components={ToCserializer}
                      />
                    </Grid>
                  </>
                )}
                {page.body && (
                  <Typography component="div" className="html-to-react-article">
                    {body1 && body2 ? (
                      <>
                        <CustomPortableText value={body1} />
                        <NewsletterSubscribe />
                        <CustomPortableText value={body2} />
                      </>
                    ) : (
                      <CustomPortableText value={page.body} />
                    )}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box marginBottom={6}>
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    borderBottom: "1px solid #8AA29D",
                    paddingBottom: 2,
                    width: "100%",
                  }}
                >
                  Authors
                </Typography>
                <Stack direction="column" spacing={4}>
                  {page.authors &&
                    page.authors.map((auth) => (
                      <Grid
                        container
                        key={auth.slug.current}
                        spacing={2}
                        item
                        xs={12}
                      >
                        <Grid item xs={auth.photo ? 3 : 0}>
                          {auth.photo && (
                            <Image
                              src={urlFor(auth.photo)
                                .fit("max")
                                .auto("format")
                                .url()}
                              height={80}
                              width={80}
                              alt=""
                              style={{ borderRadius: 50 }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={auth.photo ? 9 : 12}>
                          <Link
                            href={`/author/${auth.slug.current}`}
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
                              sx={{ color: "#000", fontWeight: 400 }}
                            >
                              {auth.name}
                            </Typography>
                          </Link>
                          {auth.bio && (
                            <Typography
                              color="rgba(0,0,0,0.48)"
                              component="div"
                              variant="body2"
                            >
                              {toPlainText(auth.bio).substring(0, 300)}
                              {toPlainText(auth.bio).length > 300 ? "..." : ""}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                </Stack>
              </Box>
              <RelatedCommentary
                title="Further Reading"
                commentary={page.relatedCommentary}
                noFilter={true}
              />
              <RelatedArticles articles={page.relatedArticles} />
              <RelatedTopics topics={page.relatedTopics} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  page: PropTypes.object,
};

export default Post;
