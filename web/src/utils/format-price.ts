export type PriceProps = {
  value: number | null;
  currency: string | null;
};

export function formatPrice(data: PriceProps) {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: data.currency ?? "BRL",
  }).format((data.value ?? 0) / 100);
  return formatted;
}
