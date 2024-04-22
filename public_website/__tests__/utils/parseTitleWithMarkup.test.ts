import { describe, expect, it } from 'vitest'

import { parseTitleWithMarkup } from '@/utils/parseTitleWithMarkup'

const title = 'I am a **text** in **bold** very beautiful'

describe('parseTitleWithMarkup', () => {
  const { textWithMarkup } = parseTitleWithMarkup(title)

  it('should have 5 elements in textWithMarkup', () => {
    expect(textWithMarkup).toHaveLength(5)
  })

  it('first element in textWithMarkup should be a <span>', () => {
    expect(textWithMarkup[0]?.type).toEqual('span')
  })

  it('second element in textWithMarkup should be a <mark>', () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    expect((textWithMarkup[1]?.type).target).toEqual('mark')
  })

  it('third element in textWithMarkup should be a <span>', () => {
    expect(textWithMarkup[2]?.type).toEqual('span')
  })

  it('fourth element in textWithMarkup should be a <mark>', () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    expect((textWithMarkup[3]?.type).target).toEqual('mark')
  })

  it('fifth element in textWithMarkup should be a <span>', () => {
    expect(textWithMarkup[4]?.type).toEqual('span')
  })

  it('should parse text with markup correctly for accessibilityLabel', () => {
    const { accessibilityLabel } = parseTitleWithMarkup(title)

    expect(accessibilityLabel).toEqual('I am a text in bold very beautiful')
  })
})
