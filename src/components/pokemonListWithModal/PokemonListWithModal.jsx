import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import usePokemon from '../../services/usePokemon';
import LoadMoreButton from '../loadMoreButton/LoadMoreButton';
import PokemonList from '../PokemonList/PokemonList';
import SearchField from '../searchField/SearchField';
import SortSelect from '../sortSelect/SortSelect';
import TypeFilter from '../typeFilter/TypeFilter';
import ThemeToggle from '../themeToggle/ThemeToggle';
import PokemonModal from '../PokemonModal/PokemonModal';
import themeToggleIcon from '../../assets/img/theme_toggle.png';
import {
  LoadingContainer,
  LoadingText,
  LoadingSpinner,
  ErrorMessage,
  ControlsWrapper,
  ButtonContainer,
  BackToTopButton,
  GameButton
} from '../PokemonListWithModal/PokemonListWithModalStyles';

function PokemonListWithModal() {
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

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (id) {
      const pokemon = displayedPokemons.find(p => p.id === parseInt(id));
      if (pokemon) {
        setSelectedPokemon(pokemon);
      } else {
        setSelectedPokemon(null);
      }
    } else {
      setSelectedPokemon(null);
    }
  }, [id, displayedPokemons]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    navigate('/');
  };

  const isGameRoute = location.pathname === '/whos-that-pokemon';
  const gameButtonText = isGameRoute ? 'Return to Pokédex' : 'Who’s That Pokémon?';
  const gameButtonTo = isGameRoute ? '/' : '/whos-that-pokemon';

  return (
    <>
      {isLoading && loadedCount <= 800 && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
      )}

      <ControlsWrapper>
        <SearchField onSearch={searchPokemon} />
        <SortSelect sortOrder={sortOrder} onSort={sortPokemons} />
        <TypeFilter onFilter={filterByType} currentFilter={typeFilter} />
        <ThemeToggle themeToggleIcon={themeToggleIcon} />
        <GameButton to={gameButtonTo}>{gameButtonText}</GameButton>
      </ControlsWrapper>

      <main>
        {error && displayedPokemons.length === 0 && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        <PokemonList
          pokemons={displayedPokemons}
          loadMoreButton={
            <ButtonContainer>
              <LoadMoreButton onClick={loadMorePokemons} isLoading={isLoading} />
              {loadedCount > 10 && (
                <BackToTopButton onClick={scrollToTop}>
                  Back to Top
                </BackToTopButton>
              )}
            </ButtonContainer>
          }
        />
      </main>

      {selectedPokemon && (
        <Suspense fallback={<div>Loading...</div>}>
          <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
        </Suspense>
      )}
    </>
  );
}

export default PokemonListWithModal;