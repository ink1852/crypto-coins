import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(prop) => prop.theme.bgColor};
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 16px;
`;
const Title = styled.h1`
  color: ${(prop) => prop.theme.accentColor};
  font-size: 48px;
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];
function Coins() {
  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        <CoinsList>
          {coins.map((coin) => (
            <Link to={`/${coin.symbol}`} key={coin.id}>
              <Coin>{coin.name} &rarr;</Coin>
            </Link>
          ))}
        </CoinsList>
      </Container>
    </>
  );
}

export default Coins;
