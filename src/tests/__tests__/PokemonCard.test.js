import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonCard from '../../components/PokemonCard';

jest.mock('../../components/PokemonModal', () => ({ pokemon, onClose }) => (
  <div data-testid="modal">Modal for {pokemon.name} <button onClick={onClose}>Close</button></div>
));

describe('PokemonCard', () => {
  const pokemon = {
    id: 1,
    name: 'bulbasaur',
    image: 'bulbasaur.png',
    types: ['grass', 'poison'],
    sprites: {
      front_default: 'fallback1.png',
      back_default: 'fallback2.png',
      front_shiny: 'fallback3.png',
      back_shiny: 'fallback4.png',
    },
  };

  test('renders Pokémon data with correct layout', () => {
    render(<PokemonCard pokemon={pokemon} />);
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'bulbasaur.png');
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  test('cycles through fallback images on error', () => {
    render(<PokemonCard pokemon={pokemon} />);
    const img = screen.getByAltText('bulbasaur');
    
    expect(img).toHaveAttribute('src', 'bulbasaur.png');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', 'fallback1.png');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', 'fallback2.png');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', 'fallback3.png');
  });

  test('opens modal on click', async () => {
    render(<PokemonCard pokemon={pokemon} />);
    const cardButton = screen.getByRole('button', { name: /View details of bulbasaur/i });
    
    fireEvent.click(cardButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Modal for bulbasaur');
    }, { timeout: 2000 });

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('returns null with invalid data', () => {
    const invalidPokemon = { id: 1, name: 'bulbasaur' };
    const { container } = render(<PokemonCard pokemon={invalidPokemon} />);
    expect(container.firstChild).toBeNull();
  });
});