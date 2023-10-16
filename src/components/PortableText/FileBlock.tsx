/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getFile } from "@sanity/asset-utils";
import client from "../../utils/sanityClient";

export const FileBlock = ({ value }) => {
  const [url, setUrl] = useState([]);
  useEffect(() => {
    if (value.asset) {
      // gets a file asset object from Sanity
      const file = getFile(value.asset._ref, client.config());
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
