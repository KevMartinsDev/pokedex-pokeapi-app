import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
const PokemonModal = React.lazy(() => import('./PokemonModal'));

const Card = styled.li`
  &.pokemon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 10px;
    border: 3px solid #232323;
    border-radius: 8px;
    padding: 25px 10px 10px 10px;
    width: 100%;
    max-width: 150px;
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    position: relative;
    font-family: 'Roboto', sans-serif;

    @media (max-width: 768px) {
      padding: 22px 8px 8px 8px;
      border-width: 2px;
    }

    @media (max-width: 480px) {
      max-width: 100%;
      margin: 5px 0;
      padding: 20px 5px 5px 5px;
      border-width: 2px;
    }
  }
`;

const ContainerType = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

const NumberCapsule = styled.span.attrs({ translate: 'no' })`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.cardBackground};
  border: 3px solid #232323;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  z-index: 1;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    top: -13px;
    padding: 2px 8px;
    font-size: 12px;
    border-width: 2px;
  }

  @media (max-width: 480px) {
    top: -11px;
    padding: 1px 6px;
    font-size: 10px;
    border-width: 2px;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  text-transform: capitalize;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 8px;
  }
`;

const Type = styled.span`
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  color: white;
  background-color: ${({ type }) => typeColors[type] || '#777'};
  text-transform: capitalize;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    padding: 3px;
    font-size: 10px;
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

function PokemonCard({ pokemon }) {
  const initialFallbacks = [
    pokemon.sprites?.front_default,
    pokemon.sprites?.back_default,
    pokemon.sprites?.front_shiny,
    pokemon.sprites?.back_shiny,
    'https://via.placeholder.com/120?text=No+Image',
  ].filter(Boolean);

  const [imageSrc, setImageSrc] = useState(pokemon.image);
  const [remainingFallbacks, setRemainingFallbacks] = useState(initialFallbacks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = () => {
    if (remainingFallbacks.length > 0) {
      const nextImage = remainingFallbacks[0];
      setImageSrc(nextImage);
      setRemainingFallbacks((prev) => prev.slice(1));
    }
  };

  const handleCardClick = () => {
    if (pokemon.id >= 1 && pokemon.id <= 1025) {
      setIsModalOpen(true);
    } else {
      console.error(`Invalid Pokémon ID: ${pokemon.id}. Modal not opened.`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!pokemon || !pokemon.id || !pokemon.name || !pokemon.image) {
    console.error('Insufficient data for Pokémon:', pokemon);
    return null;
  }

  return (
    <>
      <Card
        className="pokemon-card"
        role="button" 
        onClick={handleCardClick}
        aria-label={`View details of ${pokemon.name}`}
      >
        <NumberCapsule>#{pokemon.id}</NumberCapsule>
        <ContainerType>
          {pokemon.types && pokemon.types.map((type) => (
            <Type key={type} type={type}>{type}</Type>
          ))}
        </ContainerType>
        <Image
          src={imageSrc}
          alt={pokemon.name}
          onError={handleImageError}
        />
        <Name>{pokemon.name}</Name>
      </Card>
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <PokemonModal pokemon={pokemon} onClose={handleCloseModal} />
        </Suspense>
      )}
    </>
  );
}

export default PokemonCard;