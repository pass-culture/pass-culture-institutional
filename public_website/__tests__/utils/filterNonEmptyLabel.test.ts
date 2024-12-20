import { describe, expect, it } from 'vitest'

import { filterNonEmptyLabel } from '@/utils/filterNonEmptyLabel'
describe('filterNonEmptyLabel', () => {
  it('should return true for non-empty labels', () => {
    expect(filterNonEmptyLabel({ Label: 'Test' })).toBe(true)
    expect(filterNonEmptyLabel({ Label: '  Test  ' })).toBe(true)
  })

  it('should return false for empty labels', () => {
    expect(filterNonEmptyLabel({ Label: '' })).toBe(false)
    expect(filterNonEmptyLabel({ Label: '   ' })).toBe(false)
    expect(filterNonEmptyLabel({ Label: undefined })).toBe(false)
    expect(filterNonEmptyLabel({})).toBe(false)
  })
})
