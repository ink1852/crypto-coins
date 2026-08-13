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

  const series = [
    {
      name: "Price",
      data: data?.map((price) => Number(price.close)), // line타입은 숫자만 받는다. 근데 api는 문자로 받아와서 바꿔주는 작업이 필요. 2)그래야 여기에 괜히 널 병합 연산자(??) 같은 거 안 써도 된다.
    },
  ];
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <>
          <ApexChart
            type="area"
            height={300}
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              theme: {
                mode: "dark",
              },
              stroke: {
                curve: "smooth",
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString().slice(0, 10),
                ), // Date()는 인자로 ms를 받는데 api 데이터는 초 단위이므로 1000을 곱해준 것
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#00fbf3"],
                  stops: [0, 100],
                },
              },
              colors: ["#10eb90"],
              tooltip: {
                y: {
                  formatter: (v) => `$${v.toFixed(2)}`,
                },
              },
            }}
            series={series}
          />
        </>
      )}
    </>
  );
}

export default Chart;
