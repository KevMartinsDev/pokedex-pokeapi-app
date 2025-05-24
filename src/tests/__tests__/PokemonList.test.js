import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonList from '../../components/PokemonList/PokemonList';

describe('PokemonList', () => {
  const pokemons = [
    { id: 1, name: 'bulbasaur', image: 'b.png', types: ['grass'] },
    { id: 2, name: 'ivysaur', image: 'i.png', types: ['grass'] },
  ];

  test('renders Pokémon list correctly', () => {
    render(<PokemonList pokemons={pokemons} />);
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  test('renders load more button when provided', () => {
    const loadMoreButton = <button>Load More</button>;
    render(<PokemonList pokemons={pokemons} loadMoreButton={loadMoreButton} />);
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  test('handles empty list', () => {
    render(<PokemonList pokemons={[]} />);
    expect(screen.queryByText('#1')).not.toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});