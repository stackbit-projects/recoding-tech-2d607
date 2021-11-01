import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material-ui imports
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';

// Icons
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ handleSearch }) => {
  const [value, setValue] = useState();

  const handleSearchRequest = () => handleSearch(value);

  return (
    <Paper component="form">
      <IconButton
        type="search"
        aria-label="search"
        onClick={handleSearchRequest}
      >
        <SearchIcon />
      </IconButton>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </Paper>
  )
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func
};


export default SearchBar;
