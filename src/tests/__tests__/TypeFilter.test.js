import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypeFilter from '../../components/typeFilter/TypeFilter';

describe('TypeFilter', () => {
  test('renders type options and triggers onFilter', () => {
    const onFilter = jest.fn();
    render(<TypeFilter onFilter={onFilter} currentFilter="" />);
    expect(screen.getByRole('combobox')).toHaveValue('');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fire' } });
    expect(onFilter).toHaveBeenCalledWith('fire');
  });
});