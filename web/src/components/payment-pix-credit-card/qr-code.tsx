import { QRCodeSVG } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { StepHeader } from "../step-header";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type QrCodeStepProps = { value: string; qrCodeValue: string };

export function QrCode({ value, qrCodeValue }: QrCodeStepProps) {
  const [searchParams] = useSearchParams();
  const installments = Number(searchParams.get("installments"));

  const onCopy = () => {
    navigator.clipboard.writeText(qrCodeValue);
  };

  return (
    <>
      <StepHeader className="leading-tight">
        {installments > 1 ? (
          <p>João, pague a entrada de {value} pelo Pix</p>
        ) : (
          <p>João, pague {value} pelo Pix</p>
        )}
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
