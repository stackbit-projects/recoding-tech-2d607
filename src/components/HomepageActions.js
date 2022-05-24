// base imports
import React, { useEffect, useState } from "react";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

// components
import PolicyActionTable from "./PolicyActionTable";
import PolicyActionMobile from "./PolicyActionMobile";

const policyActionsQuery = `*[_type == "policy_action" && !(_id match "drafts")]{category, country->{_key, displayTitle, name, slug}, dateInitiated,
                            lastUpdate, _id,
                            slug, status, title,
                            relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)[0...4]`;

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
      <Grid container item justifyContent="space-between"></Grid>
      <Box my={1}>
        {isMobile ? (
          <PolicyActionMobile actions={actions} />
        ) : (
          <PolicyActionTable actions={actions} isHomepage={true} />
        )}
      </Box>
    </section>
  ) : null;
};

export default HomepageActions;
