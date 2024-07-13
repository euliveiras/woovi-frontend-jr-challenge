import { useSearchParams } from "react-router-dom";
import { PaymentMethod } from "./payment-method";
import { PaymentPixCreditCard } from "./payment-pix-credit-card";
import { PaymentValue } from "./payment-value";

export function Payment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") ?? "0";

  const onNextStep = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.set("step", String(Number(step) + 1));
    setSearchParams(urlSearchParams);
  };

  return (
    <>
      {step === "0" && <PaymentValue onNextStep={onNextStep} />}
      {step === "1" && <PaymentMethod onNextStep={onNextStep} />}
      {step === "2" && <PaymentPixCreditCard onNextStep={onNextStep} />}
    </>
  );
}
