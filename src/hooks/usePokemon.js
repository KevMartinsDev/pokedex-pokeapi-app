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

const usePokemon = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("id-asc");
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      try {
        const basicPokemons = await fetchPokemonList(1302, 0);
        const detailedPokemons = [];
        for (let i = 0; i < basicPokemons.length; i += 50) {
          const batch = basicPokemons.slice(i, i + 50);
          const detailedBatch = await Promise.all(batch.map(fetchPokemonDetails));
          detailedPokemons.push(...detailedBatch);
          if (i === 0) {
            setDisplayedPokemons(detailedBatch.slice(0, itemsPerPage));
          }
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
    if (!type) {
      setFilteredPokemons([]);
      setDisplayedPokemons(allPokemons.slice(0, itemsPerPage));
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
    const sorted = [...allPokemons];
    if (order === "id-asc") {
      sorted.sort((a, b) => a.id - b.id);
    } else if (order === "id-desc") {
      sorted.sort((a, b) => b.id - b.id);
    } else if (order === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setAllPokemons(sorted);
    const pokemonsToShow = (typeFilter ? filteredPokemons : sorted).slice(0, page * itemsPerPage);
    setDisplayedPokemons(pokemonsToShow);
    setSortOrder(order);
  };

  const loadMorePokemons = () => {
    const nextPage = page + 1;
    const source = typeFilter ? filteredPokemons : allPokemons;
    setDisplayedPokemons(source.slice(0, nextPage * itemsPerPage));
    setPage(nextPage);
  };

  const searchPokemon = (query) => {
    if (!query) {
      setFilteredPokemons([]);
      setTypeFilter("");
      setDisplayedPokemons(allPokemons.slice(0, itemsPerPage));
      setPage(1);
      return;
    }
    const foundPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(foundPokemons);
    setDisplayedPokemons(foundPokemons.slice(0, itemsPerPage));
    setPage(1);
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