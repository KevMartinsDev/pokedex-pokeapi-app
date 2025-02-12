import usePokemon from './hooks/usePokemon';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadMoreButton from "./components/LoadMoreButton";
import PokemonList from './components/PokemonList';

function App() {
  const { pokemons, loadMorePokemons, isLoading, error } = usePokemon();

  return (
    <div>
      <Header />

      <main>
        {isLoading && <p>Carregando Pokémons...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PokemonList pokemons={pokemons} />
        <LoadMoreButton onClick={loadMorePokemons} isLoading={isLoading}>
          Carregar mais
        </LoadMoreButton>
      </main>

      <Footer />
    </div>
  );
}

export default App;