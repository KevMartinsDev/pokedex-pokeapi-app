import React, { useState, useEffect } from 'react';
import {
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
  DescriptionText} from './PokemonModalStyles';
import { 
  fetchPokemonDetails, 
  fetchPokemonDescription, 
  fetchAbilityDescription, 
  fetchMoveDescription, 
  fetchTypeMatchups } from '../../services/PokemonModalUtils';

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