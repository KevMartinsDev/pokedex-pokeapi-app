import { useState, useEffect } from "react";

async function fetchAllPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0");
  if (!response.ok) throw new Error("Erro ao carregar os Pokémons");

  const data = await response.json();

  return data.results.map((pokemon) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
    return {
      ...pokemon,
      id: parseInt(pokemonId),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    };
  });
}

const usePokemon = () => {
  const [allPokemons, setAllPokemons] = useState([]); 
  const [displayedPokemons, setDisplayedPokemons] = useState([]); 
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("id-asc");
  const [page, setPage] = useState(1); 

  useEffect(() => {
    setIsLoading(true);
    fetchAllPokemons()
      .then((data) => {
        setAllPokemons(data);
        setDisplayedPokemons(data.slice(0, 10)); 
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const sortPokemons = (order) => {
    if (!allPokemons.length) return;

    const sorted = [...allPokemons];
    if (order === "id-asc") {
      sorted.sort((a, b) => a.id - b.id);
    } else if (order === "id-desc") {
      sorted.sort((a, b) => b.id - a.id);
    } else if (order === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    setAllPokemons(sorted);
    setDisplayedPokemons(sorted.slice(0, page * 10)); 
    setSortOrder(order);
  };

  const loadMorePokemons = () => {
    const nextPage = page + 1;
    setDisplayedPokemons(allPokemons.slice(0, nextPage * 10)); 
    setPage(nextPage);
  };

  const searchPokemon = (query) => {
    if (!query) {
      setFilteredPokemons([]); 
      setDisplayedPokemons(allPokemons.slice(0, 10)); 
      return;
    }

    const foundPokemons = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(foundPokemons);
    setDisplayedPokemons(foundPokemons.slice(0, 10)); 
  };

  return {
    displayedPokemons,
    loadMorePokemons,
    isLoading,
    error,
    sortOrder,
    sortPokemons,
    searchPokemon,
    filteredPokemons
  };
};

export default usePokemon;
