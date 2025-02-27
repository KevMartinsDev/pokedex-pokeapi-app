import React from 'react';
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
import usePokemon from './hooks/usePokemon';
import styled from 'styled-components';

const grow = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
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
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 10px;
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #DC0A2D;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div`
  height: 3px;
  width: 200px;
  background-color: #DC0A2D;
  border-radius: 5px;
  animation: ${grow} 2s ease-in-out forwards;

  @media (max-width: 768px) {
    height: 8px;
    width: 180px;
  }

  @media (max-width: 480px) {
    height: 6px;
    width: 150px;
  }
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <DetailHeader src="./src/assets/img/detail_header.png" alt="detail_header" />
        <SideDetail src="./src/assets/img/side_detail.png" alt="side_detail" />
        <ContentContainer>
          <ControlsWrapper>
            <SearchField onSearch={searchPokemon} />
            <SortSelect sortOrder={sortOrder} onSort={sortPokemons} />
            <TypeFilter onFilter={filterByType} currentFilter={typeFilter} />
            <ThemeToggle />
          </ControlsWrapper>
          <main>
            {isLoading && loadedCount <= 800 && (
              <LoadingContainer>
                <LoadingText>Loading</LoadingText>
                <ProgressBar />
              </LoadingContainer>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <PokemonList pokemons={displayedPokemons} loadMoreButton={
              <ButtonContainer>
                <LoadMoreButton onClick={loadMorePokemons} isLoading={isLoading}>
                  Load More
                </LoadMoreButton>
                {loadedCount > 10 && (
                  <BackToTopButton onClick={scrollToTop}>
                    Back to Top
                  </BackToTopButton>
                )}
              </ButtonContainer>
            } />
          </main>
        </ContentContainer>
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