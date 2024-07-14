import {useMutation} from "@tanstack/react-query";
import { useCustomModal } from "../custom-modal";
import { CustomInput } from "./custom-input";
import { CustomSelect } from "./custom-select";
import  CircularProgress from "@mui/material/CircularProgress";
import { FormEvent, useRef } from "react";
import {useSearchParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {ErrorMessage} from "../error-message";

export function CreditCard({
  installment,
  value,
  onFinish,
}: {
  installment: number;
  value: number;
  onFinish(searchParams: URLSearchParams): void;
}) {
  const { Modal, showModal, isOpen, hideModal } = useCustomModal();
  const {
    Modal: ErrorModal,
    hideModal: hideErrorModal,
    isOpen: isErrorModalOpen,
    showModal: showErrorModal,
  } = useCustomModal();
  const ref = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mutation = useMutation({
    mutationFn: async (form: FormData) => {
      const headers = new Headers();
      headers.set("Content-type", "application/json");

      const res = await fetch(
        new URL(import.meta.env.VITE_SOCKET_URL) + "mock-payment/last",
        {
          body: JSON.stringify(Object.fromEntries(form)),
          headers,
          method: "POST",
        },
      );

      if (res.status < 200 || res.status >= 300) throw new Error();

      return res;
    },
    onSuccess: () => onFinish(searchParams),
    onError: () => showErrorModal(),
  });

  const onConfirm = () => {
    if (!ref.current) return;
    hideModal();
    const form = new FormData(ref.current);
    mutation.mutate(form);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showModal();
  };

  return (
    <form ref={ref} onSubmit={onSubmit} className="mt-2 flex flex-col gap-2">
      <ErrorModal
        onCancel={() => hideErrorModal()}
        CloseButton={
          <Button variant="contained" onClick={() => hideErrorModal()}>
            Voltar
          </Button>
        }
        open={isErrorModalOpen}
      >
        <ErrorMessage
          titleProps={{ className: "text-lg" }}
          title={"Algo deu errado! (╯°□°)╯︵ ┻━┻"}
          body={
            <p className="text-center">
              Por favor, entre e contato com o suporte e informe o número
              identificador: <strong>{id}</strong>
            </p>
          }
        />
      </ErrorModal>
      <Modal
        onCancel={() => hideModal()}
        CloseButton={
          <Button variant="outlined" onClick={hideModal}>
            Cancelar
          </Button>
        }
        ConfirmButton={
          <Button variant="contained" onClick={onConfirm}>
            Confirmar
          </Button>
        }
        open={isOpen}
      >
        <div className="flex w-full flex-col gap-4">
          {ref.current &&
            Array.from(new FormData(ref.current)).map(([key, value]) => (
              <span className="flex justify-between gap-1" key={key}>
                <p className="font-bold">{key}</p>
                <p>{value.toString()}</p>
              </span>
            ))}
        </div>
      </Modal>
      <CustomInput
        defaultValue={"matheus"}
        required
        name="name"
        label="Nome completo"
      />
      <CustomInput defaultValue={"matheus"} name="cpf" required label="CPF" />
      <CustomInput
        required
        defaultValue={"matheus"}
        name="card-number"
        label="Número do cartão"
      />
      <span className="flex gap-4">
        <CustomInput
          required
          defaultValue={"matheus"}
          name="card-due-date"
          label="Vencimento"
        />
        <CustomInput
          required
          defaultValue={"matheus"}
          name="card-cvv"
          label="CVV"
        />
      </span>
      <CustomSelect
        name="card-installments"
        value={value}
        installment={installment}
      />
      <div className="w-full py-2">
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <CircularProgress size={32} /> : "Pagar"}
        </Button>
      </div>
    </form>
  );
}
