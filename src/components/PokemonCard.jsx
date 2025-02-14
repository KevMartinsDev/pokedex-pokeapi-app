import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

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
`;

function PokemonCard({ pokemon }) {
  return (
    <CardContainer>

      <Card>
        <div>
          <Number>#{pokemon.id}</Number>
        </div>
        <div>
          <Image src={pokemon.image} alt={pokemon.name} />
        </div>
        <ContainerType>
          <div>
            <Name>{pokemon.name}</Name>
          </div>
          <Type>type</Type>
        </ContainerType>
      </Card>



    </CardContainer>
  );
}

export default PokemonCard;
