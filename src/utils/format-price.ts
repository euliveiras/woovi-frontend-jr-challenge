export type PriceProps = {
  value: string;
  currency: "BRL";
};

export function formatPrice(data: PriceProps) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: data.currency,
  }).format(Number(data.value));
}
