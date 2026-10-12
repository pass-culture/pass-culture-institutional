import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '../index'
import { ObservatoryThemes } from '@/lib/blocks/ObservatoryThemes'
import type { ObservatoryThemesProps } from '@/types/props'

type Theme = NonNullable<ObservatoryThemesProps['themes']>['data'][number]

const buildTheme = (id: number, attributes: Record<string, unknown>): Theme =>
  ({
    id,
    attributes: {
      name: `Thématique ${id}`,
      slug: `thematique-${id}`,
      color: 'lila',
      pageUrl: `/observatoire/thematique-${id}`,
      image: { data: null },
      ...attributes,
    },
  }) as unknown as Theme

const buildProps = (themes: Theme[]): ObservatoryThemesProps => ({
  title: 'Explorer les thématiques',
  themes: { data: themes },
})

const getGridColumns = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('li')).map((li) => li.style.gridColumn)

describe('ObservatoryThemes', () => {
  it('should display the title and one card per theme', () => {
    render(
      <ObservatoryThemes
        {...buildProps([
          buildTheme(1, { name: 'Livre et lecture' }),
          buildTheme(2, { name: 'Musique' }),
        ])}
      />
    )

    expect(screen.getByText('Explorer les thématiques')).toBeDefined()
    expect(screen.getByText('Livre et lecture')).toBeDefined()
    expect(screen.getByText('Musique')).toBeDefined()
  })

  it('should link each card to its theme page', () => {
    render(
      <ObservatoryThemes
        {...buildProps([
          buildTheme(1, { pageUrl: '/observatoire/livre-et-lecture' }),
          buildTheme(2, { pageUrl: '/observatoire/musique' }),
        ])}
      />
    )

    expect(
      screen.getAllByRole('link').map((link) => link.getAttribute('href'))
    ).toEqual(['/observatoire/livre-et-lecture', '/observatoire/musique'])
  })

  it('should display the image, or the emojis when there is no image', () => {
    const { container } = render(
      <ObservatoryThemes
        {...buildProps([
          buildTheme(1, {
            image: {
              data: {
                id: 1,
                attributes: { url: 'https://cdn.test/livre.png' },
              },
            },
            firstIcon: '📚',
          }),
          buildTheme(2, { firstIcon: '🎶', secondIcon: '🎹' }),
        ])}
      />
    )

    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(1)
    expect(images[0]?.getAttribute('src')).toContain('livre.png')
    expect(screen.queryByText('📚')).toBeNull()
    expect(screen.getByText('🎶')).toBeDefined()
    expect(screen.getByText('🎹')).toBeDefined()
  })

  it.each([
    [1, ['3 / span 2']],
    [2, ['2 / span 2', '4 / span 2']],
    [3, ['1 / span 2', '3 / span 2', '5 / span 2']],
    [4, ['2 / span 2', '4 / span 2', '2 / span 2', '4 / span 2']],
    [5, ['1 / span 2', '3 / span 2', '5 / span 2', '2 / span 2', '4 / span 2']],
    [
      7,
      [
        '1 / span 2',
        '3 / span 2',
        '5 / span 2',
        '1 / span 2',
        '3 / span 2',
        '5 / span 2',
        '3 / span 2',
      ],
    ],
  ])('should center incomplete rows with %i themes', (count, expected) => {
    const themes = Array.from({ length: count }, (_, index) =>
      buildTheme(index + 1, {})
    )

    const { container } = render(<ObservatoryThemes {...buildProps(themes)} />)

    expect(getGridColumns(container)).toEqual(expected)
  })

  it('should render no card when there is no theme', () => {
    render(<ObservatoryThemes title="Explorer les thématiques" />)

    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
