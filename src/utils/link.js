import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";

function Link({ children, href, ...other }) {
  // Pass Any internal link to Next.js Link, for anything else, use <a> tag
  const internal = /^\/(?!\/)/.test(href);

  if (internal) {
    // For root page, use index.js, for rest use [...slug].js
    const page = href === "/" ? "/" : "/[...slug]";
    return (
      <NextLink href={page} as={href}>
        {children}
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
