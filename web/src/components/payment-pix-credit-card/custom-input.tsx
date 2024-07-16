import TextField, { TextFieldProps } from "@mui/material/TextField";
import { theme } from "../../theme";

export function CustomInput(props: TextFieldProps) {
  return (
    <TextField
      InputLabelProps={{ sx: { color: theme.custom.color.gray } }}
      variant="outlined"
      {...props}
    />
  );
}
