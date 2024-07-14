import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App.tsx";
import "./index.css";
import { theme } from "./theme.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Payment } from "./components/payment.tsx";
import { MockPayment } from "./components/mock-payment.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "mock-payment",
        element: <MockPayment />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
