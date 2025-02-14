import { useState, useEffect, useRef, useCallback } from 'react';

async function pokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Erro ao carregar os Pokémons");
  }
  const data = await response.json();

  // Acrescentando a imagem e o ID dos Pokémons
  const pokemonsWithImage = data.results.map((pokemon) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop(); // Obtendo o ID
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`; // Link da imagem
    return {
      ...pokemon,
      id: pokemonId,
      image: pokemonImage,
    };
  });

  return pokemonsWithImage;
}

const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  return { pokemons, loadMorePokemons, isLoading, error };
}

export default usePokemon;
