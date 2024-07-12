import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

export function CustomFormControl({
  className,
  ...rest
}: FormControlLabelProps) {
  return (
    <FormControlLabel
      className={`flex justify-between ${className}`}
      labelPlacement="start"
      {...rest}
    />
  );
}
