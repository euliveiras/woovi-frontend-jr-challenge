import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../utils/format-price";
import { useMutation } from "@tanstack/react-query";

export function MockPayment() {
  const [searchParams] = useSearchParams();
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(new URL(import.meta.env.VITE_SOCKET_URL) + "mock-payment");
    },
  });

  const value = searchParams.get("value");
  const currency = searchParams.get("currency");

  const onConfirm = async () => mutation.mutate();

  return (
    <div className="grid size-full place-content-center place-items-center gap-4 pb-12">
      <p>
        Valor:{" "}
        <strong className="text-body-gray-400">
          {formatPrice({ value: Number(value), currency })}
        </strong>
      </p>
      <Button
        disabled={mutation.isPending || mutation.isSuccess}
        onClick={onConfirm}
        variant="contained"
      >
        {mutation.isSuccess ? "Pagamento confirmado" : "Confirmar pagamento"}
      </Button>
    </div>
  );
}
