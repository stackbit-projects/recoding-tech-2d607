/* eslint-disable */
import React, { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { FileBlock } from "./FileBlock";
import { IframeEmbedBlock } from "./IframeEmbedBlock";
import { ImageBlock } from "./ImageBlock";
import { ReferenceBlock } from "./ReferenceBlock";

const components = {
  types: {
    reference: ReferenceBlock,
    iframeEmbed: IframeEmbedBlock,
    Image: ImageBlock,
    PDF: FileBlock,
    File: FileBlock,
  },
};
export const CustomPortableText = ({ value }) => {
  return <PortableText value={value} components={components} />;
};
