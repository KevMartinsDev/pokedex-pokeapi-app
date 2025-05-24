import React from 'react';
import PokemonCard from "../PokemonCard/PokemonCard";
import { Ulstyle } from "./PokemonListStyles";

function PokemonList({ pokemons, loadMoreButton }) {
  return (
    <div>
      <Ulstyle>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </Ulstyle>
      {loadMoreButton}
    </div>
  );
}

export default PokemonList;