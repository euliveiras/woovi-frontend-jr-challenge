export function calculateFee(value: string, installment: number, fee = 0.35) {
  let total = Number(value);
  for (let loops = installment; loops > 1; --loops) {
    total += (total * fee) / 100;
  }

  return total;
}
