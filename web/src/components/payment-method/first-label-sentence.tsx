import { formatPrice, PriceProps } from "../../utils/format-price";

export function FirstLabelSentence({
  n,
  price,
}: {
  n: number;
  price: PriceProps;
}) {
  return (
    <span className="flex gap-1 text-lg">
      <p className="font-bold">{n}x</p>
      <p>{formatPrice(price)}</p>
    </span>
  );
}
