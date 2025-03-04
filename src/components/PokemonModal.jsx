import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchPokemonDetails, fetchPokemonDescription, fetchAbilityDescription, fetchMoveDescription, fetchTypeMatchups } from './PokemonModalUtils';

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

function PokemonModal({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [selectedMove, setSelectedMove] = useState(null);
  const [typeMatchups, setTypeMatchups] = useState({ weaknesses: [], resistances: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        
        const pokemonDetails = await fetchPokemonDetails(pokemon.id);
        if (!pokemonDetails) throw new Error('No details returned');
        const pokemonDesc = await fetchPokemonDescription(pokemon.id);
        const matchups = await fetchTypeMatchups(pokemonDetails.types);
        
        setDetails(pokemonDetails);
        setDescription(pokemonDesc);
        setTypeMatchups(matchups);
      } catch (error) {
        console.error('Error loading details:', error.message);
        setError(error.message);
        return; 
      } finally {
        setIsLoading(false);
      }
    };
    if (pokemon && pokemon.id) {
      loadDetails();
    } else {
      setError('Invalid Pokémon data provided.');
      setIsLoading(false);
    }
  }, [pokemon]);

  const handleAbilityClick = async (ability) => {
    if (selectedAbility?.url === ability.url) {
      setSelectedAbility(null);
      setSelectedMove(null);
      setDescription(await fetchPokemonDescription(pokemon.id));
    } else {
      try {
        const abilityDesc = await fetchAbilityDescription(ability.url);
        setSelectedAbility(ability);
        setSelectedMove(null);
        setDescription(abilityDesc || 'No description available.');
      } catch (error) {
        console.error(`Error fetching ability ${ability.name}:`, error.message);
        setDescription('Error loading ability description.');
      }
    }
  };

  const handleMoveClick = async (move) => {
    if (selectedMove?.url === move.url) {
      setSelectedMove(null);
      setSelectedAbility(null);
      setDescription(await fetchPokemonDescription(pokemon.id));
    } else {
      try {
        const moveDesc = await fetchMoveDescription(move.url);
        setSelectedMove(move);
        setSelectedAbility(null);
        setDescription(moveDesc);
      } catch (error) {
        console.error(error);
        setDescription('Error loading move description.');
      }
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {isLoading && (
          <DescriptionPanel>
            <DescriptionText>Loading...</DescriptionText>
          </DescriptionPanel>
        )}
        {error && !isLoading && (
          <DescriptionPanel>
            <DescriptionText>{error}</DescriptionText>
          </DescriptionPanel>
        )}
        {details && !isLoading && !error && (
          <>
            <HeaderSection>
              <ImageContainer>
                <TypeTags>
                  {details.types.map((type) => (
                    <TypeTag key={type} type={type}>{type}</TypeTag>
                  ))}
                </TypeTags>
                <PokemonImage src={pokemon.image} alt={details.name} />
                <PokemonName>{details.name}</PokemonName>
              </ImageContainer>
              <StatsPanel>
                <StatSection>
                  <StatTitle>Base Stats</StatTitle>
                  {details.stats.map((stat) => (
                    <StatTag key={stat.name}>{`${stat.name}: ${stat.value}`}</StatTag>
                  ))}
                </StatSection>
              </StatsPanel>
              <MatchupPanel>
                <MatchupSection>
                  <MatchupTitle>Weak Against</MatchupTitle>
                  <TypeList>
                    {typeMatchups.weaknesses.length > 0 ? (
                      typeMatchups.weaknesses.map((type) => (
                        <TypeTag key={type} type={type}>{type}</TypeTag>
                      ))
                    ) : (
                      <TypeTag type="normal">None</TypeTag>
                    )}
                  </TypeList>
                </MatchupSection>
                <MatchupSection>
                  <MatchupTitle>Strong Against</MatchupTitle>
                  <TypeList>
                    {typeMatchups.resistances.length > 0 ? (
                      typeMatchups.resistances.map((type) => (
                        <TypeTag key={type} type={type}>{type}</TypeTag>
                      ))
                    ) : (
                      <TypeTag type="normal">None</TypeTag>
                    )}
                  </TypeList>
                </MatchupSection>
              </MatchupPanel>
            </HeaderSection>
            <ListsSection>
              <AbilitiesPanel>
                <h3>Abilities</h3>
                <List>
                  {details.abilities.map((ability) => (
                    <ListItem
                      key={ability.name}
                      onClick={() => handleAbilityClick(ability)}
                      style={{
                        fontWeight: selectedAbility?.name === ability.name ? 'bold' : 'normal',
                      }}
                    >
                      {ability.name}
                    </ListItem>
                  ))}
                </List>
              </AbilitiesPanel>
              <MovesPanel>
                <h3>Moves</h3>
                <List>
                  {details.moves.map((move) => (
                    <ListItem
                      key={move.name}
                      onClick={() => handleMoveClick(move)}
                      style={{
                        fontWeight: selectedMove?.name === move.name ? 'bold' : 'normal',
                      }}
                    >
                      {move.name}
                    </ListItem>
                  ))}
                </List>
              </MovesPanel>
            </ListsSection>
            <DescriptionPanel>
              <h3>
                {selectedAbility
                  ? `${selectedAbility.name} Description`
                  : selectedMove
                  ? `${selectedMove.name} Description`
                  : 'Pokémon Description'}
              </h3>
              <DescriptionText>{description || 'Loading...'}</DescriptionText>
            </DescriptionPanel>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

export default PokemonModal;