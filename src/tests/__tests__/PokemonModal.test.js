import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import PokemonModal from '../../components/PokemonModal/PokemonModal';

const lightTheme = { cardBackground: '#f2f2f2', text: '#333333', border: '#ccc' };

global.fetch = jest.fn();

describe('PokemonModal', () => {
  const renderWithTheme = (ui) => render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
  const mockPokemon = { id: 1, image: 'bulbasaur.png', name: 'bulbasaur' };

  beforeEach(() => jest.clearAllMocks());

  test('shows loading state initially', async () => {
    fetch.mockImplementation(() => new Promise(() => {})); 
    renderWithTheme(<PokemonModal pokemon={mockPokemon} onClose={jest.fn()} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders Pokémon details and handles ability click', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          name: 'bulbasaur',
          abilities: [{ ability: { name: 'overgrow', url: '/ability/overgrow' } }],
          moves: [{ move: { name: 'tackle', url: '/move/tackle' } }],
          types: [{ type: { name: 'grass' } }],
          stats: [{ stat: { name: 'hp' }, base_stat: 45 }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          flavor_text_entries: [{ flavor_text: 'A strange seed...', language: { name: 'en' } }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          damage_relations: { double_damage_from: [{ name: 'fire' }], half_damage_from: [], no_damage_from: [] },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          effect_entries: [{ effect: 'Boosts grass moves', language: { name: 'en' } }],
        }),
      });

    await act(async () => {
      renderWithTheme(<PokemonModal pokemon={mockPokemon} onClose={jest.fn()} />);
    });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('overgrow')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('overgrow'));
    });

    await waitFor(() => {
      expect(screen.getByText('Boosts grass moves')).toBeInTheDocument();
    });
  });

  test('closes modal on button click', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ name: 'bulbasaur', abilities: [], moves: [], types: [], stats: [] }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ flavor_text_entries: [{ flavor_text: 'Test', language: { name: 'en' } }] }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ damage_relations: { double_damage_from: [], half_damage_from: [], no_damage_from: [] } }) });

    const onClose = jest.fn();
    await act(async () => {
      renderWithTheme(<PokemonModal pokemon={mockPokemon} onClose={onClose} />);
    });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

