import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Material-ui imports
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";

// Icons
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleSearchRequest = (value) => {
    const url = "/search/?query=" + encodeURI(value);
    if (router && router.push) {
      router.push(url);
    }
  };

  useEffect(() => {
    setLoading(false);
    setValue("");
  }, [router]);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Paper
        component="form"
        elevation={0}
        square
        sx={{ border: "1px solid #000", borderRadius: "2px", maxWidth: 250 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <IconButton
          type="search"
          aria-label="search"
          sx={{ width: 40 }}
          // onClick={handleSearchRequest(value)}
        >
          <SearchIcon sx={{ color: "#000" }} />
        </IconButton>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchRequest(value);
              setLoading(true);
            }
          }}
          sx={{
            fontFamily: "h1.fontFamily",
            marginLeft: 1,
            marginTop: 1,
            "&:before": {
              borderBottom: "none",
            },
          }}
          placeholder="Search"
        />
      </Paper>
    );
  }
};

export default SearchBar;
