import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartProps {
  coinId: string;
}
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

function Chart() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery({
    queryKey: [`ohlcv: ${coinId}`],
    queryFn: () => fetchCoinHistory(coinId),
  }) as { isLoading: boolean; data: Ihistorical[] }; // 1)어차피 data를 갖고 와야지 로딩이 끝나고 로딩이 끝나야 차트를 보여주니까 타입 단언하는게 더 간단하다.

  /* const options =  */
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
      ) : (
        <>
          <ApexChart
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
                type: "candlestick",
                height: 350,
              },
              theme: {
                mode: "dark",
              },

              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
            type="candlestick"
            height={350}
            series={series}
          />
        </>
      )}
    </>
  );
}

export default Chart;
