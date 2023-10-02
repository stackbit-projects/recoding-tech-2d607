/* eslint-disable */
import React from "react";
export const IframeEmbedBlock = ({ value, children }) => {
  const { url, embedType } = value;

  if (embedType === "airtable.com") {
    return (
      <iframe
        src={url}
        style={{ background: "transparent;border:1px solid #ccc" }}
      >
        {children}
      </iframe>
    );
  } else if (embedType === "player.captivate.fm") {
    return (
      <iframe src={url} style={{ width: "100%", height: "200px" }}>
        {children}
      </iframe>
    );
  } else if (embedType === "player.vimeo.com") {
    return (
      <iframe
        src={url}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={true}
      >
        {children}
      </iframe>
    );
  } else if (embedType === "twitter.com") {
    return <a href={url} />;
  } else if (embedType === "vimeo.com") {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${url.slice(-9)}?h=69206d40f4`}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={true}
      >
        {children}
      </iframe>
    );
  } else if (
    embedType === "www.youtube.com" ||
    embedType === "youtu.be"
  ) {
    return (
      <iframe
        src={url}
        width="560"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
      >
        {children}
      </iframe>
    );
  } else {
    return <iframe src={url}>{children}</iframe>;
  }
};
