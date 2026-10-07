import { parse } from 'qs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Pages } from '@/domain/pages/pages.output'
import { withObservatoryArticles } from '@/utils/fetchObservatoryArticles'

vi.mock('@/domain/pages/pages.output', () => ({
  Pages: { getPage: vi.fn() },
}))

const articles = [{ id: 1, attributes: { title: 'Article 1' } }]

describe('withObservatoryArticles', () => {
  beforeEach(() => {
    vi.mocked(Pages.getPage).mockReset()
    vi.mocked(Pages.getPage).mockResolvedValue(articles as never)
  })

  it('should add the theme articles to ObservatoryArticles blocks only', async () => {
    const blocks = [
      { __component: 'block.header', title: 'Musique' },
      {
        __component: 'block.observatory-articles',
        theme: { data: { id: 2 } },
      },
    ]

    const result = await withObservatoryArticles(blocks)

    expect(result?.[0]).toBe(blocks[0])
    expect(result?.[1]).toEqual({ ...blocks[1], articles })
    expect(Pages.getPage).toHaveBeenCalledTimes(1)

    const [path, query] = vi.mocked(Pages.getPage).mock.calls[0]!
    expect(path).toBe('observatories')
    expect(parse(query)).toMatchObject({
      sort: ['date:desc'],
      filters: { theme: { id: { $eq: '2' } } },
    })
  })

  it('should return an empty list without fetching when no theme is set', async () => {
    const result = await withObservatoryArticles([
      { __component: 'block.observatory-articles', theme: { data: null } },
    ])

    expect(result?.[0]).toMatchObject({ articles: [] })
    expect(Pages.getPage).not.toHaveBeenCalled()
  })

  it('should not fetch anything for pages without ObservatoryArticles block', async () => {
    const blocks = [{ __component: 'block.header', title: 'Notre mission' }]

    expect(await withObservatoryArticles(blocks)).toBe(blocks)
    expect(await withObservatoryArticles(undefined)).toBeUndefined()
    expect(Pages.getPage).not.toHaveBeenCalled()
  })
})
