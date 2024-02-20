/**
 * Convert date to a readable format: "DD/MM/YYYY"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('fr-FR').format(
    typeof date === 'string' ? new Date(date) : date
  )
}
