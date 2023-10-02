/* eslint-disable */
import React from "react";
import FancyCard from "../FancyCard";

export const ReferenceBlock = ({ value }) => {
  return <FancyCard citationToFetch={value.data} />;
};
