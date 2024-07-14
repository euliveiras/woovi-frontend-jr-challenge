import Button from "@mui/material/Button";
import { QRCodeSVG } from "qrcode.react";
import { Option } from "@mui/base/Option";
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
import { MenuItem } from "@mui/material";

const steps = [{ label: "1ª entrada no Pix" }, { label: "2ª no cartão" }];

type QrCodeStepProps = { value: string; qrCodeValue: string };
type CustomSelectProps = { value: number; installment: number };

function CustomSelect({ installment, value }: CustomSelectProps) {
  const [searchParams] = useSearchParams();
  const currency = searchParams.get("currency");
  const arr = Array.from(Array(installment).keys()).map((n) => ++n);
  return (
    <Select defaultValue={1}>
      {arr.map((val) => {
        return (
          <MenuItem value={val}>
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
}: {
  installment: number;
  value: number;
}) {
  return (
    <form className="mt-2 flex flex-col gap-2">
      <CustomInput label="Nome completo" />
      <CustomInput label="CPF" />
      <CustomInput label="Número do cartão" />
      <span className="flex gap-4">
        <CustomInput label="Vencimento" />
        <CustomInput label="CVV" />
      </span>
      <CustomSelect value={value} installment={installment} />
      <div className="w-full py-2">
        <Button fullWidth variant="contained" type="submit">
          Pagar
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
        onConfirm={() => {}}
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
      <CreditCardStep
        value={lastPaymentValue}
        installment={Number(installment)}
      />
      {/*isFirstPaymentConfirmed ? (
        <CreditCardStep
          value={lastPaymentValue}
          installments={Number(installments)}
        />
      ) : (
        <QrCodeStep value={firstPayment} qrCodeValue={qrCodeValue.toString()} />
      )*/}
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
