import React from "react";

const LoadMoreButton = ({ onClick, isLoading, children }) => {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? "Carregando..." : children}
    </button>
  );
};

export default LoadMoreButton;