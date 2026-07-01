export function formatDateRange(start: string, end?: string): string {
  if (!end) return `${start} – Present`;
  return `${start} – ${end}`;
}