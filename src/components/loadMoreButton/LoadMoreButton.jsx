import React from 'react';
import {StyledButton} from './LoadMoreButtonStyles';

const LoadMoreButton = ({ onClick, isLoading }) => {
  return (
    <StyledButton onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load More'}
    </StyledButton>
  );
};

export default LoadMoreButton;