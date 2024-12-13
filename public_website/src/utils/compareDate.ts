import { formatDate } from './formatDate'

export const compareDate = (
  startDate: string | Date,
  endDate: string | Date | null | undefined
): string => {
  if (!endDate) return formatDate(startDate)
  const parseStartDate =
    startDate instanceof Date ? startDate : new Date(startDate)
  const parseEndDate = endDate instanceof Date ? endDate : new Date(endDate)

  if (parseStartDate === parseEndDate) return formatDate(parseStartDate)
  if (parseEndDate > parseStartDate)
    return `du ${formatDate(startDate)} au ${formatDate(parseEndDate)}`
  return formatDate(startDate)
}
