export function formatNumber(value: number | string, compact = false): string {
  const toNumber = Number(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
  }).format(toNumber);
}
