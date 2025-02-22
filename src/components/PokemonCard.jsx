import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.li`
  display: inline-block;
  text-align: center;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 150px;
`;

const ContainerType = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Number = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
`;

const Type = styled.span`
  padding: 5px;
  border-radius: 5px;
  background-color: #f2f2f2;
  color: #333;
  font-size: 12px;
`;

function PokemonCard({ pokemon }) {
  const [imageSrc, setImageSrc] = useState(pokemon.image);
  const fallbackImages = [
    pokemon.sprites?.front_default,
    pokemon.sprites?.back_default,
    pokemon.sprites?.front_shiny,
    pokemon.sprites?.back_shiny,
    'https://via.placeholder.com/120?text=No+Image',
  ];

  const handleImageError = () => {
    const nextImage = fallbackImages.shift();
    if (nextImage) {
      setImageSrc(nextImage);
    }
  };

  return (
    <Card>
      <div>
        <Number>#{pokemon.id}</Number>
      </div>
      <div>
        <Image
          src={imageSrc}
          alt={pokemon.name}
          onError={handleImageError}
        />
      </div>
      <div>
        <Name>{pokemon.name}</Name>
      </div>
      <ContainerType>
        {pokemon.types && pokemon.types.map((type) => (
          <Type key={type}>{type}</Type>
        ))}
      </ContainerType>
    </Card>
  );
}

export default PokemonCard;