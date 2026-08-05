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
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  background-color: #242829;
  border-radius: 16px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface InfoProp {
  $content?: boolean;
}
const Info = styled.div<InfoProp>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(prop) => (prop.$content ? "24px" : "16px")};
  font-weight: ${(prop) => (prop.$content ? 500 : 300)};
  padding: ${(prop) => (prop.$content ? "16px" : 0)};
  padding-bottom: 0;
  text-transform: uppercase;
`;

const Description = styled.div`
  font-size: 18px;
  margin: 24px 0;
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
          <InfoContainer>
            <InfoBox>
              <Info>rank:</Info>
              <Info $content>{info?.rank}</Info>
            </InfoBox>
            <InfoBox>
              <Info>symbol:</Info>
              <Info $content>${info?.symbol}</Info>
            </InfoBox>
            <InfoBox>
              <Info>open_source:</Info>
              <Info $content>{info?.open_source ? "yes" : "no"}</Info>
            </InfoBox>
          </InfoContainer>
          <Description>{info?.description}</Description>
          <InfoContainer>
            <InfoBox>
              <Info>total supply:</Info>
              <Info $content>{priceInfo?.total_supply}</Info>
            </InfoBox>
            <InfoBox>
              <Info>max supply:</Info>
              <Info $content>{priceInfo?.max_supply}</Info>
            </InfoBox>
          </InfoContainer>
        </Wrapper>
      )}
    </>
  );
}

export default Coin;
