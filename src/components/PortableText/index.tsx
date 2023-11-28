/* eslint-disable */
import React, { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { FileBlock } from "./FileBlock";
import { IframeEmbedBlock } from "./IframeEmbedBlock";
import { ImageBlock } from "./ImageBlock";
import { ReferenceBlock } from "./ReferenceBlock";
import { CaptionBlock } from "./CaptionBlock"

const components = {
  types: {
    reference: ReferenceBlock,
    iframeEmbed: IframeEmbedBlock,
    Image: ImageBlock,
    PDF: FileBlock,
    File: FileBlock,
    Caption: CaptionBlock,
  },
};
export const CustomPortableText = ({ value }) => {
  return <PortableText value={value} components={components} />;
};
