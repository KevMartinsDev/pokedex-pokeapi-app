import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const cleanText = (text) => {
  return text.replace(/[\f\n\r\t\v]/g, ' ');
};

export async function fetchPokemonDetails(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  if (!response.ok) throw new Error('Error loading Pokémon details');
  const data = await response.json();
  return {
    name: data.name,
    abilities: data.abilities.map((ability) => ({
      name: ability.ability.name,
      url: ability.ability.url,
    })),
    moves: data.moves.slice(0, 10).map((move) => ({
      name: move.move.name,
      url: move.move.url,
    })),
    types: data.types.map((type) => type.type.name),
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
}

export async function fetchPokemonDescription(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  if (!response.ok) throw new Error('Error loading Pokémon description');
  const data = await response.json();
  const flavorText = data.flavor_text_entries.find((entry) => entry.language.name === 'en');
  return flavorText ? cleanText(flavorText.flavor_text) : 'No description available.';
}

export async function fetchAbilityDescription(abilityUrl) {
  const response = await fetch(abilityUrl);
  if (!response.ok) throw new Error('Error loading ability description');
  const data = await response.json();
  const effectEntry = data.effect_entries.find((entry) => entry.language.name === 'en');
  return effectEntry ? cleanText(effectEntry.effect) : 'No ability description available.';
}

export async function fetchMoveDescription(moveUrl) {
  const response = await fetch(moveUrl);
  if (!response.ok) throw new Error('Error loading move description');
  const data = await response.json();
  const effectEntry = data.effect_entries.find((entry) => entry.language.name === 'en');
  return effectEntry ? cleanText(effectEntry.effect) : 'No move description available.';
}

export async function fetchTypeMatchups(types) {
  const typeData = await Promise.all(
    types.map(async (type) => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) throw new Error('Error loading type data');
      return await response.json();
    })
  );

  const weaknesses = new Set();
  const resistances = new Set();

  typeData.forEach((type) => {
    type.damage_relations.double_damage_from.forEach((t) => weaknesses.add(t.name));
    type.damage_relations.half_damage_from.forEach((t) => resistances.add(t.name));
    type.damage_relations.no_damage_from.forEach((t) => resistances.add(t.name));
  });

  resistances.forEach((type) => {
    if (weaknesses.has(type)) {
      weaknesses.delete(type);
      resistances.delete(type);
    }
  });

  return {
    weaknesses: Array.from(weaknesses),
    resistances: Array.from(resistances),
  };
}

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
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
`;

const PokemonName = styled.h2`
  margin: 0;
  font-size: 24px;
  text-transform: capitalize;
`;

const TypeTags = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const MatchupPanel = styled.div`
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 150px;
`;

const MatchupSection = styled.div`
  margin-bottom: 10px;
`;

const MatchupTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 14px;
`;

const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const TypeTag = styled.span`
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 3px;
  font-size: 12px;
`;

const ListsSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const AbilitiesPanel = styled.div`
  flex: 1;
  min-width: 200px;
`;

const MovesPanel = styled.div`
  flex: 1;
  min-width: 200px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 8px;
  margin: 5px 0;
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const StatsPanel = styled.div`
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};
  padding: 10px;
  border-radius: 5px;
  width: 150px;
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
`;

const StatTag = styled.span`
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 3px;
  font-size: 12px;
`;

const DescriptionPanel = styled.div`
  background-color: ${({ theme }) => theme.cardBackground === '#f2f2f2' ? '#e0e0e0' : '#666666'};
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
`;

function PokemonModal({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [selectedMove, setSelectedMove] = useState(null);
  const [typeMatchups, setTypeMatchups] = useState({ weaknesses: [], resistances: [] });

  useEffect(() => {
    console.log('useEffect disparado com pokemon.id:', pokemon.id);
    const loadDetails = async () => {
      try {
        console.log('Iniciando fetchPokemonDetails');
        const pokemonDetails = await fetchPokemonDetails(pokemon.id);
        console.log('fetchPokemonDetails concluído:', pokemonDetails);
        const pokemonDesc = await fetchPokemonDescription(pokemon.id);
        console.log('fetchPokemonDescription concluído:', pokemonDesc);
        const matchups = await fetchTypeMatchups(pokemonDetails.types);
        console.log('fetchTypeMatchups concluído:', matchups);
        setDetails(pokemonDetails);
        setDescription(pokemonDesc);
        setTypeMatchups(matchups);
      } catch (error) {
        console.error('Erro no loadDetails:', error);
        setDescription('Error loading information.');
      }
    };
    loadDetails();
  }, [pokemon.id]);

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
        setDescription(abilityDesc);
      } catch (error) {
        console.error(error);
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

  console.log('Renderizando com description:', description);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {details && (
          <>
            <HeaderSection>
              <ImageContainer>
                <PokemonImage src={pokemon.image} alt={details.name} />
              </ImageContainer>
              <div>
                <PokemonName>{details.name}</PokemonName>
                <TypeTags>
                  {details.types.map((type) => (
                    <TypeTag key={type}>{type}</TypeTag>
                  ))}
                </TypeTags>
              </div>
              <StatsPanel>
                <StatSection>
                  <StatTitle>Base Stats</StatTitle>
                  <StatSection>
                    {details.stats.map((stat) => (
                      <StatTag key={stat.name}>{`${stat.name}: ${stat.value}`}</StatTag>
                    ))}
                  </StatSection>
                </StatSection>
              </StatsPanel>
              <MatchupPanel>
                <MatchupSection>
                  <MatchupTitle>Weak Against</MatchupTitle>
                  <TypeList>
                    {typeMatchups.weaknesses.length > 0 ? (
                      typeMatchups.weaknesses.map((type) => (
                        <TypeTag key={type}>{type}</TypeTag>
                      ))
                    ) : (
                      <TypeTag>None</TypeTag>
                    )}
                  </TypeList>
                </MatchupSection>
                <MatchupSection>
                  <MatchupTitle>Strong Against</MatchupTitle>
                  <TypeList>
                    {typeMatchups.resistances.length > 0 ? (
                      typeMatchups.resistances.map((type) => (
                        <TypeTag key={type}>{type}</TypeTag>
                      ))
                    ) : (
                      <TypeTag>None</TypeTag>
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
          </>
        )}
        <DescriptionPanel>
          <h3>
            {selectedAbility
              ? `${selectedAbility.name} Description`
              : selectedMove
              ? `${selectedMove.name} Description`
              : 'Pokémon Description'}
          </h3>
          <p>{description || 'Loading...'}</p>
        </DescriptionPanel>
      </ModalContent>
    </ModalOverlay>
  );
}

export default PokemonModal;