import React from 'react';
import { StyledSelect } from './SortSelectStyles';

function SortSelect({ sortOrder, onSort }) {
  return (
    <StyledSelect value={sortOrder} onChange={(e) => onSort(e.target.value)}>
      <option value="id-asc">ID (Low to High)</option>
      <option value="id-desc">ID (High to Low)</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
    </StyledSelect>
  );
}

export default SortSelect;

