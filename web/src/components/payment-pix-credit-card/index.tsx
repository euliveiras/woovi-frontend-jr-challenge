import Button from "@mui/material/Button";
import { QRCodeSVG } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { StepHeader } from "../step-header";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../../utils/format-price";
import { stepper } from "./custom-stepper";
import { CustomAccordion } from "./custom-accordion";
import { WrapperWithDivider } from "./wrapper-with-divider";

const steps = [{ label: "1ª entrada no Pix" }, { label: "2ª no cartão" }];

type PaymentPixCreditCardProps = {
  onNextStep(searchParams: URLSearchParams): void;
};
export function PaymentPixCreditCard({
  onNextStep,
}: PaymentPixCreditCardProps) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const value = Number(searchParams.get("value"));
  const currency = searchParams.get("currency");
  const qrCodeValue = `${import.meta.env.VITE_API_URL}/mock-payment?value=${Math.round(value / 2)}&id=${id}`;

  const firstPayment = formatPrice({
    value: Math.round(value / 2),
    currency,
  });

  const lastPayment = formatPrice({
    value: value - Math.round(value / 2),
    currency,
  });

  const onCopy = () => {
    navigator.clipboard.writeText(qrCodeValue.toString());
  };

  return (
    <div className="size-full overflow-scroll">
      <StepHeader className="leading-tight">
        <p>João, pague a entrada de {firstPayment} pelo Pix</p>
      </StepHeader>
      <section className="flex flex-col gap-4">
        <div className="mx-auto flex w-fit items-center justify-center rounded-md border-2 border-custom-green-400 p-4">
          <QRCodeSVG value={qrCodeValue.toString()} size={200} />
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
      <div className="flex flex-col items-center font-extrabold">
        <p className="text-sm text-gray-400">Prazo de pagamento</p>
        <p className="text-xs">15/11/2021 - 08:17</p>
      </div>
      <div className="flex flex-col">
        <WrapperWithDivider>
          <stepper.Container activeStep={Number(0)} className="w-full">
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
