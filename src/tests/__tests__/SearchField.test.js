import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchField from '../../components/searchField/SearchField';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('SearchField', () => {
  test('renders input and triggers search on change', () => {
    const onSearch = jest.fn();
    render(<SearchField onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });
});