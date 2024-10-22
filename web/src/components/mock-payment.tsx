import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../utils/format-price";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "./error-message";
import { SuccessMessage } from "./success-message";

export function MockPayment() {
  const [searchParams] = useSearchParams();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        new URL(import.meta.env.VITE_SOCKET_URL) + "mock-payment/first",
      );
      if (res.status < 200 || res.status >= 300) throw new Error();

      return res;
    },
  });

  const value = searchParams.get("value");
  const currency = searchParams.get("currency");

  const onConfirm = async () => mutation.mutate();

  return (
    <div className="grid size-full place-content-center place-items-center gap-4 pb-12">
      <div className="flex flex-col items-center gap-4">
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
          Confirmar pagamento
        </Button>
      </div>
      <div className="min-h-24">
        {mutation.isSuccess && (
          <SuccessMessage
            title="Pedido confirmado (＾▽＾)"
            body={<p className="text-sm">Você já pode fechar esta janela.</p>}
          />
        )}
        {mutation.isError && (
          <ErrorMessage
            title={"Algo deu errado (︶︹︶)"}
            body={<p className="text-sm">Tente atualizar a página.</p>}
          />
        )}
      </div>
    </div>
  );
}
