import { describe, expect, it } from 'vitest'

import { MediaQueries } from '@/theme/media-queries'
import { getMediaQuery } from '@/utils/getMediaQuery'

describe('getMediaQuery', () => {
  it('should return a number', () => {
    expect(getMediaQuery(MediaQueries.MOBILE)).toEqual(800)
  })
})
