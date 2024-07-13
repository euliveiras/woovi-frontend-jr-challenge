import Step, { StepProps } from "@mui/material/Step";

export function CustomStep({ children, ...props }: StepProps) {
  return (
    <Step className="flex items-center justify-between" expanded {...props}>
      {children}
    </Step>
  );
}
