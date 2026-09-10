import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

interface CoinState {
  name: string;
  symbol: string;
}

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 50px;
  text-align: center;
`;
const OverView = styled.div`
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  background-color: ${(prop) => prop.theme.wrapperColor};
  border-radius: 16px;
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(prop) => prop.theme.textColor};
`;
const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    text-transform: uppercase;
  }
  span:first-child {
    margin-bottom: 8px;
    font-weight: 300;
    font-size: 14px;
  }
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
`;
const Tab = styled.div<{ $isActive: boolean }>`
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
  padding: 10px;
  background-color: ${(prop) => prop.theme.wrapperColor};
  border-radius: 12px;
  text-transform: uppercase;
  text-align: center;
  color: ${(prop) =>
    prop.$isActive ? prop.theme.accentColor : prop.theme.textColor};
`;
interface IToggleDark {
  isDark: boolean;
}
function Coin() {
  /* const { isDark } = useOutletContext<IToggleDark>(); */

  const { coinId } = useParams() as { coinId: string }; // coinId: string | undefined 라서 string으로 단언
  const { state } = useLocation() as { state: CoinState }; // state: unknown이라서 CoinState로 단언

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery({
    queryKey: [`info: ${coinId}`],
    queryFn: () => fetchCoinInfo(coinId),
  });

  const { isLoading: tickersLoading, data: tickersData } = useQuery({
    queryKey: [`tickers: ${coinId}`],
    queryFn: () => fetchCoinTickers(coinId),
  });
  const loading = infoLoading || tickersLoading;
  const navigate = useNavigate();
  useEffect(() => {
    navigate("price");
  }, []);
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Helmet>
            <title>
              {state?.name
                ? state?.name
                : loading
                  ? "Loading..."
                  : infoData?.name}
            </title>
          </Helmet>
          <Title>
            {state?.name
              ? state?.name
              : loading
                ? "Loading..."
                : infoData?.name}
            {/* state에서 받은 이름 값이 존재하면 그거 쓰고 아니었을 때 loading 검사 */}
          </Title>
          <OverView>
            <OverViewItem>
              <span>rank</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol</span>
              <span>${infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Price</span>
              <span>{tickersData?.quotes.USD.price.toFixed(4)}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>total supply</span>
              <span>{tickersData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>max supply</span>
              <span>{tickersData?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Link to={`price`}>
              <Tab $isActive={priceMatch !== null}>Price</Tab>
            </Link>
            <Link to={`chart`}>
              <Tab $isActive={chartMatch !== null}>Chart</Tab>
            </Link>
          </Tabs>

          <Outlet context={{ coinId: coinId }} />
        </>
      )}
    </>
  );
}

export default Coin;
