// base imports
import React from "react";

// Material UI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

// MUI icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SectionSubscribe = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#E0EEFF",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography component="div" variant="h4" marginBottom={1}>
        Our content. Delivered.
      </Typography>
      <Typography component="div" variant="body2" marginBottom={2}>
        Join our newsletter on issues and ideas at the intersection of tech &
        democracy
      </Typography>
      <Input
        placeholder="Enter email address"
        variant="outlined"
        type="email"
        sx={{
          backgroundColor: "#FFF",
          borderRadius: "2px",
          fontFamily: "'Lexend', sans-serif",
          fontWeight: 300,
          marginBottom: 2,
          paddingLeft: 1,
          "&:before": {
            borderBottom: "none",
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#273649",
          borderRadius: 2,
          color: "#fff",
          fontSize: 12,
          fontWeight: 300,
          textTransform: "uppercase",
        }}
      >
        Subscribe
        <ChevronRightIcon />
      </Button>
    </Box>
  );
};

export default SectionSubscribe;
