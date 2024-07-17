import { useSearchParams } from "react-router-dom";
import { PaymentPixAndCreditCard } from "./payment-pix-and-credit-card";
import { PaymentPix } from "./payment-pix";

type PaymentPixCreditCardProps = {
  onNextStep(searchParams: URLSearchParams): void;
};

export function PaymentPixCreditCard({
  onNextStep,
}: PaymentPixCreditCardProps) {
  const [searchParams] = useSearchParams();
  const installment = Number(searchParams.get("installment"));

  return installment > 1 ? (
    <PaymentPixAndCreditCard onNextStep={onNextStep} />
  ) : (
    <PaymentPix onNextStep={onNextStep} />
  );
}
