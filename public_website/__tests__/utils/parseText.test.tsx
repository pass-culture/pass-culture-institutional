import { describe, expect, it } from 'vitest'

import { parseText } from '@/utils/parseText'

const title = 'I am a **text** in **bold** with <br/>line breaks'

describe('parseText', () => {
  const { processedText, accessibilityLabel } = parseText(title)

  it('should have 5 elements in processedText', () => {
    expect(processedText).toHaveLength(5)
  })

  it('first element in processedText should be a <span>', () => {
    expect(processedText[0]?.type).toEqual('span')
  })

  it('second element in processedText should be a <mark>', () => {
    expect(processedText[1]?.type).toEqual('mark')
  })

  it('third element in processedText should be a <span>', () => {
    expect(processedText[2]?.type).toEqual('span')
  })

  it('fourth element in processedText should be a <mark>', () => {
    expect(processedText[3]?.type).toEqual('mark')
  })

  it('fifth element in processedText should be a <span>', () => {
    expect(processedText[4]?.type).toEqual('span')
  })

  it('should parse text without <br/> correctly for accessibilityLabel', () => {
    expect(accessibilityLabel).toEqual('I am a text in bold with line breaks')
  })

  it('should parse text with <br/> correctly', () => {
    const textWithBr = 'Text with<br/>line breaks only'
    const { processedText } = parseText(textWithBr)

    const allTextWithBrInSpan = processedText[0]?.props
    const firstPart = allTextWithBrInSpan.children[0].props?.children

    expect(firstPart[0]).toEqual('Text with')
    expect(firstPart[1].type).toEqual('br')

    const lastPart = allTextWithBrInSpan.children[1].props?.children
    expect(lastPart[0]).toEqual('line breaks only')
  })
})
