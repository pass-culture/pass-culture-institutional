import { describe, expect, it } from 'vitest'

import { formatDate } from '@/utils/formatDate'

describe('formatDate', () => {
  it('should return a formatted string from a Date', () => {
    expect(formatDate(new Date('02/22/2024'))).toEqual('22/02/2024')
  })

  it('should return a formatted string from a string', () => {
    const date = new Date('02/22/2024').toString()
    expect(formatDate(date)).toEqual('22/02/2024')
  })
})
