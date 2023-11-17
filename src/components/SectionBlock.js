import React from "react";
import _ from "lodash";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomPortableText } from "../components/PortableText";

export default function SectionBlock(props) {
  let section = _.get(props, "section", null);

  return (
    <section id={_.get(section, "section_id", null)}>
      <Box marginBottom={8}>
        <Typography component="div" className="html-to-react-article">
          <CustomPortableText value={section.body} />
        </Typography>
      </Box>
    </section>
  );
}
