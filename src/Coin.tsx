import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(prop) => prop.theme.accentColor};
  font-size: 50px;
`;

function Coin() {
  const { coinId } = useParams();
  return (
    <>
      <Title>Coin: {coinId}</Title>
    </>
  );
}

export default Coin;
