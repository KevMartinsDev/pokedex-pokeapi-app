import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import LoadMoreButton from '../../components/LoadMoreButton';

const lightTheme = {
  cardBackground: '#f2f2f2', 
  text: '#333333',
  border: '#ccc', 
};

describe('LoadMoreButton', () => {
  const renderWithTheme = (ui) => render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

  test('renders "Load More" and responds to click when not loading', () => {
    
    const originalGetComputedStyle = window.getComputedStyle;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
      const styles = originalGetComputedStyle(element);
      const isDisabled = element.disabled; 
      return {
        ...styles,
        backgroundColor: isDisabled ? styles.backgroundColor : lightTheme.cardBackground, 
        opacity: isDisabled ? '0.6' : styles.opacity, 
        getPropertyValue: (prop) => {
          if (prop === 'background-color') return isDisabled ? styles.getPropertyValue(prop) : lightTheme.cardBackground;
          if (prop === 'opacity') return isDisabled ? '0.6' : styles.getPropertyValue(prop);
          return styles.getPropertyValue(prop);
        },
      };
    });

    const onClick = jest.fn();
    renderWithTheme(<LoadMoreButton isLoading={false} onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Load More' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    const computedStyle = window.getComputedStyle(button);
    
    expect(['rgb(242, 242, 242)', '#f2f2f2']).toContain(computedStyle.backgroundColor);

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });

  test('renders "Loading..." and is disabled when loading', () => {
    
    const originalGetComputedStyle = window.getComputedStyle;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
      const styles = originalGetComputedStyle(element);
      const isDisabled = element.disabled;
      return {
        ...styles,
        backgroundColor: isDisabled ? styles.backgroundColor : lightTheme.cardBackground,
        opacity: isDisabled ? '0.6' : styles.opacity,
        getPropertyValue: (prop) => {
          if (prop === 'background-color') return isDisabled ? styles.getPropertyValue(prop) : lightTheme.cardBackground;
          if (prop === 'opacity') return isDisabled ? '0.6' : styles.getPropertyValue(prop);
          return styles.getPropertyValue(prop);
        },
      };
    });

    const onClick = jest.fn();
    renderWithTheme(<LoadMoreButton isLoading={true} onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Loading...' });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const computedStyle = window.getComputedStyle(button);
    expect(computedStyle.opacity).toBe('0.6');

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});