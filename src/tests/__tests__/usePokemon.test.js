import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import usePokemon from '../../services/usePokemon';

describe('usePokemon', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => {}),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('initializes with default states', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    const { result } = renderHook(() => usePokemon({ skipInitialLoad: true }));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.displayedPokemons).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.sortOrder).toBe('id-asc');
  });

  test('searches Pokémon successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        name: 'pikachu',
        id: 25,
        sprites: { other: { 'official-artwork': { front_default: 'pikachu.png' } } },
        types: [{ type: { name: 'electric' } }],
      }),
    });

    const { result } = renderHook(() => usePokemon({ skipInitialLoad: true }));

    await act(async () => {
      await result.current.searchPokemon('pikachu');
    });

    await waitFor(() => {
      expect(result.current.displayedPokemons).toHaveLength(1);
      expect(result.current.displayedPokemons[0].name).toBe('pikachu');
      expect(result.current.displayedPokemons[0].id).toBe(25);
      expect(result.current.displayedPokemons[0].types).toContain('electric');
    }, { timeout: 2000 });
  });

  test('sets error if Pokémon not found', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Pokémon not found!'));

    const { result } = renderHook(() => usePokemon({ skipInitialLoad: true }));

    await act(async () => {
      await result.current.searchPokemon('unknown');
    });

    await waitFor(() => {
      expect(result.current.displayedPokemons).toHaveLength(0);
      expect(result.current.error).toBe('Pokémon not found'); 
    }, { timeout: 2000 });
  });
});