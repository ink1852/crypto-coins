import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "./components/Loading";

const CoinsList = styled.ul``;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 8px;
`;
const Coin = styled.li`
  color: ${(prop) => prop.theme.bgColor};
  font-size: 18px;
  transition: all 0.1s ease-in-out;
`;
const CoinWrapper = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  &:hover {
    ${Coin} {
      color: ${(prop) => prop.theme.accentColor};
      font-size: 20px;
    }
  }
`;

interface Coins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<Coins[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Link
              to={`/${coin.id}`}
              state={{ name: coin.name, symbol: coin.symbol }}
              key={coin.id}
            >
              <CoinWrapper>
                <Img
                  src={`https://cdn-icons-png.flaticon.com/512/1138/1138485.png`}
                />
                <Coin>{coin.name} &rarr;</Coin>
              </CoinWrapper>
            </Link>
          ))}
        </CoinsList>
      )}
    </>
  );
}

export default Coins;
