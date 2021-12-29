import React from "react";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import ScriptTag from "react-script-tag";
import Link from "./link";
import _ from "lodash";

import Typography from '@mui/material/Typography'

const convertChildren = (children, index) =>
  _.map(children, childNode =>
    convertNodeToElement(childNode, index, _.noop())
  );

export default function htmlToReact(html) {
  if (!html) {
    return null;
  }
  return ReactHtmlParser(html, {
    transform: (node, index) => {
      if (node.data)
      console.log("node**********", node)
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
        } else if (node.parent && node.parent.type === 'tag') {
          if (node.parent.name === "h1" || node.parent.name === "h3") {
            return <Typography variant="h4">{node.data}</Typography>
          }
          if (node.parent.name === 'h2' && node.parent.prev.name === 'p') {
            return <Typography variant="h5">{node.data}</Typography>
          }
        }
    }
  });
}
