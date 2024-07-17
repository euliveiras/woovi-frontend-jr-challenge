import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../../utils/format-price";
import { theme } from "../../theme";

type CustomSelectProps = {
  selectProps: SelectProps;
  value: number;
  installment: number;
};

export function CustomSelect({
  installment,
  value,
  selectProps,
}: CustomSelectProps) {
  const [searchParams] = useSearchParams();
  const currency = searchParams.get("currency");
  const arr = Array.from(Array(installment).keys()).map((n) => ++n);
  return (
    <Select
      sx={{ color: theme.custom.color.gray }}
      {...selectProps}
    >
      {arr.map((val) => {
        return (
          <MenuItem
            sx={{ color: theme.custom.color.gray }}
            key={val}
            value={val}
          >
            {val}x{" "}
            {formatPrice({ value: Math.round(Number(value) / val), currency })}
          </MenuItem>
        );
      })}
    </Select>
  );
}
