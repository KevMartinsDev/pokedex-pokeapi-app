import usePokemon from './hooks/usePokemon';
import Header from './components/Header';
import Footer from './components/Footer';
import PokemonList from './components/PokemonList';

function App() {
  const { pokemons, loadMorePokemons, isLoading, error } = usePokemon();

  return (
    <div>
      <Header />

      <main>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PokemonList pokemons={pokemons} />
        <button onClick={loadMorePokemons} disabled={isLoading}>
          {isLoading ? "Carregando..." : "Carregar mais"}
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default App;