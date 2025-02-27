// src/tests/__tests__/usePokemon.test.js
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import usePokemon, { fetchPokemonList, fetchPokemonByName } from '../../hooks/usePokemon';
import { jest } from '@jest/globals';

describe('usePokemon Hook and Functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    const localStorageMock = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    global.fetch.mockImplementation((url) => {
      if (url.includes('pokemon?limit')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
              ],
            }),
        });
      }
      if (url.includes('pokemon/1')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              name: 'bulbasaur',
              id: 1,
              sprites: { other: { 'official-artwork': { front_default: 'bulbasaur.png' } } },
              types: [{ type: { name: 'grass' } }],
            }),
        });
      }
      return Promise.resolve({ ok: false });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchPokemonList', () => {
    test('retorna lista de Pokémon corretamente', async () => {
      const mockResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchPokemonList(2, 0);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=2&offset=0');
      expect(result).toEqual([
        { name: 'bulbasaur', id: 1, url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', id: 2, url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ]);
    });

    test('lança erro se a resposta não for ok', async () => {
      global.fetch.mockResolvedValue({ ok: false });
      await expect(fetchPokemonList(2, 0)).rejects.toThrow("Erro ao carregar os Pokémons");
    });
  });

  describe('fetchPokemonByName', () => {
    test('retorna detalhes do Pokémon corretamente', async () => {
      const mockResponse = {
        name: 'pikachu',
        id: 25,
        sprites: {
          other: { 'official-artwork': { front_default: 'pikachu.png' } },
          front_default: 'pikachu-front.png',
        },
        types: [{ type: { name: 'electric' } }],
      };
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchPokemonByName('pikachu');
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
      expect(result).toEqual({
        name: 'pikachu',
        id: 25,
        image: 'pikachu.png',
        types: ['electric'],
        sprites: mockResponse.sprites,
      });
    });

    test('lança erro se o Pokémon não for encontrado', async () => {
      global.fetch.mockResolvedValue({ ok: false });
      await expect(fetchPokemonByName('unknown')).rejects.toThrow("Pokémon não encontrado!");
    });
  });

  describe('usePokemon Hook', () => {
    test('inicializa com estados padrão', async () => {
      const { result } = renderHook(() => usePokemon());
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.displayedPokemons).toHaveLength(1);
      expect(result.current.error).toBe(null);
      expect(result.current.sortOrder).toBe('id-asc');
      expect(result.current.page).toBe(1);
      expect(result.current.typeFilter).toBe('');
      expect(result.current.isSearchActive).toBe(false);
      expect(result.current.loadedCount).toBe(1);
    });

    test('define typeFilter ao filtrar por tipo', async () => {
      const { result } = renderHook(() => usePokemon());
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      await act(async () => {
        result.current.filterByType('grass');
      });
      expect(result.current.typeFilter).toBe('grass');
    });

    test('define isSearchActive ao buscar por nome', async () => {
      const { result } = renderHook(() => usePokemon());
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      await act(async () => {
        result.current.searchPokemon('pika');
      });
      expect(result.current.isSearchActive).toBe(true);
    });

    test('define sortOrder ao ordenar por ID', async () => {
      const { result } = renderHook(() => usePokemon());
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      await act(async () => {
        result.current.sortPokemons('id-asc');
      });
      expect(result.current.sortOrder).toBe('id-asc');
    });
  });
});