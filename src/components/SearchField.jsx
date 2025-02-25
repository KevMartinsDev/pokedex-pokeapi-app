import React, { useState, useCallback } from "react";
import debounce from 'lodash/debounce';

const SearchField = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  
  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 300),
    [onSearch]
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar Pokémon por nome ou ID"
      />
      <button onClick={() => onSearch(query)}>Buscar</button>
    </div>
  );
};

export default SearchField;