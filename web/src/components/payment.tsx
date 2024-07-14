import { useSearchParams } from "react-router-dom";
import { PaymentMethod } from "./payment-method";
import { PaymentPixCreditCard } from "./payment-pix-credit-card";
import { PaymentValue } from "./payment-value";
import { PaymentFinished } from "./payment-finished";
import { MockPayment } from "./mock-payment";

export function Payment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") ?? "0";
  const mockPayment = searchParams.get("mock-payment");

  const onNextStep = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.set("step", String(Number(step) + 1));
    setSearchParams(urlSearchParams);
  };

  if (mockPayment) return <MockPayment />;

  return (
    <>
      {step === "0" && <PaymentValue onNextStep={onNextStep} />}
      {step === "1" && <PaymentMethod onNextStep={onNextStep} />}
      {step === "2" && <PaymentPixCreditCard onNextStep={onNextStep} />}
      {step === "3" && <PaymentFinished />}
    </>
  );
}
