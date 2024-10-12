/* eslint-disable */

import React from "react";

export const CustomHtmlBlock = ({ value, children }) => {

  const { code } = value;

  return <div dangerouslySetInnerHTML={{__html: code}}></div>;
};
