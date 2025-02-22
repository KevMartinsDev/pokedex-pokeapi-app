import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #DC0A2D;
  padding: 20px;
  margin-bottom: 20px;
  `;

const Logo = styled.img`
  width: 291px;
  height: 105px;
  `;

const Light_1_Style = styled.img`
  width: 110px;
  height: 110px;
  `;


const Light_3_Style = styled.img`
  width: 75px;
  height: 25px;
  `;


function Header() {
  return (
    <HeaderStyle>
      
      <Light_1_Style src="./src/assets/img/light_1.png" alt="detail_pokedex" />
      <Light_3_Style src="./src/assets/img/light_3.png" alt="detail_pokedex" />
      
      <Logo src="./src/assets/img/logo.png" alt="logo" />

    </HeaderStyle>
  );
}

export default Header;  