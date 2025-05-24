import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SwitchContainer, SwitchInput, Slider } from './ThemeToggleStyles';

function ThemeToggle({ themeToggleIcon }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchContainer>
      <SwitchInput
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <Slider className="slider" themeToggleIcon={themeToggleIcon} />
    </SwitchContainer>
  );
}

export default ThemeToggle;