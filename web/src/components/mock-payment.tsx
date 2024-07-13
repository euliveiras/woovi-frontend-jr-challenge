import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../utils/format-price";

export function MockPayment() {
  const [searchParams] = useSearchParams();
  const value = searchParams.get("value");
  const currency = searchParams.get("currency");

  const onConfirm = async () => {
    await fetch(new URL(import.meta.env.VITE_SOCKET_URL) + "mock-payment");
  };

  return (
    <div className="grid size-full place-content-center place-items-center gap-4 pb-12">
      <p>
        Valor:{" "}
        <strong className="text-body-gray-400">
          {formatPrice({ value: Number(value), currency })}
        </strong>
      </p>
      <Button onClick={onConfirm} variant="contained">
        Confirmar pagamento
      </Button>
    </div>
  );
}
