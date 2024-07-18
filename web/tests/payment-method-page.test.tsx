import { beforeAll, describe, expect, test } from "vitest";
import { render, screen } from "./test-utils";
import { PaymentMethod } from "../src/components/payment-method";
import { MemoryRouter } from "react-router-dom";
import { formatPrice } from "../src/utils/format-price";
import { calculateFee } from "../src/utils/calculate-fee";
import { installMents } from "../src/utils/installmentsNumber";

describe("Payment method page", async () => {
  const value = 13909123;
  const currency = "BRL";
  beforeAll(() => {
    render(
      <MemoryRouter
        initialEntries={[`/payment?value=${value}&currency=${currency+1}`]}
      >
        <PaymentMethod onNextStep={() => {}} />
      </MemoryRouter>,
    );
  });
  installMents.forEach((installment) => {
    test(`it should contain a p element with ${formatPrice({
      value: calculateFee(String(value), 2) / installment,
      currency,
    })} text`, () => {
      const element = screen.getByText(
        formatPrice({
          value: calculateFee(String(value), installment) / installment,
          currency,
        }),
        {
          collapseWhitespace: false,
        },
      );
      expect(element).toBeInTheDocument();
    });
  });
});
