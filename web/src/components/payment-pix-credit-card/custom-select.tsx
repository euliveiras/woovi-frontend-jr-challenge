import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../../utils/format-price";

type CustomSelectProps = { name: string; value: number; installment: number };

export function CustomSelect({ name, installment, value }: CustomSelectProps) {
  const [searchParams] = useSearchParams();
  const currency = searchParams.get("currency");
  const arr = Array.from(Array(installment).keys()).map((n) => ++n);
  return (
    <Select name={name} defaultValue={1}>
      {arr.map((val) => {
        return (
          <MenuItem key={val} value={val}>
            {val}x{" "}
            {formatPrice({ value: Math.round(Number(value) / val), currency })}
          </MenuItem>
        );
      })}
    </Select>
  );
}
