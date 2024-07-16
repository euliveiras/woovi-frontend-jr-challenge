import { beforeAll, describe, expect, test } from "vitest";
import { render, screen } from "./test-utils";
import { PaymentValue } from "../src/components/payment-value";
import { MemoryRouter } from "react-router-dom";

describe("Payment value page", async () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <PaymentValue onNextStep={() => {}} />
      </MemoryRouter>,
    );
  });
  test("it should contain a button with payment-value-proceed-button testid", () => {
    expect(
      screen.getByTestId("payment-value-proceed-button"),
    ).toBeInTheDocument();
  });
  test("it should contain a input with payment-value-input testid", () => {
    expect(screen.getByTestId("payment-value-input")).toBeInTheDocument();
  });
});
