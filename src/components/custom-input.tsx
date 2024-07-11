import Radio, { RadioProps } from "@mui/material/Radio";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function CustomRadioInput(props: RadioProps) {
  return (
    <Radio
      checkedIcon={<CheckCircleIcon className="text-green-500" />}
      icon={<RadioButtonUncheckedRoundedIcon className="text-gray-300" />}
      {...props}
    />
  );
}
