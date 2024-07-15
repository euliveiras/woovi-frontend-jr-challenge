import { RenderOptions, render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/router";
import { theme } from "../src/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement } from "react";
export * from '@testing-library/jest-dom/vitest'

const queryClient = new QueryClient();

const AllTheProviders = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });
// re-export everything
// override render method

export * from "@testing-library/react
export { customRender as render };
