import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout.tsx";
import Coins from "./Coins.tsx";
import Coin from "./Coin.tsx";
import Price from "./Price.tsx";
import Chart from "./Chart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Coins />,
      },
      {
        path: ":coinId/",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
            errorElement: (
              <>
                <h1>데이터 갖고 오기 실패!</h1>
              </>
            ),
          },
        ],
      },
    ],
    errorElement: (
      <>
        <h1>404 Not Found in the system</h1>
      </>
    ),
  },
]);

export default router;
