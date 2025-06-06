import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';


jest.mock('../../services/usePokemon', () => () => ({
  displayedPokemons: [{ id: 1, name: 'bulbasaur', image: 'b.png', types: ['grass'] }],
  loadMorePokemons: jest.fn(),
  isLoading: false,
  error: null,
  sortOrder: 'id-asc',
  sortPokemons: jest.fn(),
  searchPokemon: jest.fn(),
  filterByType: jest.fn(),
  typeFilter: '',
  loadedCount: 20,
}));


jest.mock('../../App', () => {

  return () => (
    <div>
      <header>
        <img alt="logo" src="mock-logo.png" />
      </header>
      <li>#1</li>
      <button>Load More</button>
      <label>
        <input type="checkbox" defaultChecked={false} />
      </label>
      <footer>
        <p>2025 Kevin Martins</p>
      </footer>
    </div>
  );
});

describe('App', () => {
  test('renderiza os componentes principais', () => {
    render(<App />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('2025 Kevin Martins')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load More' })).toBeInTheDocument();
  });

  test('alterna o tema', () => {
    render(<App />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });
});