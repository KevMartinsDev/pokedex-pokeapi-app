import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 200px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  outline: none;
  cursor: pointer;

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