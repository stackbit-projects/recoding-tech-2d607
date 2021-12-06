import React, { useState } from "react";
import PropTypes from "prop-types";

// Material-ui imports
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";

// Icons
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleSearch }) => {
  const [value, setValue] = useState();

  const handleSearchRequest = () => handleSearch(value);

  return (
    <Paper
      component="form"
      elevation={0}
      square
      sx={{ border: "1px solid #000" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <IconButton
        type="search"
        aria-label="search"
        onClick={handleSearchRequest}
        sx={{
          backgroundColor: "footer.main",
          borderRadius: 0,
          borderRight: "1px solid #000",
        }}
      >
        <SearchIcon />
      </IconButton>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          fontFamily: "h1.fontFamily",
          marginLeft: 1,
          width: "92%",
        }}
        placeholder="SEARCH..."
      />
    </Paper>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
};

export default SearchBar;
