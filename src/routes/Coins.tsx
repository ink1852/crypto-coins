import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

const CoinsList = styled.ul``;
const Img = styled.img`
  height: 40px;
  margin-right: 8px;
  border-radius: 50%;
`;
const Coin = styled.li`
  color: ${(prop) => prop.theme.textColor};
  font-size: 18px;
  transition: all 0.1s ease-in-out;
`;
const CoinWrapper = styled.div`
  background-color: ${(prop) => prop.theme.wrapperColor};
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.15);
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
                    src={`https://img.magnific.com/free-psd/bitcoin-3d-logo-purple-orb_84443-56206.jpg?semt=ais_hybrid&w=740&q=80`}
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
