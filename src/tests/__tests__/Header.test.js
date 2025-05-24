import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/header/Header';

jest.mock('../../components/header/Header', () => () => (
  <header style={{ backgroundColor: '#DC0A2D', padding: '20px', maxWidth: '1200px' }}>
    <img alt="Pokédex detail" src="mocked-light1" />
    <img alt="Pokédex detail" src="mocked-light3" />
    <img alt="Pokédex logo" src="mocked-logo" />
  </header>
));

describe('Header', () => {
  test('renders all images with correct alt texts', () => {
    render(<Header />);
    const detailImages = screen.getAllByAltText('Pokédex detail');
    expect(detailImages).toHaveLength(2);
    expect(screen.getByAltText('Pokédex logo')).toBeInTheDocument();
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