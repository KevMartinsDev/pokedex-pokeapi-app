import React, { Suspense, useState } from 'react';
import { HashRouter as Router, Route, Routes, useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadMoreButton from './components/LoadMoreButton';
import PokemonList from './components/PokemonList';
import SortSelect from './components/SortSelect';
import SearchField from './components/SearchField';
import TypeFilter from './components/TypeFilter';
import ThemeToggle from './components/ThemeToggle';
import PokemonModal from './components/PokemonModal';
import WhosThatPokemon from './components/WhosThatPokemon';
import usePokemon from './hooks/usePokemon';
import styled from 'styled-components';
import themeToggleIcon from './assets/img/theme_toggle.png';
import detailHeader from './assets/img/detail_header.png'; 
import sideDetail from './assets/img/side_detail.png';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const grow = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const GlobalStyle = createGlobalStyle`
  :root, body, html {
    font-family: 'Roboto', sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`;

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
  background-color: #DC0A2D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DetailHeader = styled.img`
  width: 100%;
  height: 50px;
  display: block;

  @media (max-width: 768px) {
    height: 50px;
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;

const SideDetail = styled.img`
  position: fixed;
  right: 0;
  top: -5%;
  width: 50px;
  height: 110%;
  object-fit: cover;
  z-index: 1;

  @media (max-width: 768px) {
    width: 40px;
    top: -5%;
    height: 110%;
  }

  @media (max-width: 480px) {
    width: 30px;
    top: -5%;
    height: 110%;
  }
`;

const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  flex: 1;
  padding: 20px;
  margin: 20px auto 0 auto;
  width: 90%;
  max-width: 1200px;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 140px);

  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px auto 0 auto;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 10px auto 0 auto;
    width: 100%;
    border-radius: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.background};
  z-index: 3;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #DC0A2D;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const LoadingSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.border};
  border-top: 4px solid #DC0A2D;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  font-family: 'Roboto', sans-serif;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin: 5px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const BackToTopButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 200px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    border-width: 2px;
    width: 180px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
    border-width: 2px;
    width: 150px;
  }
`;

const GameButton = styled(Link)`
  padding: 8px;
  font-size: 14px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 150px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 12px;
    border-width: 2px;
    width: 130px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 10px;
    border-width: 2px;
    width: 110px;
  }
`;

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

  React.useEffect(() => {
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

function AppContent() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Header />
          <DetailHeader src={detailHeader} alt="header detail" />
          <SideDetail src={sideDetail} alt="side detail" />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<PokemonListWithModal />} />
              <Route path="/pokemon/:id" element={<PokemonListWithModal />} />
              <Route path="/whos-that-pokemon" element={<WhosThatPokemon />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </Router>
      </AppContainer>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AppContent />
      </Suspense>
    </CustomThemeProvider>
  );
}

export default App;