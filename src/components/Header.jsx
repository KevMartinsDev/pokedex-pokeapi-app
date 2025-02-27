import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  align-items: flex-start;
  background-color: #DC0A2D;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  min-height: 150px; 

  @media (max-width: 768px) {
    padding: 15px;
    min-height: 120px; 
  }

  @media (max-width: 480px) {
    padding: 10px;
    min-height: 100px; 
  }
`;

const Light1Style = styled.img`
  width: 110px;
  height: 110px;
  position: absolute;
  left: 0;
  top: 20px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    top: 15px;
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    top: 10px;
  }
`;

const Light3Style = styled.img`
  width: 75px;
  height: 25px;
  position: absolute;
  left: 110px;
  top: 10px;

  @media (max-width: 768px) {
    width: 60px;
    height: 20px;
    left: 90px;
    top: 5px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 15px;
    left: 70px;
    top: 5px;
  }
`;

const Logo = styled.img`
  width: 291px;
  height: 105px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;

  @media (max-width: 768px) {
    width: 240px;
    height: 86px;
    top: 15px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 65px;
    top: 10px;
  }
`;

function Header() {
  return (
    <HeaderStyle>
      <Light1Style src="./src/assets/img/light_1.png" alt="detail_pokedex" />
      <Light3Style src="./src/assets/img/light_3.png" alt="detail_pokedex" />
      <Logo src="./src/assets/img/logo.png" alt="logo" />
    </HeaderStyle>
  );
}

export default Header;