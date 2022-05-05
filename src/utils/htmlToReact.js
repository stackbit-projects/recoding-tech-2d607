import React from "react";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import ScriptTag from "react-script-tag";
import Link from "./link";
import _ from "lodash";

// components
import Box from "@mui/material/Box";
import FancyCard from "../components/FancyCard";
import Typography from "@mui/material/Typography";

const convertChildren = (children, index) =>
  _.map(children, (childNode) =>
    convertNodeToElement(childNode, index, _.noop())
  );

export default function htmlToReact(html) {
  if (!html) {
    return null;
  }

  return ReactHtmlParser(html, {
    transform: (node, index) => {
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
