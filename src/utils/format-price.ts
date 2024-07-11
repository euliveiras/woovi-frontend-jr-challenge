export type PriceProps = {
  value: number;
  currency: "BRL";
};

export function formatPrice(data: PriceProps) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: data.currency,
  }).format(data.value);
}
