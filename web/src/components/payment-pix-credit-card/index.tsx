import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatPrice } from "../../utils/format-price";
import { stepper } from "./custom-stepper";
import { CustomAccordion } from "./custom-accordion";
import { WrapperWithDivider } from "./wrapper-with-divider";
import { useSocket } from "../use-socket";
import { useCustomModal } from "../custom-modal";
import { ErrorMessage } from "../error-message";
import { CreditCard } from "./credit-card";
import { QrCode } from "./qr-code";

const steps = [{ label: "1ª entrada no Pix" }, { label: "2ª no cartão" }];

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
  }/?mock-payment=true&value=${Math.round(value / 2)}&id=${id}`;

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
          <Button variant="contained" onClick={() => navigate(`/`)}>
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
        <CreditCard
          value={lastPaymentValue}
          installment={Number(installment)}
          onFinish={() => onNextStep(searchParams)}
        />
      ) : (
        <QrCode value={firstPayment} qrCodeValue={qrCodeValue.toString()} />
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
