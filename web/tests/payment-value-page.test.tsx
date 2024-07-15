import { expect, test } from "vitest";
import { render, screen } from "./test-utils";
import App from "../src/App";

test("loads and displays greeting", async () => {
  render(<App />);
  expect(screen.getByText("Prosseguir")).toBeInTheDocument();
});
