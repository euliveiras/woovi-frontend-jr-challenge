import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import { StepIconProps } from "@mui/material/StepIcon";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function CustomStepLabelIcon(props: StepIconProps) {
  return props.completed ? (
    <CheckCircleIcon className="text-custom-green-400" />
  ) : (
    <RadioButtonUncheckedRoundedIcon
      className={props.active ? "text-custom-green-400" : "text-gray-400"}
    />
  );
}

export function CustomStepLabel({
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
