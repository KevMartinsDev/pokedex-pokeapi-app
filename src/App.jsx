import usePokemon from './hooks/usePokemon';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadMoreButton from "./components/LoadMoreButton";
import PokemonList from './components/PokemonList';
import SortSelect from './components/SortSelect';
import SearchField from './components/SearchField';
import TypeFilter from './components/TypeFilter';

function App() {
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

  return (
    <div>
      <Header />
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
    </div>
  );
}

export default App;