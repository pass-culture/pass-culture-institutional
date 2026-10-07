import React from 'react'
import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '../index'
import { ObservatoryArticles } from '@/lib/blocks/ObservatoryArticles'
import type { ObservatoryArticlesProps } from '@/types/props'

type Article = NonNullable<ObservatoryArticlesProps['articles']>[number]

const buildArticle = (id: number, category: string | null = 'Data'): Article =>
  ({
    id,
    attributes: {
      title: `Article ${id}`,
      slug: `article-${id}`,
      date: '2026-09-01T10:00:00.000Z',
      image: { data: null },
      category: {
        data: category ? { id: 1, attributes: { name: category } } : null,
      },
    },
  }) as unknown as Article

describe('ObservatoryArticles', () => {
  it('should display the title and one card per article with its category', () => {
    render(
      <ObservatoryArticles
        title="Les contenus Musique"
        articles={[buildArticle(1, 'Data'), buildArticle(2, 'Analyse')]}
      />
    )

    expect(screen.getByText('Les contenus Musique')).toBeDefined()
    expect(screen.getByText('Article 1')).toBeDefined()
    expect(screen.getByText('Article 2')).toBeDefined()
    expect(screen.getByText(/^Data -/)).toBeDefined()
    expect(screen.getByText(/^Analyse -/)).toBeDefined()
  })

  it('should fall back to "Article" when the article has no category', () => {
    render(<ObservatoryArticles articles={[buildArticle(1, null)]} />)

    expect(screen.getByText(/^Article -/)).toBeDefined()
  })

  it('should link each card to the article page', () => {
    render(<ObservatoryArticles articles={[buildArticle(1)]} />)

    expect(screen.getByRole('link').getAttribute('href')).toBe(
      '/observatoire/articles/article-1'
    )
  })

  it('should display 9 articles then load more on click', () => {
    const articles = Array.from({ length: 12 }, (_, index) =>
      buildArticle(index + 1)
    )

    render(<ObservatoryArticles articles={articles} buttonText="Voir plus" />)

    expect(screen.getAllByRole('link')).toHaveLength(9)

    fireEvent.click(screen.getByText('Voir plus'))

    expect(screen.getAllByRole('link')).toHaveLength(12)
  })

  it('should display a no result message when there is no article', () => {
    render(<ObservatoryArticles title="Les contenus Musique" articles={[]} />)

    expect(screen.getByText('Aucun résultat.')).toBeDefined()
  })
})
