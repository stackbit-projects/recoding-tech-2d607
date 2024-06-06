/* eslint-disable */
import React from "react";
import { Tweet, TweetNotFound } from "react-tweet";

export const IframeEmbedBlock = ({ value, children }) => {

  const { url, embedType } = value;

  if (embedType === "airtable.com") {
    return (
      <iframe
        src={url}
        style={{
          background: "transparent;border:1px solid #ccc",
          width: "100%",
          height: "500px",
        }}
      >
        {children}
      </iframe>
    );
  } else if (embedType === "player.captivate.fm") {
    return (
      <iframe
        src={url}
        style={{ width: "100%", height: "200px", border: "none" }}
      >
        {children}
      </iframe>
    );
  } else if (embedType === "player.vimeo.com") {
    return (
      <iframe
        src={url}
        width="640"
        height="360"
        style={{ border: "none" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={true}
      >
        {children}
      </iframe>
    );
  } else if (embedType === "twitter.com") {
    const tweetId = url.split("/").pop();
    return (
      <div className="light">
        <Tweet
          id={tweetId}
          onError={(error) => <TweetNotFound error={error} />}
        // onError={(error) => (
        //   <div className="light">
        //     <TweetNotFound error={error} />
        //   </div>
        // )}
        />
      </div>
    );
  } else if (embedType === "vimeo.com") {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${url.slice(-9)}?h=69206d40f4`}
        width="100%"
        height="360"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={true}
      >
        {children}
      </iframe>
    );
  } else if (embedType === "www.youtube.com" || embedType === "youtu.be") {
    const embedId = url.split("/").pop();
    return (
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        width="100%"
        height="480"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
      >
        {children}
      </iframe>
    );
  } else if (embedType == "donorbox") {
    return (
      <iframe
        src={url}
        style={{ maxWidth: "500px", minWidth: "250px", maxHeight: "none!important" }}
        width="100%"
        height="900px"
        name="donorbox"
        allowpaymentrequest="allowpaymentrequest"
        seamless="seamless"
        frameBorder="0"
        scrolling="no"
      >
      </iframe>
    )
  } else {
    return (
      <iframe
        src={url}
        width="100%"
        height="533"
        style={{ border: "none" }}
      >
        {children}
      </iframe>
    );
  }
};
