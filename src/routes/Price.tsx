import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Wrapper = styled.div`
  * {
    border-radius: 18px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding-bottom: 60px;
`;
const InfoWrapper = styled.div`
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(prop) => prop.theme.wrapperColor};
  padding: 12px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  span {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 18px;
    margin-bottom: 4px;
  }
`;
const Title = styled.h1`
  font-size: 30px;
`;
const OverView = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;
const OverViewItem = styled.div`
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
  padding: 16px 12px;
  background-color: ${(prop) => prop.theme.wrapperColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChangeValue = styled.div<{ $status?: string }>`
  display: flex;
  margin-top: 12px;
  justify-content: center;
  align-items: end;
  font-size: 36px;
  font-weight: 300;
  color: ${(prop) => prop.$status};
  span:first-child {
    margin-right: 12px;
  }
`;
function Price() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery({
    queryKey: [`tickers: ${coinId}`],
    queryFn: () => fetchCoinTickers(coinId),
  });
  const percentInfos = [
    { percent: Number(data?.quotes.USD.percent_change_15m), hour: "15분" },
    { percent: Number(data?.quotes.USD.percent_change_30m), hour: "30분" },
    { percent: Number(data?.quotes.USD.percent_change_1h), hour: "1시간" },
    { percent: Number(data?.quotes.USD.percent_change_6h), hour: "6시간" },
    { percent: Number(data?.quotes.USD.percent_change_12h), hour: "12시간" },
    { percent: Number(data?.quotes.USD.percent_change_24h), hour: "24시간" },
  ];

  return (
    <>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <Wrapper>
          <InfoWrapper>
            <Info>
              <span>{data?.last_updated.split("T")[0]}</span>
              <span>{data?.last_updated.split("T")[1].slice(0, -1)}</span>
            </Info>
            <Info>
              <span>Price</span>
              <Title>${data?.quotes.USD.price.toFixed(4)}</Title>
            </Info>
          </InfoWrapper>

          <OverView>
            {percentInfos.map((info) => {
              const status =
                info.percent < 0
                  ? "red"
                  : info.percent < 0.001
                    ? "gray"
                    : "green";
              return (
                <OverViewItem key={info.hour}>
                  <span>{info.hour} 전보다</span>
                  <ChangeValue $status={status}>
                    <span>{info.percent.toFixed(1)}%</span>
                    {info.percent < 0 ? (
                      <svg
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                        ></path>
                      </svg>
                    ) : info.percent < 0.001 ? (
                      <svg
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                        ></path>
                      </svg>
                    )}
                  </ChangeValue>
                </OverViewItem>
              );
            })}
          </OverView>
        </Wrapper>
      )}
    </>
  );
}

export default Price;
