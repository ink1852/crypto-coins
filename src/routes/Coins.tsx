import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

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

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  }) as { isLoading: boolean; data: ICoins[] };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Coins</title>
          </Helmet>
          <CoinsList>
            {data.slice(0, 30).map((coin) => (
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
        </>
      )}
    </>
  );
}

export default Coins;
