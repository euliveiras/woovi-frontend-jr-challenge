import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { StepHeader } from "../step-header";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatPrice } from "../../utils/format-price";
import { stepper } from "./custom-stepper";
import { CustomAccordion } from "./custom-accordion";
import { WrapperWithDivider } from "./wrapper-with-divider";
import { useSocket } from "../use-socket";
import { useCustomModal } from "../custom-modal";
import { ErrorMessage } from "../error-message";
import { CustomInput } from "./custom-input";
import Select from "@mui/material/Select";
import { CircularProgress, MenuItem } from "@mui/material";
import { FormEvent, useRef } from "react";

const steps = [{ label: "1ª entrada no Pix" }, { label: "2ª no cartão" }];

type QrCodeStepProps = { value: string; qrCodeValue: string };
type CustomSelectProps = { name: string; value: number; installment: number };

function CustomSelect({ name, installment, value }: CustomSelectProps) {
  const [searchParams] = useSearchParams();
  const currency = searchParams.get("currency");
  const arr = Array.from(Array(installment).keys()).map((n) => ++n);
  return (
    <Select name={name} defaultValue={1}>
      {arr.map((val) => {
        return (
          <MenuItem key={val} value={val}>
            {val}x{" "}
            {formatPrice({ value: Math.round(Number(value) / val), currency })}
          </MenuItem>
        );
      })}
    </Select>
  );
}

function CreditCardStep({
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

function QrCodeStep({ value, qrCodeValue }: QrCodeStepProps) {
  const onCopy = () => {
    navigator.clipboard.writeText(qrCodeValue);
  };

  return (
    <>
      <StepHeader className="leading-tight">
        <p>João, pague a entrada de {value} pelo Pix</p>
      </StepHeader>
      <section className="flex flex-col gap-4">
        <div className="mx-auto flex w-fit items-center justify-center rounded-md border-2 border-custom-green-400 p-4">
          <QRCodeSVG value={qrCodeValue} size={200} />
        </div>
        <div className="px-6 pb-2">
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            endIcon={<ContentCopyIcon />}
            onClick={onCopy}
          >
            <p className="w-fit whitespace-nowrap font-semibold normal-case">
              Clique para copiar QR CODE
            </p>
          </Button>
        </div>
      </section>
    </>
  );
}

type PaymentPixCreditCardProps = {
  onNextStep(searchParams: URLSearchParams): void;
};
export function PaymentPixCreditCard({
  onNextStep,
}: PaymentPixCreditCardProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { events, isConnected } = useSocket();
  const { Modal } = useCustomModal();
  const isFirstPaymentConfirmed = events.includes("first-payment:read");

  const id = searchParams.get("id");
  const value = Number(searchParams.get("value"));
  const currency = searchParams.get("currency");
  const installment = searchParams.get("installment");
  const qrCodeValue = `${
    import.meta.env.VITE_API_URL
  }/mock-payment?value=${Math.round(value / 2)}&id=${id}`;

  const firstPayment = formatPrice({
    value: Math.round(value / 2),
    currency,
  });

  const lastPayment = formatPrice({
    value: value - Math.round(value / 2),
    currency,
  });

  const lastPaymentValue = value - Math.round(value / 2);

  return (
    <div className="size-full overflow-scroll">
      <Modal
        onCancel={() => {}}
        open={!isConnected}
        CloseButton={
          <Button variant="contained" onClick={() => navigate(0)}>
            Atualizar página
          </Button>
        }
      >
        <ErrorMessage
          titleProps={{ className: "text-lg" }}
          title={"Algo deu errado! (╯°□°)╯︵ ┻━┻"}
        />
      </Modal>
      {isFirstPaymentConfirmed ? (
        <CreditCardStep
          value={lastPaymentValue}
          installment={Number(installment)}
          onFinish={() => onNextStep(searchParams)}
        />
      ) : (
        <QrCodeStep value={firstPayment} qrCodeValue={qrCodeValue.toString()} />
      )}
      <div className="flex flex-col items-center font-extrabold">
        <p className="text-sm text-gray-400">Prazo de pagamento</p>
        <p className="text-xs">15/11/2021 - 08:17</p>
      </div>
      <div className="flex flex-col">
        <WrapperWithDivider>
          <stepper.Container
            activeStep={isFirstPaymentConfirmed ? 1 : 0}
            className="w-full"
          >
            <stepper.Step key={steps[0].label}>
              <stepper.StepLabel>{steps[0].label}</stepper.StepLabel>
              <stepper.StepContent>{firstPayment}</stepper.StepContent>
            </stepper.Step>
            <stepper.Step key={steps[1].label}>
              <stepper.StepLabel>{steps[1].label}</stepper.StepLabel>
              <stepper.StepContent>{lastPayment}</stepper.StepContent>
            </stepper.Step>
          </stepper.Container>
        </WrapperWithDivider>
        <WrapperWithDivider>
          <span className="flex w-full items-center justify-between">
            <p className="text-xs font-semibold">CET: 0,5%</p>
            <p className="text-sm font-extrabold">
              Total: {formatPrice({ value: value, currency })}
            </p>
          </span>
        </WrapperWithDivider>
        <WrapperWithDivider>
          <CustomAccordion />
        </WrapperWithDivider>
      </div>
      <span className="block pt-4 text-center font-bold leading-tight">
        <p className="text-xs text-gray-400">Identificador:</p>
        <p className="text-sm">{id}</p>
      </span>
    </div>
  );
}
