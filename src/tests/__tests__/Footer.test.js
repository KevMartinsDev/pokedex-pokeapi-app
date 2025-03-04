import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  test('renders copyright text correctly', () => {
    render(<Footer />);
    expect(screen.getByText('2025 Kevin Martins')).toBeInTheDocument();
  });

  test('is contained within a footer element and centered', () => {
    render(<Footer />);
    const footer = screen.getByText('2025 Kevin Martins').parentElement;
    expect(footer.tagName).toBe('FOOTER');
    expect(footer).toHaveStyle('text-align: center');
  });
});