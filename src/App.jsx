import { Suspense, } from 'react';
import { HashRouter as Router,} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
import detailHeader from './assets/img/detail_header.png'; 
import sideDetail from './assets/img/side_detail.png';

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
            <AppRoutes />
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