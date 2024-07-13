import { useState } from "react";
import Button from "@mui/material/Button";
import CurrencyInput from "react-currency-input-field";

export function PaymentValue({
  onNextStep,
}: {
  onNextStep(urlSearchParams: URLSearchParams): void;
}) {
  const [value, setValue] = useState(3050000);
  const onConfirm = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("value", String(value));
    searchParams.set("currency", "BRL");
    searchParams.set("id", "id" + Math.random().toString(16).slice(2));
    onNextStep(searchParams);
  };
  return (
    <div className="flex h-full flex-col items-center gap-3 py-12">
      <p>Digite o valor do pagamento</p>
      <CurrencyInput
        id="input-example"
        name="input-name"
        placeholder="Please enter a number"
        value={value}
        allowNegativeValue={false}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        decimalsLimit={2}
        onValueChange={(value) => setValue(Number(value ?? 0))}
      />

      <Button
        variant="contained"
        sx={{ marginTop: "auto" }}
        disabled={value <= 0}
        onClick={onConfirm}
      >
        <p className="normal-case">Prosseguir</p>
      </Button>
    </div>
  );
}
