// base imports
import React, { useEffect, useState } from "react";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

// components
import PolicyActionTable from "./PolicyActionTable";
import PolicyActionMobile from "./PolicyActionMobile";

const policyActionsQuery = `*[_type == "policy_action" && !(_id match "drafts")]{country, dateInitiated,
                            lastUpdate, _updatedAt, _createdAt, _id,
                            slug[]->, status, title, summary,
                            relatedTopics[]->{_id, _key, name, slug, type}, type}|order(_updatedAt desc)[0...5]`;

const HomepageActions = () => {
  const [actions, setActions] = useState([]);

  const isMobile = useMediaQuery("(max-width:1064px)");

  useEffect(() => {
    client.fetch(policyActionsQuery).then((actions) => {
      if (Array.isArray(actions) && actions.length) {
        setActions(actions);
      }
    });
  }, []);

  return Array.isArray(actions) && actions.length ? (
    <section>
      <Box my={1}>
        {isMobile ? (
          <PolicyActionMobile actions={actions} isHomepage />
        ) : (
          <PolicyActionTable actions={actions} isHomepage />
        )}
      </Box>
    </section>
  ) : null;
};

export default HomepageActions;
