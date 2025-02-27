import React, { useCallback } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 3px solid #232323; 
  border-radius: 20px;
  width: 200px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    border-width: 2px;
    width: 180px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
    border-width: 2px;
    width: 150px;
  }
`;

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