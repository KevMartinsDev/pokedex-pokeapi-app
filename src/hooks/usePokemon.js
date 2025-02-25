import { useState, useEffect } from "react";

async function fetchPokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error("Erro ao carregar os Pokémons");
  const data = await response.json();
  return data.results.map((pokemon) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
    return {
      name: pokemon.name,
      id: parseInt(pokemonId),
      url: pokemon.url,
    };
  });
}

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

const usePokemon = () => {
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

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      try {
        let cachedPokemons = JSON.parse(localStorage.getItem('pokemonCache'));
        if (!cachedPokemons) {
          const basicPokemons = await fetchPokemonList(1302, 0);
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
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemons();
  }, []);

  const filterByType = (type) => {
    setTypeFilter(type);
    setPage(1);
    setIsSearchActive(false);
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

    const sortedAll = [...allPokemons];
    const sortedFiltered = [...filteredPokemons];

    const sortFunction = (a, b) => {
      if (order === "id-asc") return a.id - b.id;
      if (order === "id-desc") return b.id - a.id;
      if (order === "name-asc") return a.name.localeCompare(b.name);
      if (order === "name-desc") return b.name.localeCompare(a.name);
    };

    sortedAll.sort(sortFunction);
    setAllPokemons(sortedAll);

    if (typeFilter || isSearchActive) {
      sortedFiltered.sort(sortFunction);
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

  const searchPokemon = (query) => {
    setPage(1);
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

    const foundPokemons = allPokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter
        ? pokemon.types && pokemon.types.includes(typeFilter.toLowerCase())
        : true;
      return matchesName && matchesType;
    });

    setFilteredPokemons(foundPokemons);
    setDisplayedPokemons(foundPokemons.slice(0, itemsPerPage));
    setIsSearchActive(true);
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

export { fetchPokemonList };

export async function fetchPokemonByName(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error("Pokémon não encontrado!");
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    sprites: data.sprites,
  };
}