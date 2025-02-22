import React from "react";

const TypeFilter = ({ onFilter, currentFilter }) => {
  const pokemonTypes = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy",
  ];

  return (
    <select value={currentFilter} onChange={(e) => onFilter(e.target.value)}>
      <option value="">Todos os tipos</option>
      {pokemonTypes.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;