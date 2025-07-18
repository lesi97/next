export function formatMoney(value: number): string {
  if (isNaN(value)) return '0';
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace('.00', '');
}
