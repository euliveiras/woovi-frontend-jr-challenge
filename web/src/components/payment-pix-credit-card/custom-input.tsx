import TextField, { TextFieldProps } from "@mui/material/TextField";

export function CustomInput(props: TextFieldProps) {
  return (
    <TextField
      InputLabelProps={{ sx: { color: "#4D4D4D" } }}
      variant="outlined"
      {...props}
    />
  );
}
