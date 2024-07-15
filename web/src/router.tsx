import App from "./App.tsx";
import { createBrowserRouter } from "react-router-dom";
import { PageNotFound } from "./page-not-found";
import { Payment } from "./components/payment.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);
