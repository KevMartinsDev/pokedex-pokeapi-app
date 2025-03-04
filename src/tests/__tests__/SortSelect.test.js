import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortSelect from '../../components/SortSelect';

describe('SortSelect', () => {
  test('renders options and triggers onSort', () => {
    const onSort = jest.fn();
    render(<SortSelect sortOrder="id-asc" onSort={onSort} />);
    expect(screen.getByRole('combobox')).toHaveValue('id-asc');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'name-asc' } });
    expect(onSort).toHaveBeenCalledWith('name-asc');
  });
});