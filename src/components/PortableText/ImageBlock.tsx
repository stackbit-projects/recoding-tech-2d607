/* eslint-disable */
import React from "react";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import DOMPurify from "isomorphic-dompurify";
import imageBuilder from "../../utils/imageBuilder";

export const ImageBlock = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  let caption;
  if (value.wordpressCaption) {
    caption = DOMPurify.sanitize(value.wordpressCaption, {
      USE_PROFILES: { html: true },
    });
  }
  console.log("width, height =>", width, height);
  console.log("imageBuilder value =>", imageBuilder(value));
  if (!value.asset) console.log("***No asset for ImageBlock value***:", value);
  return (
    <div>
      <figure>
        {value.asset && (
          <Image
            src={imageBuilder(value).url()}
            alt={value.alt || " "}
            loading="lazy"
            // layout="fill"
            objectFit="contain"
            height={576}
            width={1024}
            style={{
              aspectRatio: width / height,
            }}
          />
        )}
        {caption && (
          <figcaption>
            <Typography
              component="div"
              style={{
                color: "#7C7B7B",
                cursor: "pointer",
                fontFamily: "'Lexend', sans-serif",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: caption }}
            />
          </figcaption>
        )}
      </figure>
    </div>
  );
};
