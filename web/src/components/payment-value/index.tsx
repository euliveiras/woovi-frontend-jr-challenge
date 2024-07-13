import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import CurrencyInput from "react-currency-input-field";

export function PaymentValue({
  onNextStep,
}: {
  onNextStep(urlSearchParams: URLSearchParams): void;
}) {
  const [value, setValue] = useState<string | undefined>("3050000");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (!value) return;
    searchParams.set("value", String(Number(value.replace(",", ""))));
    searchParams.set("currency", "BRL");
    searchParams.set("id", "id" + Math.random().toString(16).slice(2));
    onNextStep(searchParams);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full flex-col items-center gap-3 py-12"
    >
      <p>Digite o valor do pagamento</p>
      <CurrencyInput
        id="input-example"
        name="input-name"
        placeholder="Please enter a number"
        value={value}
        allowNegativeValue={false}
        allowDecimals
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        decimalsLimit={2}
        onValueChange={(value) => setValue(value)}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "auto" }}
        disabled={!value}
      >
        <p className="normal-case">Prosseguir</p>
      </Button>
    </form>
  );
}
