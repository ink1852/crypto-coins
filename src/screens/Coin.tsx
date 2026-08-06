import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 50px;
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
`;
const OverViewItem = styled(Wrapper)`
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
  margin: 20px 0;
`;

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as { state: CoinState };
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setpriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setpriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Wrapper>
          <Title>{state?.name || "Loading..."}</Title>
          <OverView>
            <OverViewItem>
              <span>rank:</span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol:</span>
              <span>${info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>open_source:</span>
              <span>{info?.open_source ? "yes" : "no"}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>total supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>max supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverViewItem>
          </OverView>
        </Wrapper>
      )}
    </>
  );
}

export default Coin;
