import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout.tsx";
import Coins from "../Coins";
import Coin from "../screens/Coin.tsx";

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
        path: ":coinId",
        element: <Coin />,
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
