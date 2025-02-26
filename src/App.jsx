// src/App.jsx
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadMoreButton from './components/LoadMoreButton';
import PokemonList from './components/PokemonList';
import SortSelect from './components/SortSelect';
import SearchField from './components/SearchField';
import TypeFilter from './components/TypeFilter';
import ThemeToggle from './components/ThemeToggle';
import usePokemon from './hooks/usePokemon';
import styled from 'styled-components';

// Definição dos temas
const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  cardBackground: '#f2f2f2',
  border: '#ccc',
};

const darkTheme = {
  background: '#333333',
  text: '#ffffff',
  cardBackground: '#555555',
  border: '#888888',
};

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

function AppContent() {
  const {
    displayedPokemons,
    loadMorePokemons,
    isLoading,
    error,
    sortOrder,
    sortPokemons,
    searchPokemon,
    filterByType,
    typeFilter,
    loadedCount,
  } = usePokemon();

  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppContainer>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <ThemeToggle />
        </div>
        <SearchField onSearch={searchPokemon} />
        <SortSelect sortOrder={sortOrder} onSort={sortPokemons} />
        <TypeFilter onFilter={filterByType} currentFilter={typeFilter} />
        <main>
          {isLoading && <p>Carregando {loadedCount} de 1302 Pokémon...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <PokemonList pokemons={displayedPokemons} />
          <LoadMoreButton onClick={loadMorePokemons} isLoading={isLoading}>
            Carregar mais
          </LoadMoreButton>
        </main>
        <Footer />
      </AppContainer>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;