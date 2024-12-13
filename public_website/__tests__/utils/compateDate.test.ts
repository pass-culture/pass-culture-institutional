import { describe, expect, it } from 'vitest'

import { compareDate } from '@/utils/compareDate'
import { formatDate } from '@/utils/formatDate'

describe('compareDate', () => {
  it('should return startDate if endDate is not defined', () => {
    expect(compareDate(new Date('02/22/2024'), null)).toEqual(
      `${formatDate('02/22/2024')}`
    )
  })

  it('should return startDate if startDate > endDate', () => {
    expect(compareDate(new Date('02/22/2024'), new Date('02/22/2023'))).toEqual(
      `${formatDate('02/22/2024')}`
    )
  })
  it('should return startDate if startDate === endDate', () => {
    expect(compareDate(new Date('02/22/2024'), new Date('02/22/2024'))).toEqual(
      `${formatDate('02/22/2024')}`
    )
  })
  it('should return startDate & endDate if startDate !== endDate && endDate > startDate', () => {
    expect(compareDate(new Date('02/22/2024'), new Date('03/22/2024'))).toEqual(
      `du ${formatDate('02/22/2024')} au ${formatDate('03/22/2024')}`
    )
  })
})
