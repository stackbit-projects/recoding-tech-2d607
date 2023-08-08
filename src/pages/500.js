import React from "react";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// logo
import Logo from "../components/Logo";

export default function Custom500() {
  return (
    <Box
      sx={{ backgroundColor: "#C2CECC", height: "100vh", position: "relative" }}
    >
      <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
        <Logo />
        <Box
          sx={{
            left: "50%",
            minWidth: { xs: 300, md: 600 },
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography component="div" variant="h3" gutterBottom>
            (500) A server-side error has occurred
          </Typography>
          <Typography component="div" variant="body1" sx={{ fontSize: 24 }}>
            Return{" "}
            <Link href="/" variant="body1" sx={{ fontSize: 24 }}>
              home
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
