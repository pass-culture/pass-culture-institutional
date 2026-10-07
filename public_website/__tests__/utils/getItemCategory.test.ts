import { describe, expect, it } from 'vitest'

import { getItemCategory } from '@/utils/getItemCategory'

type Attributes = Parameters<typeof getItemCategory>[0]

const withCategory = (category: unknown) =>
  ({ title: 'Title', category }) as unknown as Attributes

describe('getItemCategory', () => {
  it('should return a string category as is', () => {
    expect(getItemCategory(withCategory('Étude ponctuelle'))).toBe(
      'Étude ponctuelle'
    )
  })

  it('should return the name of a relational category', () => {
    expect(
      getItemCategory(
        withCategory({ data: { id: 1, attributes: { name: 'Data' } } })
      )
    ).toBe('Data')
  })

  it('should fall back to "Article" when the relation is empty', () => {
    expect(getItemCategory(withCategory({ data: null }))).toBe('Article')
  })

  it('should fall back to "Article" when there is no category field', () => {
    expect(getItemCategory({ title: 'Title' } as unknown as Attributes)).toBe(
      'Article'
    )
  })
})
