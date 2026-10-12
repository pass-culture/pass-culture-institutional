import type { BlocksContent } from '@strapi/blocks-react-renderer'

/**
 * The Strapi blocks editor saves an empty field as a single block holding an
 * empty text. Image blocks also hold an empty text, but they are not empty.
 */
export const isBlocksContentEmpty = (
  content?: BlocksContent | null
): boolean => {
  if (!content) return true

  const block = content.at(0)
  const child = block?.children.at(0)

  return (
    content.length === 1 &&
    block?.type !== 'image' &&
    child?.type === 'text' &&
    child.text === ''
  )
}
