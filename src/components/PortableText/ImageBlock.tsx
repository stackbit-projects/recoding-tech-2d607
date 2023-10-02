/* eslint-disable */
import React from "react";
//import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import DOMPurify from "isomorphic-dompurify";
import imageBuilder from "../../utils/imageBuilder";

export const ImageBlock = ({ value }) => {
  //const { width, height } = getImageDimensions(value);
  let caption;
  if (value.wordpressCaption) {
    caption = DOMPurify.sanitize(value.wordpressCaption, {
      USE_PROFILES: { html: true },
    });
  }
  if (!value.asset) console.log("***No asset for ImageBlock value***:", value);
  return (
    <figure>
      {value.asset && (
        <Image
          src={imageBuilder(value).height(576).width(1024).fit("max").auto(
            "format",
          )
            .url()}
          alt={value.alt || " "}
          loading="lazy"
          height={576}
          width={1024}
          //    style={{
          // Avoid jumping around with aspect-ratio CSS property
          //      aspectRatio: width / height,
          //    }}
        />
      )}
      {caption && (
        <figcaption>
          <Typography
            component="span"
            style={{
              color: "#7C7B7B",
              cursor: "pointer",
              fontFamily: "'Lexend', sans-serif",
            }}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </figcaption>
      )}
    </figure>
  );
};
