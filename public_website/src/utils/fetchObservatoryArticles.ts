import { stringify } from 'qs'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import type { APIResponseData } from '@/types/strapi'

type Block = { __component: string }

type ObservatoryArticlesBlock = Block & {
  theme?: { data?: { id: number } | null }
}

const isObservatoryArticlesBlock = (
  block: Block
): block is ObservatoryArticlesBlock =>
  block.__component === 'block.observatory-articles'

const fetchThemeArticles = async (themeId: number) => {
  const query = stringify({
    sort: ['date:desc'],
    populate: ['image', 'category'],
    filters: { theme: { id: { $eq: themeId } } },
  })

  return (await Pages.getPage(
    PATHS.OBSERVATORIES,
    query
  )) as APIResponseData<'api::observatory.observatory'>[]
}

/**
 * Adds to each ObservatoryArticles block the published articles of its theme,
 * so that theme pages are fully rendered at build time.
 */
export async function withObservatoryArticles<T extends Block>(
  blocks: T[] | undefined
): Promise<T[] | undefined> {
  if (!blocks?.some(isObservatoryArticlesBlock)) return blocks

  return Promise.all(
    blocks.map(async (block) => {
      if (!isObservatoryArticlesBlock(block)) return block

      const themeId = block.theme?.data?.id
      const articles = themeId ? await fetchThemeArticles(themeId) : []

      return { ...block, articles }
    })
  )
}
