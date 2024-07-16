import { beforeAll, describe, expect, test } from "vitest";
import { render, screen } from "./test-utils";
import { PaymentMethod } from "../src/components/payment-method";
import { MemoryRouter } from "react-router-dom";
import { formatPrice } from "../src/utils/format-price";

describe("Payment method page", async () => {
  const value = 13909123;
  const currency = "BRL";
  beforeAll(() => {
    render(
      <MemoryRouter
        initialEntries={[`/payment?value=${value}&currency=${currency}`]}
      >
        <PaymentMethod onNextStep={() => {}} />
      </MemoryRouter>,
    );
  });
  test(`it should contain a p element with ${formatPrice({ value, currency })} text`, () => {
    const element = screen.getByText(formatPrice({ value, currency }), {
      collapseWhitespace: false,
    });
    expect(element).toBeInTheDocument();
  });
});
