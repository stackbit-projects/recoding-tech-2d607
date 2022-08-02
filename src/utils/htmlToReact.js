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

// components
import Box from "@mui/material/Box";
import FancyCard from "../components/FancyCard";
import Typography from "@mui/material/Typography";

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

      if (
        node.name === "li" &&
        node.parent.name === "ol" &&
        node.children[0].data
      ) {
        let slug = `#${slugify(node.children[0].data.toLowerCase(), {
          remove: /[*+~.()'"!:@?/]/g,
        })}`;
        return (
          <li>
            <NextLink
              href={`${router.asPath.split("#")[0]}${slug}`}
              scroll={false}
            >
              {node.children[0].data}
            </NextLink>
          </li>
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
