import React from 'react';
import { StyledSelect } from './TypeFilterStyles';

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