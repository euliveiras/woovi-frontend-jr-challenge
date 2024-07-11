import TextField, { TextFieldProps } from "@mui/material/TextField";

export function CustomInput(props: TextFieldProps) {
  return <TextField variant="outlined" {...props} />;
}
