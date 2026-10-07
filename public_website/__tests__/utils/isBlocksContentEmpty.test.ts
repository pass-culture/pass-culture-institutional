import type { BlocksContent } from '@strapi/blocks-react-renderer'
import { describe, expect, it } from 'vitest'

import { isBlocksContentEmpty } from '@/utils/isBlocksContentEmpty'

const emptyText = { type: 'text', text: '' } as const

describe('isBlocksContentEmpty', () => {
  it('should be empty without content', () => {
    expect(isBlocksContentEmpty(undefined)).toBe(true)
    expect(isBlocksContentEmpty(null)).toBe(true)
  })

  it('should be empty with the single empty block saved by the editor', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [emptyText] },
    ]

    expect(isBlocksContentEmpty(content)).toBe(true)
  })

  it('should not be empty with some text', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Bonjour' }] },
    ]

    expect(isBlocksContentEmpty(content)).toBe(false)
  })

  it('should not be empty with a single image block', () => {
    const content = [
      {
        type: 'image',
        image: { url: 'https://cdn.test/image.png' },
        children: [emptyText],
      },
    ] as unknown as BlocksContent

    expect(isBlocksContentEmpty(content)).toBe(false)
  })

  it('should not be empty with several blocks', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [emptyText] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Bonjour' }] },
    ]

    expect(isBlocksContentEmpty(content)).toBe(false)
  })
})
