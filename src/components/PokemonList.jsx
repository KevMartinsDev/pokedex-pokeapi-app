import React from 'react'; // Adicionado
import PokemonCard from "./PokemonCard";
import styled from 'styled-components';

const Ulstyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

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