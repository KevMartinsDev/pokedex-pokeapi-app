import {
    fetchPokemonData,
    fetchPokemonDescriptionData,
    fetchAbilityDescriptionData,
    fetchMoveDescriptionData,
    fetchTypeMatchupsData,
  } from './pokemonService';
  
  export const fetchPokemonDetails = async (pokemonId) => {
    if (!Number.isInteger(pokemonId) || pokemonId < 1 || pokemonId > 1025) {
      throw new Error(`Invalid Pokémon ID: ${pokemonId}. Must be between 1 and 1025.`);
    }
    const data = await fetchPokemonData(pokemonId);
    return {
      name: data.name,
      abilities: data.abilities,
      moves: data.moves,
      types: data.types,
      stats: data.stats,
    };
  };
  
  export const fetchPokemonDescription = fetchPokemonDescriptionData;
  export const fetchAbilityDescription = fetchAbilityDescriptionData;
  export const fetchMoveDescription = fetchMoveDescriptionData;
  export const fetchTypeMatchups = fetchTypeMatchupsData;