import StepConnector from "@mui/material/StepConnector";
import Stepper, { StepperProps } from "@mui/material/Stepper";

export function CustomStepper({
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
