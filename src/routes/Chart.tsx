import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import styled from "styled-components";
import { useIsDark } from "../store";
interface Ihistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const ChartWrapper = styled.div`
  padding-bottom: 60px;
`;
interface IToggleDark {
  coinId: string;
}
function Chart() {
  const { isDark } = useIsDark();
  const { coinId } = useOutletContext<IToggleDark>();
  const { isLoading, data } = useQuery({
    queryKey: [`ohlcv: ${coinId}`],
    queryFn: () => fetchCoinHistory(coinId),
  }) as { isLoading: boolean; data: Ihistorical[] }; // 1)어차피 data를 갖고 와야지 로딩이 끝나고 로딩이 끝나야 차트를 보여주니까 타입 단언하는게 더 간단하다.

  /* 차트 설정 */
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      background: "transparent",
      type: "candlestick",
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  const series = [
    {
      name: "Price",
      data: data?.map((price) => {
        return {
          x: new Date(price.time_close * 1000),
          y: [price.open, price.high, price.low, price.close],
        };
      }), // 2)그래야 여기에 괜히 널 병합 연산자(??) 같은 거 안 써도 된다.
    },
  ];
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : data && data.length > 0 ? (
        <>
          <ChartWrapper>
            <ApexChart
              options={options}
              type="candlestick"
              series={series}
              height={400}
            />
          </ChartWrapper>
        </>
      ) : (
        <div>차트 데이터를 가져오지 못했습니다!</div>
      )}
    </>
  );
}

export default Chart;
