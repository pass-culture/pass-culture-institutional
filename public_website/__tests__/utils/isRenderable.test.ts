import { describe, expect, it } from 'vitest'

import { isRenderable } from '@/utils/isRenderable'

describe('isRenderable', () => {
  it('should return false for undefined', () => {
    expect(isRenderable(undefined)).toBe(false)
  })
  it('should return false for null', () => {
    expect(isRenderable(null)).toBe(false)
  })
  it('should return false for false', () => {
    expect(isRenderable(false)).toBe(false)
  })
  it('should return false for 0', () => {
    expect(isRenderable(0)).toBe(false)
  })
  it('should return false for NaN', () => {
    expect(isRenderable(NaN)).toBe(false)
  })
  it('should return false for empty string', () => {
    expect(isRenderable('')).toBe(false)
  })
  it('should return true for non-empty string', () => {
    expect(isRenderable('hello')).toBe(true)
  })
  it('should return true for positive number', () => {
    expect(isRenderable(42)).toBe(true)
  })
  it('should return true for negative number', () => {
    expect(isRenderable(-42)).toBe(true)
  })
  it('should return true for true', () => {
    expect(isRenderable(true)).toBe(true)
  })
  it('should return true for true', () => {
    expect(isRenderable([].length > 0)).toBe(false)
  })
})
