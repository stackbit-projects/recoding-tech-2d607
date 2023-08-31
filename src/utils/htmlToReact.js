import React from "react";
import ReactHtmlParser, {
  convertNodeToReactElement,
} from "@hedgedoc/html-to-react";
import ScriptTag from "next/script";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Link from "./link";
import slugify from "slugify";
import _ from "lodash";

// MUI components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

// custom components
import FancyCard from "../components/FancyCard";

const convertChildren = (children, index) =>
  _.map(children, (childNode) =>
    convertNodeToReactElement(childNode, index, _.noop())
  );

export default function htmlToReact(html) {
  if (!html) {
    return null;
  }
  const router = useRouter();

  return ReactHtmlParser(html, {
    transform: (node, index) => {
      /** the next two if statements ensure the Table of Contents section in the articles work */

      if (node.name === "h4" && node.children[0].data) {
        let slug = `${slugify(node.children[0].data.toLowerCase(), {
          remove: /[*+~.()'"!:@?/]/g,
        })}`;
        return <h4 id={slug}>{node.children[0].data}</h4>;
      }

      if (node.name === "ol") {
        console.log(node);
        return (
          <List>
            {node.children && node.children.length
              ? node.children.map((child) => {
                  if (child.name === "li") {
                    let slug = `#${slugify(
                      child.children[0].data.toLowerCase(),
                      {
                        remove: /[*+~.()'"!:@?/]/g,
                      }
                    )}`;
                    return (
                      <ListItem key={slug} sx={{ marginLeft: 0, paddingLeft: 0 }}>
                        <NextLink
                          href={`${router.asPath.split("#")[0]}${slug}`}
                          scroll={false}
                        >
                          <Typography
                            component="span"
                            style={{
                              cursor: "pointer",
                              fontFamily: "'Lexend', sans-serif",
                            }}
                          >
                            {child.children[0].data}
                          </Typography>
                        </NextLink>
                      </ListItem>
                    );
                  }
                })
              : null}
          </List>
        );
      }

      if (node.name === "blockquote" && node.children[1] && node.children[0]) {
        return (
          <Box p={4} sx={{ border: "1px solid #000" }}>
            <Typography component="div" variant="quote">
              {node.children[1].children[0].data}
            </Typography>
          </Box>
        );
      }
      if (node.attribs && node.attribs.class == "citation") {
        return <FancyCard citationToFetch={node.children[0].data} />;
      }
      if (node.data)
        if (node.type === "script") {
          if (!_.isEmpty(node.children)) {
            return (
              <ScriptTag key={index} {...node.attribs}>
                {convertChildren(node.children, index)}
              </ScriptTag>
            );
          } else {
            return <ScriptTag key={index} {...node.attribs} />;
          }
        } else if (node.type === "tag" && node.name === "a") {
          const href = node.attribs.href;
          const props = _.omit(node.attribs, "href");
          // use Link only if there are no custom attributes like style, class, and what's not that might break react
          if (_.isEmpty(props)) {
            return (
              <Link key={index} href={href} {...props}>
                {convertChildren(node.children, index)}
              </Link>
            );
          }
        }
    },
  });
}
