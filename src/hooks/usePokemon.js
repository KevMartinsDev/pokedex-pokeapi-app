import { useState, useEffect, useRef, useCallback } from "react";

async function pokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Erro ao carregar os Pokémons");
  }
  const data = await response.json();

  const pokemonsWithImage = data.results.map((pokemon) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    return { ...pokemon, id: pokemonId, image: pokemonImage };
  });

  return pokemonsWithImage;
}

const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const hasFetchedInitial = useRef(false);

  useEffect(() => {
    if (hasFetchedInitial.current) return;
    hasFetchedInitial.current = true;

    setIsLoading(true);
    pokemonList(10, 0)
      .then((data) => {
        setPokemons(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (offset === 0) return;

    setIsLoading(true);
    pokemonList(10, offset)
      .then((data) => {
        setPokemons((prevPokemons) => [...prevPokemons, ...data]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [offset]);

  const loadMorePokemons = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setOffset((prevOffset) => prevOffset + 10);
  }, [isLoading]);

  const searchPokemon = async (query) => {
    if (!query) {
      setFilteredPokemon(null); 
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon não encontrado!");

      const data = await response.json();
      const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

      setFilteredPokemon({ 
        name: data.name, 
        id: data.id, 
        image: pokemonImage 
      });
    } catch (error) {
      setError("Pokémon não encontrado!");
      setFilteredPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    pokemons, 
    loadMorePokemons, 
    isLoading, 
    error, 
    filteredPokemon, 
    searchPokemon    
  };
};

export default usePokemon;