import { describe, expect, it } from 'vitest'

import { getStrapiURL } from '@/utils/apiHelpers'

describe('apiHelpers', () => {
  it('should return the correct url', () => {
    expect(getStrapiURL('/test')).toEqual('http://localhost:1337/test')
  })
})
