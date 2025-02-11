import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons }) {
  return (
    <ul>
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.url} pokemon={pokemon} />
      ))}
    </ul>
  );
}

export default PokemonList;
