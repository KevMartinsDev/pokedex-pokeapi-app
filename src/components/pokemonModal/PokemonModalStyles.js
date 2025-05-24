import styled from 'styled-components';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 10px;
  border: 3px solid #232323;
  width: 90%;
  max-width: 1000px;
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: 'Roboto', 'Arial', sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #DC0A2D;
  color: white;
  border: 2px solid #232323;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: 'Roboto', 'Arial', sans-serif;

  &:hover {
    background-color: #ff1a3d;
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 15px;
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 15px;
  background-color: ${({ theme }) => theme.cardBackground};
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const PokemonName = styled.h2`
  margin: 0;
  font-size: 24px;
  text-transform: capitalize;
  font-family: 'Roboto', 'Arial', sans-serif;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const TypeTags = styled.div`
  display: flex;
  gap: 5px;
`;

const TypeTag = styled.span`
  padding: 3px 6px;
  background-color: ${({ type }) => typeColors[type] || '#777'};
  color: white;
  border-radius: 3px;
  font-size: 12px;
  text-transform: capitalize;
  font-family: 'Roboto', sans-serif;
`;

const StatsPanel = styled.div`
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 10px;
  width: 30%;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StatTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 14px;
  width: 100%;
  font-family: 'Roboto', 'Arial', sans-serif;
`;

const StatTag = styled.span`
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 3px;
  font-size: 12px;
  text-transform: capitalize;
  font-family: 'Roboto', 'Arial', sans-serif;
`;

const MatchupPanel = styled.div`
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  max-width: 30%;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const MatchupSection = styled.div`
  margin-bottom: 10px;
`;

const MatchupTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-family: 'Roboto', 'Arial', sans-serif;
`;

const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const ListsSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const AbilitiesPanel = styled.div`
  flex: 1;
  min-width: 200px;
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 10px;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const MovesPanel = styled.div`
  flex: 1;
  min-width: 200px;
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 10px;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  margin: 0;

  @media (max-width: 480px) {
    max-height: 120px;
  }
`;

const ListItem = styled.li`
  padding: 8px;
  margin: 5px 0;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};
  border-radius: 5px;
  cursor: pointer;
  text-transform: capitalize;
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const DescriptionPanel = styled.div`
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};
`;

const DescriptionText = styled.p`
  margin: 0;
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 16px;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export {
  ModalContent,
  ModalOverlay,
  CloseButton,
  HeaderSection,
  ImageContainer,
  PokemonImage,
  PokemonName,
  TypeTags,
  TypeTag,
  StatsPanel,
  StatSection,
  StatTitle,
  StatTag,
  MatchupPanel,
  MatchupSection,
  MatchupTitle,
  TypeList,
  ListsSection,
  AbilitiesPanel,
  MovesPanel,
  List,
  ListItem,
  DescriptionPanel,
  DescriptionText
};