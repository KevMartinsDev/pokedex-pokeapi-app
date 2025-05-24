import React from 'react';
import { HeaderStyle, Light1Style, Light3Style, Logo } from './HeaderStyles';
import light1 from '../../assets/img/light_1.png';
import light3 from '../../assets/img/light_3.png';
import logo from '../../assets/img/logo.png';

function Header() {
  return (
    <HeaderStyle>
      <Light1Style src={light1} alt="Pokédex detail" />
      <Light3Style src={light3} alt="Pokédex detail" />
      <Logo src={logo} alt="Pokédex logo" />
    </HeaderStyle>
  );
}

export default Header;