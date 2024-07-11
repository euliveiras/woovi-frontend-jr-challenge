import { useSearchParams } from "react-router-dom";
import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";

export function Payment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") ?? "0";

  const onNextStep = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.set("step", String(Number(step + 1)));
    setSearchParams(urlSearchParams);
  };

  return (
    <>
      {step === "0" && <FirstStep onNextStep={onNextStep} />}
      {step === "1" && <SecondStep />}
    </>
  );
}
