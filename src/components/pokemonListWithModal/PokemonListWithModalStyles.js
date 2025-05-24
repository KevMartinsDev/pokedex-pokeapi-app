import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.background};
  z-index: 3;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #DC0A2D;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const LoadingSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.border};
  border-top: 4px solid #DC0A2D;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  font-family: 'Roboto', sans-serif;
`;

const ControlsWrapper = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const BackToTopButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 3px solid #232323;
  border-radius: 20px;
  width: 200px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    border-width: 2px;
    width: 180px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
    border-width: 2px;
    width: 150px;
  }
`;

const GameButton = styled(Link)`
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
  LoadingContainer,
  LoadingText,
  LoadingSpinner,
  ErrorMessage,
  ControlsWrapper,
  ButtonContainer,
  BackToTopButton,
  GameButton
};