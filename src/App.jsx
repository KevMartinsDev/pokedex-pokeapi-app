import React, { useState, useEffect, useRef, useCallback } from 'react';

async function pokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Erro ao carregar os Pokémons");
  }
  const data = await response.json();
  return data.results;
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
};

function App() {
  const { pokemons, loadMorePokemons, isLoading, error } = usePokemon();

  return (
    <div>
      <header>
        <div>
          <p>Header</p>
          <img className='logo_header' src="./src/assets/img/logo.png" alt="logo" />
        </div>
      </header>

      <main>
        <p>Main</p>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.url}>{pokemon.name}</li> 
          ))}
        </ul>
        <button onClick={loadMorePokemons} disabled={isLoading}>
          {isLoading ? "Carregando..." : "Carregar mais"}
        </button>
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
