import React, { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { SearchInput } from './SearchFieldStyles';

function SearchField({ onSearch }) {
  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 300),
    [onSearch]
  );

  const handleInputChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <SearchInput
      type="text"
      placeholder="Search Pokémon..."
      onChange={handleInputChange}
    />
  );
}

export default SearchField;