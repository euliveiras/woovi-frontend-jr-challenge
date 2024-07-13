import { formatPrice, PriceProps } from "../../utils/format-price";

export function SecondLabelSentence({ price }: { price: PriceProps }) {
  return <p className="text-sm text-gray-400">Total: {formatPrice(price)}</p>;
}
