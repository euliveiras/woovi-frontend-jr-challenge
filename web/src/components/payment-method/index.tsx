import RadioGroup from "@mui/material/RadioGroup";
import { CustomRadioInput } from "../custom-radio-input";
import { CustomFormControl } from "./custom-form-control";
import { CustomLabel } from "./custom-label";
import { FirstLabelSentence } from "./first-label-sentence";
import { PositionedText } from "./positioned-text";
import { SecondLabelSentence } from "./second-label-sentence";
import { TriangleShapeContainer } from "./triangle-shape-container";
import { useCustomModal } from "../custom-modal";
import { useSearchParams } from "react-router-dom";
import { StepHeader } from "../step-header";
import { calculateFee } from "../../utils/calculate-fee";
import { Button } from "@mui/material";

const installments = [1, 2, 3, 4, 5, 6, 7];

function Wrapper({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex flex-col border-x-2 border-b-2 p-2 has-[:checked]:border-2 has-[:checked]:border-custom-green-400 has-[:checked]:bg-custom-green-200 [&:last-of-type]:rounded-b-lg [&:nth-child(1)]:mt-4  [&:nth-child(1)]:gap-2 [&:nth-child(1)]:rounded-lg [&:nth-child(1)]:border-t-2 [&:nth-child(1)]:pb-4 [&:nth-child(2)]:mt-8 [&:nth-child(2)]:rounded-t-lg [&:nth-child(2)]:border-2 [&:nth-child(4)]:gap-2 [&:nth-child(4)]:border-x-2 [&:nth-child(4)]:border-b-2 [&:nth-child(4)]:py-4 ${className}`}
    >
      {children}
    </div>
  );
}

type StepProps = {
  onNextStep(searchParams: URLSearchParams): void;
};

export function PaymentMethod({ onNextStep }: StepProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedInstallment = searchParams.get("installment");
  const value = searchParams.get("value") ?? "";
  const currency = searchParams.get("currency") ?? "BRL";
  const { Modal } = useCustomModal();

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("installment", e.target.value);
    setSearchParams(searchParams);
  };

  const onCancel = () => {
    searchParams.delete("installment");
    setSearchParams(searchParams);
  };

  const onConfirm = () => {
    searchParams.set("installment", String(selectedInstallment));
    searchParams.set(
      "value",
      String(calculateFee(value, Number(selectedInstallment))),
    );
    onNextStep(searchParams);
  };

  return (
    <>
      <Modal
        open={typeof selectedInstallment === "string"}
        onCancel={onCancel}
        onConfirm={onConfirm}
        CloseButton={
          <Button variant="outlined" onClick={onCancel}>
            cancelar
          </Button>
        }
        ConfirmButton={
          <Button variant="contained" onClick={onConfirm}>
            confirmar
          </Button>
        }
      >
        <p>Parcelar em {selectedInstallment}?</p>
      </Modal>
      <StepHeader>
        <p>João, como você quer pagar?</p>
      </StepHeader>
      <div className="overflow-scroll px-4">
        <RadioGroup className="grid">
          {installments.map((installment) => {
            if (installment === 1) {
              return (
                <Wrapper key={installment}>
                  <CustomFormControl
                    className="pt-4"
                    value={installment}
                    checked={Number(selectedInstallment) === installment}
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence
                          n={installment}
                          price={{ value: Number(value), currency }}
                        />
                        <p className="text-xs font-bold text-green-400">
                          Ganhe 3% de Cashback
                        </p>
                      </CustomLabel>
                    }
                  />
                  <TriangleShapeContainer
                    text={
                      <>
                        <strong className="pr-1">🤑 R$ 300,00</strong> de volta
                        no seu Pix na hora
                      </>
                    }
                  />
                  <PositionedText text={"Pix"} className="-top-4 left-8" />
                </Wrapper>
              );
            } else if (installment === 2) {
              return (
                <Wrapper key={installment}>
                  <CustomFormControl
                    checked={Number(selectedInstallment) === installment}
                    value={installment}
                    className="pt-2"
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence
                          n={installment}
                          price={{
                            value:
                              calculateFee(value, installment) / installment,
                            currency,
                          }}
                        />
                        <SecondLabelSentence
                          price={{
                            value: calculateFee(value, installment),
                            currency,
                          }}
                        />
                        <PositionedText
                          className="-top-4 left-6"
                          text={"Pix parcelado"}
                        />
                      </CustomLabel>
                    }
                  />
                </Wrapper>
              );
            } else if (installment === 4) {
              return (
                <Wrapper key={installment}>
                  <CustomFormControl
                    checked={Number(selectedInstallment) === installment}
                    value={installment}
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence
                          n={installment}
                          price={{
                            value:
                              calculateFee(value, installment) / installment,
                            currency,
                          }}
                        />
                        <SecondLabelSentence
                          price={{
                            value: calculateFee(value, installment),
                            currency,
                          }}
                        />
                      </CustomLabel>
                    }
                  />
                  <TriangleShapeContainer
                    text={
                      <>
                        <strong className="pr-1">-3% de juros:</strong>Melhor
                        opção de parcelamento
                      </>
                    }
                  />
                </Wrapper>
              );
            } else {
              return (
                <Wrapper key={installment}>
                  <CustomFormControl
                    checked={Number(selectedInstallment) === installment}
                    value={installment}
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence
                          n={installment}
                          price={{
                            value:
                              calculateFee(value, installment) / installment,
                            currency,
                          }}
                        />
                        <SecondLabelSentence
                          price={{
                            value: calculateFee(value, installment),
                            currency,
                          }}
                        />
                      </CustomLabel>
                    }
                  />
                </Wrapper>
              );
            }
          })}
        </RadioGroup>
      </div>
    </>
  );
}
