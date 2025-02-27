import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '../../components/PokemonCard';
import PokemonList from '../../components/PokemonList';
import LoadMoreButton from '../../components/LoadMoreButton';
import SearchField from '../../components/SearchField';
import ThemeToggle from '../../components/ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));
jest.mock('../../assets/img/theme_toggle.png', () => 'mocked-theme-toggle.png');

describe('Components', () => {
  const renderWithThemeProvider = (ui) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  describe('PokemonCard', () => {
    const pokemon = {
      id: 1,
      name: 'bulbasaur',
      image: 'bulbasaur.png',
      types: ['grass', 'poison'],
      sprites: {
        front_default: 'fallback.png',
        back_default: 'back.png',
      },
    };

    test('renderiza dados do Pokémon corretamente', () => {
      render(<PokemonCard pokemon={pokemon} />);
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'bulbasaur.png');
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('poison')).toBeInTheDocument();
    });

    test('muda para imagem de fallback se a principal falhar', () => {
      render(<PokemonCard pokemon={pokemon} />);
      const img = screen.getByAltText('bulbasaur');
      fireEvent.error(img);
      expect(img).toHaveAttribute('src', 'fallback.png');
    });

    test('renderiza sem tipos se não houver tipos', () => {
      const noTypesPokemon = { ...pokemon, types: [] };
      render(<PokemonCard pokemon={noTypesPokemon} />);
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.queryByText('grass')).not.toBeInTheDocument();
    });
  });

  describe('PokemonList', () => {
    const pokemons = [
      { id: 1, name: 'bulbasaur', image: 'b.png', types: ['grass'] },
      { id: 2, name: 'ivysaur', image: 'i.png', types: ['grass'] },
    ];

    test('renderiza lista de Pokémon', () => {
      render(<PokemonList pokemons={pokemons} />);
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('#2')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });

    test('renderiza botão de carregar mais quando fornecido', () => {
      const loadMoreButton = <button>Carregar mais</button>;
      render(<PokemonList pokemons={pokemons} loadMoreButton={loadMoreButton} />);
      expect(screen.getByText('Carregar mais')).toBeInTheDocument();
    });

    test('não quebra com lista vazia', () => {
      render(<PokemonList pokemons={[]} />);
      expect(screen.queryByText('#1')).not.toBeInTheDocument();
    });
  });

  describe('LoadMoreButton', () => {
    test('mostra texto normal quando não está carregando', () => {
      const onClick = jest.fn();
      render(<LoadMoreButton isLoading={false} onClick={onClick}>Carregar</LoadMoreButton>);
      expect(screen.getByText('Carregar')).toBeInTheDocument();
      expect(screen.getByRole('button')).not.toBeDisabled();
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    test('mostra "Carregando..." e desabilita quando está carregando', () => {
      const onClick = jest.fn();
      render(<LoadMoreButton isLoading={true} onClick={onClick}>Carregar</LoadMoreButton>);
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('SearchField', () => {
    test('renderiza input e botão', () => {
      render(<SearchField onSearch={() => {}} />);
      expect(screen.getByPlaceholderText('Buscar Pokémon por nome ou ID')).toBeInTheDocument();
      expect(screen.getByText('Buscar')).toBeInTheDocument();
    });

    test('chama onSearch ao pressionar Enter', () => {
      const onSearch = jest.fn();
      render(<SearchField onSearch={onSearch} />);
      const input = screen.getByPlaceholderText('Buscar Pokémon por nome ou ID');
      fireEvent.change(input, { target: { value: 'pikachu' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(onSearch).toHaveBeenCalledWith('pikachu');
    });

    test('chama onSearch ao clicar no botão', () => {
      const onSearch = jest.fn();
      render(<SearchField onSearch={onSearch} />);
      const input = screen.getByPlaceholderText('Buscar Pokémon por nome ou ID');
      fireEvent.change(input, { target: { value: 'pikachu' } });
      fireEvent.click(screen.getByText('Buscar'));
      expect(onSearch).toHaveBeenCalledWith('pikachu');
    });

    test('chama onSearch com debounce ao digitar', () => {
      const onSearch = jest.fn();
      render(<SearchField onSearch={onSearch} />);
      const input = screen.getByPlaceholderText('Buscar Pokémon por nome ou ID');
      fireEvent.change(input, { target: { value: 'pika' } });
      expect(onSearch).toHaveBeenCalledWith('pika');
    });
  });

  describe('ThemeToggle', () => {
    test('renderiza o slider corretamente', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const slider = screen.getByRole('checkbox');
      expect(slider).toBeInTheDocument();
      expect(slider).not.toBeChecked();
    });

    test('alterna o tema ao clicar no slider', () => {
      renderWithThemeProvider(<ThemeToggle />);
      const slider = screen.getByRole('checkbox');

      expect(slider).not.toBeChecked();

      fireEvent.click(slider);
      expect(slider).toBeChecked();

      fireEvent.click(slider);
      expect(slider).not.toBeChecked();
    });

    test('renderiza o slider com a estrutura esperada', () => {
      const { container } = renderWithThemeProvider(<ThemeToggle />);
      const slider = screen.getByRole('checkbox');
      const sliderSpan = slider.nextElementSibling;
      expect(slider).toBeInTheDocument();
      expect(sliderSpan).toBeInTheDocument();
      expect(sliderSpan).toHaveClass('slider');

      const computedStyles = window.getComputedStyle(sliderSpan);
      expect(computedStyles.backgroundColor).toBe('rgb(35, 35, 35)'); // #232323
    });
  });
});