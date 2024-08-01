import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";

function Link({ children, href, ...other }) {
  // Pass Any internal link to Next.js Link, for anything else, use <a> tag
  const internal = /^\/(?!\/)/.test(href);

  if (internal) {
    // For root page, use index.js, for rest use [...slug].js
    let page = "";
    if (href === "/") {
      page = "/";
    } else if (href === "/tracker/") {
      page = "/tracker";
    } else {
      page = "/[...slug]";
    }
    return (
      <NextLink href={page} as={href}>
        <a {...other}>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} {...other}>
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ]),
  href: PropTypes.string,
};

export default Link;
