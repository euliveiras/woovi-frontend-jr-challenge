import { RadioGroup } from "@mui/material";
import { CustomRadioInput } from "../custom-input";
import { CustomFormControl } from "./custom-form-control";
import { CustomLabel } from "./custom-label";
import { FirstLabelSentence } from "./first-label-sentence";
import { PositionedText } from "./positioned-text";
import { SecondLabelSentence } from "./second-label-sentence";
import { TriangleShapeContainer } from "./triangle-shape-container";
import { useState } from "react";
import { useCustomModal } from "../custom-modal";

const installments = [1, 2, 3, 4, 5, 6, 7];
const price = { value: 30500, currency: "BRL" } as {
  value: number;
  currency: "BRL";
};

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

export function FirstStep() {
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(
    null,
  );
  const { Modal, isOpen, showModal, hideModal } = useCustomModal();
  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedInstallment(Number(e.target.value));
    showModal();
  };

  const onCancel = () => {
    setSelectedInstallment(null);
    hideModal();
  };

  const onConfirm = () => {
    console.log("confirm");
  };

  return (
    <section className="flex size-full flex-col items-center overflow-hidden p-4 pb-8">
      <Modal open={isOpen} onCancel={onCancel} onConfirm={onConfirm}>
        <p>Parcelar em {selectedInstallment}?</p>
      </Modal>
      <header className="text-lg font-bold">João, como você quer pagar?</header>
      <div className="mt-4 overflow-scroll px-4">
        <RadioGroup className="grid">
          {installments.map((installment) => {
            if (installment === 1) {
              return (
                <Wrapper key={installment}>
                  <CustomFormControl
                    className="pt-4"
                    value={installment}
                    checked={selectedInstallment === installment}
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence n={installment} price={price} />
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
                    checked={selectedInstallment === installment}
                    value={installment}
                    className="pt-2"
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence n={installment} price={price} />
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
                    checked={selectedInstallment === installment}
                    value={installment}
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence n={installment} price={price} />
                        <SecondLabelSentence price={price} />
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
                    checked={selectedInstallment === installment}
                    value={installment}
                    control={<CustomRadioInput onChange={onRadioChange} />}
                    label={
                      <CustomLabel>
                        <FirstLabelSentence n={installment} price={price} />
                        <SecondLabelSentence price={price} />
                      </CustomLabel>
                    }
                  />
                </Wrapper>
              );
            }
          })}
        </RadioGroup>
      </div>
    </section>
  );
}
