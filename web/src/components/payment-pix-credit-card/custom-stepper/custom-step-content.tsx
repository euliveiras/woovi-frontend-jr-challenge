import StepContent, { StepContentProps } from "@mui/material/StepContent";

export function CustomStepContent({
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
