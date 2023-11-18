export function formatNumber(num: number): string {
  return num.toLocaleString('en-US', { style: 'decimal' });
}
