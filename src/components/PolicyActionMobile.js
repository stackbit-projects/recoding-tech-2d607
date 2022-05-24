import React from "react";
import moment from "moment-strftime";

// material ui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// Material UI icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function PolicyActionMobile(props) {
  const { actions } = props;

  return actions.map((row) => (
    <Accordion key={row._key} sx={{ marginBottom: 4 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`content-${row._key}`}
        id={`header-${row._key}`}
        sx={{
          backgroundColor: "#EFE9DA",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography component="div" variant="h4">
          {row.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid container item xs={12} sx={{ mb: 2 }} alignItems="center">
            <Grid item>
              <Link
                href={`/tracker/${
                  typeof row.slug === "object" ? row.slug.current : row.slug
                }`}
                variant="body2"
                sx={{ color: "#000" }}
              >
                View details
              </Link>
            </Grid>
            <Grid item>
              <KeyboardArrowRightIcon />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4">Type</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              {row.type}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4">Government</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              {row.country.displayTitle}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4">Status</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              {row.status}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4">Last Updated</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ borderBottom: "1px solid #ccc", paddingTop: 2 }}
          >
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              {moment(new Date(row.lastUpdate)).strftime("%b %d, %Y")}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  ));
}
