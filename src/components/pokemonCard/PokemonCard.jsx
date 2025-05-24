import React, { useState, Suspense } from 'react';
import { Card, Image, Name, NumberCapsule, ContainerType, Type } from './PokemonCardStyles';
const PokemonModal = React.lazy(() => import('../PokemonModal/PokemonModal'));

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