import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import PokemonModal from '../../components/PokemonModal';

const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  cardBackground: '#f2f2f2',
  border: '#ccc',
};

global.fetch = jest.fn();

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('PokemonModal', () => {
  const mockOnClose = jest.fn();
  const mockPokemon = { id: 4, image: 'charmander.png' };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {}));
    renderWithTheme(<PokemonModal pokemon={mockPokemon} onClose={mockOnClose} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders Pokémon details when API call is successful', async () => {
    const mockDetails = {
      name: 'charmander',
      abilities: [
        { ability: { name: 'blaze', url: 'url1' } },
        { ability: { name: 'solar-power', url: 'url2' } },
      ],
      moves: [
        { move: { name: 'scratch', url: 'url3' } },
        { move: { name: 'ember', url: 'url4' } },
      ],
      types: [{ type: { name: 'fire' } }],
      stats: [{ stat: { name: 'hp' }, base_stat: 39 }],
    };

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockDetails),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            flavor_text_entries: [{ flavor_text: 'Prefers hot places.', language: { name: 'en' } }],
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            damage_relations: {
              double_damage_from: [{ name: 'water' }],
              half_damage_from: [{ name: 'grass' }],
              no_damage_from: [],
            },
          }),
      });

    await act(async () => {
      renderWithTheme(<PokemonModal pokemon={mockPokemon} onClose={mockOnClose} />);
      jest.advanceTimersByTime(1000);
    });

    await waitFor(
      () => {
        expect(screen.getByText('charmander')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('blaze')).toBeInTheDocument();
    expect(screen.getByText('solar-power')).toBeInTheDocument();
    expect(screen.getByText('scratch')).toBeInTheDocument();
    expect(screen.getByText('ember')).toBeInTheDocument();
    expect(screen.getByText('hp: 39')).toBeInTheDocument();
    expect(screen.getByText('Prefers hot places.')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
  });

  test('renders error message when API call fails', async () => {
    fetch
      .mockRejectedValueOnce(new Error('Failed to fetch'))
      .mockRejectedValueOnce(new Error('Failed to fetch'))
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    await act(async () => {
      renderWithTheme(<PokemonModal pokemon={mockPokemon} onClose={mockOnClose} />);
      jest.advanceTimersByTime(1000);
    });

    await waitFor(
      () => {
        expect(screen.getByText('Error loading information.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});