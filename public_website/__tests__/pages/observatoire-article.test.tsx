import React from 'react'
import { parse } from 'qs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen } from '..'
import { Pages } from '@/domain/pages/pages.output'
import ObservatoryArticlePage, {
  getStaticProps,
} from '@/pages/observatoire/articles/[slug]'

vi.mock('@/domain/pages/pages.output', () => ({
  Pages: { getPage: vi.fn() },
}))

vi.mock('@/utils/fetchCMS', () => ({
  fetchLayoutData: vi.fn(async () => ({})),
}))

type PageProps = React.ComponentProps<typeof ObservatoryArticlePage>
type Article = PageProps['data']

const buildArticle = (id: number, overrides: Record<string, unknown> = {}) =>
  ({
    id,
    attributes: {
      title: `Article ${id}`,
      slug: `article-${id}`,
      date: '2026-09-01T10:00:00.000Z',
      image: {
        data: {
          id: id,
          attributes: { url: `https://cdn.test/article-${id}.png` },
        },
      },
      category: { data: { id: 1, attributes: { name: 'Data' } } },
      theme: {
        data: {
          id: 7,
          attributes: { name: 'Musique', pageUrl: '/observatoire/musique' },
        },
      },
      blocks: [],
      seo: { metaTitle: `Article ${id}`, metaDescription: 'Description' },
      ...overrides,
    },
  }) as unknown as Article

describe('Observatory article page', () => {
  beforeEach(() => {
    vi.mocked(Pages.getPage).mockReset()
  })

  it('should display the title, the category and a link back to the theme', () => {
    render(
      <ObservatoryArticlePage data={buildArticle(1)} relatedArticles={[]} />
    )

    expect(screen.getByRole('heading', { name: 'Article 1' })).toBeDefined()
    expect(screen.getByText('Data')).toBeDefined()
    expect(
      screen
        .getByRole('link', { name: 'Retour à la thématique' })
        .getAttribute('href')
    ).toBe('/observatoire/musique')
  })

  it('should display the other articles of the theme', () => {
    render(
      <ObservatoryArticlePage
        data={buildArticle(1)}
        relatedArticles={[buildArticle(2), buildArticle(3)]}
      />
    )

    expect(screen.getByText('Article 2')).toBeDefined()
    expect(
      screen.getByRole('link', { name: 'Article 3' }).getAttribute('href')
    ).toBe('/observatoire/articles/article-3')
    expect(
      screen
        .getByRole('link', { name: 'Voir tous les contenus' })
        .getAttribute('href')
    ).toBe('/observatoire/musique')
  })

  it('should hide the related section and the theme links when irrelevant', () => {
    render(
      <ObservatoryArticlePage
        data={buildArticle(1, { theme: { data: null } })}
        relatedArticles={[]}
      />
    )

    expect(screen.queryByText(/Dans la même/)).toBeNull()
    expect(screen.queryByText('Retour à la thématique')).toBeNull()
  })

  it('should render the LittleList block of the article', () => {
    render(
      <ObservatoryArticlePage
        data={buildArticle(1, {
          blocks: [
            {
              __component: 'block.little-list',
              id: 1,
              title: 'En bref',
              content: [
                {
                  id: 1,
                  text: 'Des données ouvertes',
                  description: null,
                  firstEmoji: '📊',
                  secondEmoji: '📈',
                  url: 'https://www.data.gouv.fr',
                },
              ],
            },
          ],
        })}
        relatedArticles={[]}
      />
    )

    expect(screen.getByText('En bref')).toBeDefined()
    expect(
      screen
        .getByRole('link', { name: /Des données ouvertes/ })
        .getAttribute('href')
    ).toBe('https://www.data.gouv.fr')
  })

  it('should fetch the other articles of the same theme, without the current one', async () => {
    const related = [buildArticle(2)]
    vi.mocked(Pages.getPage)
      .mockResolvedValueOnce([buildArticle(1)] as never)
      .mockResolvedValueOnce(related as never)

    const result = await getStaticProps({ params: { slug: 'article-1' } })

    expect(result).toMatchObject({ props: { relatedArticles: related } })
    const [, relatedQuery] = vi.mocked(Pages.getPage).mock.calls[1]!
    expect(parse(relatedQuery)).toMatchObject({
      sort: ['date:desc'],
      pagination: { limit: '3' },
      filters: { theme: { id: { $eq: '7' } }, slug: { $ne: 'article-1' } },
    })
  })

  it('should return a 404 when the article does not exist', async () => {
    vi.mocked(Pages.getPage).mockResolvedValueOnce([] as never)

    expect(await getStaticProps({ params: { slug: 'unknown' } })).toEqual({
      notFound: true,
    })
  })
})
