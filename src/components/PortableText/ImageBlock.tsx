/* eslint-disable */
import React from "react";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import DOMPurify from "isomorphic-dompurify";
import imageBuilder from "../../utils/imageBuilder";
import { PortableText } from "@portabletext/react";

export const ImageBlock = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  let htmlCaption;
  if (value.wordpressCaption) {
    htmlCaption = DOMPurify.sanitize(value.wordpressCaption, {
      USE_PROFILES: { html: true },
    });
  }
  console.log("value!!! ->", value)
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
        {htmlCaption ? (
          <figcaption>
            <Typography
              component="div"
              style={{
                color: "#7C7B7B",
                cursor: "pointer",
                fontFamily: "'Lexend', sans-serif",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: htmlCaption }}
            />
          </figcaption>
        ): null}
        {
          value.caption ? <PortableText value={value.caption} /> : null
        }
        {/* {value.caption ? (
            <Typography
              // className="image-caption"
              style={{
                color: "#7C7B7B",
                cursor: "pointer",
                fontFamily: "'Lexend', sans-serif",
                textAlign: "center",
              }}
            > 
                <PortableText value={value.caption} />
            </Typography>      
        ) : null} */}
      </figure>
    </div>
  );
};
