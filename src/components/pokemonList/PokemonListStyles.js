import styled from 'styled-components';

const Ulstyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  width: 100%; 
  max-width: 1200px; 
  justify-items: center; 

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
  }
`;

export {Ulstyle};