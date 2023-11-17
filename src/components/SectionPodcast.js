import React from "react";
import _ from "lodash";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomPortableText } from "../components/PortableText";

export default function SectionPodcast(props) {
  let section = _.get(props, "section", null);

  return (
    <section id={_.get(section, "section_id", null)}>
      <Box marginBottom={8}>
        <Typography
          component="div"
          variant="body3"
          className="html-to-react"
          marginBottom={6}
        >
          <CustomPortableText value={section.intro} />
        </Typography>
        <div
          style={{
            width: "100%",
            height: "600px",
            marginBottom: "20px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{ width: "100%", height: "600px", border: "none" }}
            seamless=""
            src={section.embed_url}
          ></iframe>
        </div>
      </Box>
    </section>
  );
}
