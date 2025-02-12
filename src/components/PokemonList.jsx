import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons, loadMoreButton }) {
  return (
    <div>
      <ul>
        {pokemons.map((pokemon) => (
          <PokemonItem key={pokemon.url} pokemon={pokemon} />
        ))}
      </ul>
      {loadMoreButton}
    </div>
  );
}

export default PokemonList;