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
  font-family: 'Roboto', sans-serif;

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

const TypeFilter = ({ onFilter, currentFilter }) => {
  const pokemonTypes = [
    "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying",
    "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock",
    "steel", "water",
  ].sort();

  return (
    <StyledSelect value={currentFilter} onChange={(e) => onFilter(e.target.value)}>
      <option value="">All Types</option>
      {pokemonTypes.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </StyledSelect>
  );
};

export default TypeFilter;