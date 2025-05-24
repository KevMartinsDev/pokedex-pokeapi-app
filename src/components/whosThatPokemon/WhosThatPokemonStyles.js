import styled from 'styled-components';
import { Link } from 'react-router-dom';


const GameContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 3px solid #232323;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 600px;
  position: relative;
`;

const SilhouetteImage = styled.img`
  width: 250px;
  height: 250px;
  filter: brightness(0%);
  margin: 20px auto;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 250px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 2px solid #232323;
  border-radius: 10px;
  list-style: none;
  padding: 5px 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 150px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin: 10px 0;
`;

const Stats = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin: 10px 0;
`;

const RestartButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  font-size: 18px;
  border: 3px solid #232323;
  border-radius: 20px;
  background-color: #DC0A2D;
  color: white;
  cursor: pointer;
  z-index: 20;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff3333;
  }
`;

const GameControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin: 5px 0;
  }
`;

const ReturnButton = styled(Link)`
  padding: 8px;
  font-size: 14px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 150px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 12px;
    border-width: 2px;
    width: 130px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 10px;
    border-width: 2px;
    width: 110px;
  }
`;

export {
  GameContainer,
  SilhouetteImage,
  InputContainer,
  Input,
  SuggestionsList,
  SuggestionItem,
  Button,
  Message,
  Stats,
  RestartButton,
  GameControlsWrapper,
  ReturnButton
};