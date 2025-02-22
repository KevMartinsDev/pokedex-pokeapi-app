import usePokemon from './hooks/usePokemon';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadMoreButton from "./components/LoadMoreButton";
import PokemonList from './components/PokemonList';
import SortSelect from './components/SortSelect';
import SearchField from './components/SearchField'; 

function App() {
  const { displayedPokemons, loadMorePokemons, isLoading, error, sortOrder, sortPokemons, searchPokemon } = usePokemon();

  return (
    <div>
      <Header />

      <SearchField onSearch={searchPokemon} /> 

      <main>
        {isLoading && <p>Carregando Pokémons...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SortSelect sortOrder={sortOrder} onSort={sortPokemons} />

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
