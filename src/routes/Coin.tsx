import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  background-color: #242829;
  border-radius: 16px;
  font-size: 24px;
  margin-bottom: 20px;
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
  padding: 10px;
  background-color: #242829;
  border-radius: 12px;
  text-transform: uppercase;
  text-align: center;
  color: ${(prop) =>
    prop.$isActive ? prop.theme.accentColor : prop.theme.textColor};
`;

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const { state } = useLocation() as { state: CoinState };
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
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
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
              <span>rank:</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>open_source:</span>
              <span>{infoData?.open_source ? "yes" : "no"}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>total supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>max supply:</span>
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

          <Outlet />
        </>
      )}
    </>
  );
}

export default Coin;
