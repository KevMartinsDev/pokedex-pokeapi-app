import { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemonByName } from '../services/pokemonService';

async function fetchPokemonDetails(pokemon) {
  const response = await fetch(pokemon.url);
  if (!response.ok) throw new Error("Erro ao carregar detalhes do Pokémon");
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    sprites: data.sprites,
  };
}

async function fetchMinimalPokemonDetails(pokemon) {
  const response = await fetch(pokemon.url);
  if (!response.ok) throw new Error("Erro ao carregar detalhes do Pokémon");
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    types: data.types.map((typeInfo) => typeInfo.type.name),
  };
}

const usePokemon = ({ skipInitialLoad = false } = {}) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("id-asc");
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const itemsPerPage = 10;
  const MAX_POKEMON_ID = 1025;

  useEffect(() => {
    if (skipInitialLoad) return;

    const loadPokemons = async () => {
      setIsLoading(true);

      try {
        let cachedPokemons = JSON.parse(localStorage.getItem('pokemonCache'));
        if (!cachedPokemons || cachedPokemons.some(p => p.id > MAX_POKEMON_ID)) {
          localStorage.removeItem('pokemonCache');
          cachedPokemons = null;
        }

        if (!cachedPokemons) {
          const basicPokemons = await fetchPokemonList(MAX_POKEMON_ID, 0);
          cachedPokemons = [];
          for (let i = 0; i < basicPokemons.length; i += 200) {
            const batch = basicPokemons.slice(i, i + 200);
            const minimalBatch = await Promise.all(batch.map(fetchMinimalPokemonDetails));
            cachedPokemons.push(...minimalBatch);
            setLoadedCount(cachedPokemons.length);
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
          localStorage.setItem('pokemonCache', JSON.stringify(cachedPokemons));
        }

        const detailedPokemons = [];
        for (let i = 0; i < cachedPokemons.length; i += 200) {
          const batch = cachedPokemons.slice(i, i + 200);
          const detailedBatch = await Promise.all(batch.map((p) =>
            fetchPokemonDetails({ url: `https://pokeapi.co/api/v2/pokemon/${p.id}` })
          ));
          detailedPokemons.push(...detailedBatch);
          if (i === 0) {
            setDisplayedPokemons(detailedBatch.slice(0, itemsPerPage));
          }
          setLoadedCount(detailedPokemons.length);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        setAllPokemons(detailedPokemons);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar Pokémon:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemons();
  }, [skipInitialLoad]);

  const filterByType = (type) => {
    setTypeFilter(type);
    setPage(1);
    setIsSearchActive(false);
    setError(null);
    if (!type) {
      setFilteredPokemons([]);
      const sortedAll = [...allPokemons].sort((a, b) => a.id - b.id);
      setDisplayedPokemons(sortedAll.slice(0, itemsPerPage));
      return;
    }
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.types && pokemon.types.includes(type.toLowerCase())
    );
    setFilteredPokemons(filtered);
    setDisplayedPokemons(filtered.slice(0, itemsPerPage));
  };

  const sortPokemons = (order) => {
    if (!allPokemons.length) return;

    setSortOrder(order);
    setPage(1);
    setError(null);

    const sortFunction = (a, b) => {
      if (order === "id-asc") return a.id - b.id;
      if (order === "id-desc") return b.id - a.id;
      if (order === "name-asc") return a.name.localeCompare(b.name);
      if (order === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    };

    const sortedAll = [...allPokemons].sort(sortFunction);
    setAllPokemons(sortedAll);

    if (typeFilter || isSearchActive) {
      const sortedFiltered = [...filteredPokemons].sort(sortFunction);
      setFilteredPokemons(sortedFiltered);
      setDisplayedPokemons(sortedFiltered.slice(0, itemsPerPage));
    } else {
      setDisplayedPokemons(sortedAll.slice(0, itemsPerPage));

    }
  };

  const loadMorePokemons = () => {
    const nextPage = page + 1;
    const source = isSearchActive || typeFilter ? filteredPokemons : allPokemons;
    setDisplayedPokemons(source.slice(0, nextPage * itemsPerPage));
    setPage(nextPage);

  };

  const searchPokemon = async (query) => {
    setPage(1);
    setError(null);
    if (!query) {
      setFilteredPokemons([]);
      setIsSearchActive(false);
      if (typeFilter) {
        const filtered = allPokemons.filter((pokemon) =>
          pokemon.types && pokemon.types.includes(typeFilter.toLowerCase())
        );
        setFilteredPokemons(filtered);
        setDisplayedPokemons(filtered.slice(0, itemsPerPage));

      } else {
        setTypeFilter("");
        setDisplayedPokemons(allPokemons.slice(0, itemsPerPage));

      }
      return;
    }

    const sanitizedQuery = query.trim().replace(/[^a-zA-Z0-9-]/g, '');
    if (!sanitizedQuery) {
      setError('Invalid search query');
      setFilteredPokemons([]);
      setDisplayedPokemons([]);
      setIsSearchActive(true);

      return;
    }



    const localMatches = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(sanitizedQuery.toLowerCase()) ||
      pokemon.id.toString() === sanitizedQuery
    );
    if (localMatches.length > 0) {
      setFilteredPokemons(localMatches);
      setDisplayedPokemons(localMatches.slice(0, itemsPerPage));
      setIsSearchActive(true);
      return;
    }

    try {
      const pokemon = await fetchPokemonByName(sanitizedQuery);
      if (!pokemon || !pokemon.name || !pokemon.id) {
        throw new Error('Pokémon data is invalid');
      }
      setFilteredPokemons([pokemon]);
      setDisplayedPokemons([pokemon]);
      setIsSearchActive(true);
    } catch (err) {
      setError('Pokémon not found');
      setFilteredPokemons([]);
      setDisplayedPokemons([]);
      setIsSearchActive(true);
    }
  };

  return {
    displayedPokemons,
    loadMorePokemons,
    isLoading,
    error,
    sortOrder,
    sortPokemons,
    searchPokemon,
    filteredPokemons,
    filterByType,
    typeFilter,
    loadedCount,
    page,
    isSearchActive,
  };
};

export default usePokemon;