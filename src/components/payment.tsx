import { useSearchParams } from "react-router-dom";
import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";
import  Button from "@mui/material/Button";

function Component() {
  return (
    <div className="flex h-full flex-col items-center gap-4 py-12">
      <p>Digite o valor do pagamento</p>
      <div className="flex items-center gap-4">
      </div>
      <Button variant="contained" sx={{ marginTop: "auto" }}>
        <p className="normal-case">Prosseguir</p>
      </Button>
    </div>
  );
}

export function Payment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") ?? "0";

  const onNextStep = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.set("step", String(Number(step + 1)));
    setSearchParams(urlSearchParams);
  };

  return (
    <>
      {step === "0" && <Component />}
      {step === "1" && <FirstStep onNextStep={onNextStep} />}
      {step === "2" && <SecondStep />}
    </>
  );
}
