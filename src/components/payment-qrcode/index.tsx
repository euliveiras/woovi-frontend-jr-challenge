import Button from "@mui/material/Button";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { QRCodeSVG } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stepper, { StepperProps } from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent, { StepContentProps } from "@mui/material/StepContent";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import Divider from "@mui/material/Divider";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  StepConnector,
  StepIconProps,
} from "@mui/material";
import { StepHeader } from "../step-header";
import { useSearchParams } from "react-router-dom";

const steps = [{ label: "1ª entrada no Pix" }, { label: "2ª no cartão" }];

function WrapperWithDivider({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mt-3 flex flex-col gap-2 ${className}`}>
      {children}
      <Divider sx={{ borderBottomWidth: "2px" }} />
    </div>
  );
}

function CustomStepContent({
  children,
  ...rest
}: StepContentProps & { children: React.ReactNode }) {
  return (
    <StepContent
      className="whitespace-nowrap"
      sx={{ padding: 0, border: 0 }}
      {...rest}
    >
      <p className="whitespace-nowrap font-extrabold">{children}</p>
    </StepContent>
  );
}

function CustomStepLabelIcon(props: StepIconProps) {
  return props.completed ? (
    <CheckCircleIcon className="text-custom-green-400" />
  ) : (
    <RadioButtonUncheckedRoundedIcon
      className={props.active ? "text-custom-green-400" : "text-gray-400"}
    />
  );
}

function CustomStepLabel({
  children,
  ...rest
}: StepLabelProps & { children: React.ReactNode }) {
  return (
    <StepLabel
      className="whitespace-nowrap"
      StepIconComponent={CustomStepLabelIcon}
      sx={{ padding: 0 }}
      {...rest}
    >
      <p className="font-bold text-body-gray-400">{children}</p>
    </StepLabel>
  );
}

function CustomAccordion() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: "transparent", border: 0 }}
        className="text-sm font-bold"
      >
        Como funciona?
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
}

function CustomStepper({
  children,
  ...rest
}: StepperProps & { children: React.ReactNode }) {
  return (
    <Stepper
      activeStep={1}
      sx={{ display: "grid", gridTemplateRows: "1fr auto 1fr" }}
      connector={<StepConnector />}
      orientation="vertical"
      {...rest}
    >
      {children}
    </Stepper>
  );
}

type PaymentQrCodeProps = {
  onNextStep(searchParams: URLSearchParams): void;
};

export function PaymentQrCode({ onNextStep }: PaymentQrCodeProps) {
  const [searchParams] = useSearchParams();
  return (
    <div className="size-full overflow-scroll">
      <StepHeader className="leading-tight">
        <p>João, pague a entrada de R$ 15.300,00 pelo Pix</p>
      </StepHeader>
      <section className="flex flex-col gap-4">
        <div className="mx-auto flex w-fit items-center justify-center rounded-md border-2 border-custom-green-400 p-4">
          <QRCodeSVG value="https://reactjs.org" size={200} />
        </div>
        <div className="px-6 pb-2">
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            endIcon={<ContentCopyIcon />}
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
          <CustomStepper activeStep={Number(0)} className="w-full">
            {steps.map((step) => {
              return (
                <Step
                  className="flex items-center justify-between"
                  key={step.label}
                  expanded
                >
                  <CustomStepLabel>{step.label}</CustomStepLabel>
                  <CustomStepContent>R$ 123132.00</CustomStepContent>
                </Step>
              );
            })}
          </CustomStepper>
        </WrapperWithDivider>
        <WrapperWithDivider>
          <span className="flex w-full items-center justify-between">
            <p className="text-xs font-semibold">CET: 0,5%</p>
            <p className="text-sm font-extrabold">Total: A123213123</p>
          </span>
        </WrapperWithDivider>
        <WrapperWithDivider>
          <CustomAccordion />
        </WrapperWithDivider>
      </div>
      <span className="block pt-4 text-center font-bold leading-tight">
        <p className="text-xs text-gray-400">Identificador:</p>
        <p className="text-sm">asdasdasd121esdw</p>
      </span>
    </div>
  );
}
