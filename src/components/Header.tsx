import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(prop) => prop.theme.accentColor};
  font-size: 48px;
`;

function Header() {
  return (
    <>
      <Wrapper>
        <Link to={"/"}>
          <Title>Coins</Title>
        </Link>
      </Wrapper>
    </>
  );
}

export default Header;
