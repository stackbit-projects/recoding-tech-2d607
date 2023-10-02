/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getFile } from "@sanity/asset-utils";
import client from "../../utils/sanityClient";

export const FileBlock = ({ value }) => {
  const [url, setUrl] = useState([]);
  useEffect(() => {
    if (value.attribs && value.attribs.data) {
      const file = getFile(value.attribs.data, client.config()); // gets a file asset object from Sanity
      if (file.asset && file.asset.url) setUrl(file.asset.url);
    }
  }, [value]);
  return (
    <object
      data={url ? url : ""}
      class="pdf"
      style={{ width: "100%", height: "800px" }}
    />
  );
};
