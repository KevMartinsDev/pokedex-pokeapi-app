import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  test('renders all images with correct alt texts', () => {
    render(<Header />);
    const detailImages = screen.getAllByAltText('detail_pokedex');
    expect(detailImages).toHaveLength(2); 
    expect(screen.getByAltText('logo')).toBeInTheDocument(); 
  });

  test('applies correct styles to header container', () => {
    render(<Header />);
    const header = screen.getByRole('banner'); 
    expect(header).toHaveStyle({
      'background-color': '#DC0A2D',
      padding: '20px',
      'max-width': '1200px',
    });
  });
});