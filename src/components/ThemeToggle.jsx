import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #2196F3;
  }

  &:checked + .slider:before {
    transform: translateX(26px);
    background-position: right center;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #232323;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 30px;
    width: 30px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    background-image: url(${props => props.themeToggleIcon || '/src/assets/img/theme_toggle.png'});
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: left center;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

function ThemeToggle({ themeToggleIcon }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchContainer>
      <SwitchInput
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <Slider className="slider" />
    </SwitchContainer>
  );
}

export default ThemeToggle;