import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import About, { getStaticProps } from '../src/pages/about'
import { act, render, screen, waitFor } from '.'

describe('About page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<About restaurants={[]} />)

    await waitFor(() => {
      expect(screen.queryByText('Chargement...')).toBeFalsy()
    })

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })

    expect(a11yResult).toHaveNoViolations()
  })

  it('should render the page', async () => {
    const { container } = render(<About restaurants={[]} />)

    await waitFor(() => {
      expect(screen.queryByText('Chargement...')).toBeFalsy()
    })

    expect(container).toMatchSnapshot()
  })

  it('should render the page with restaurants', async () => {
    const { container } = render(
      <About
        restaurants={[
          {
            attributes: {
              description: 'description',
              name: 'name',
              createdAt: '2021-05-16T19:46:05.000Z',
              updatedAt: '2021-05-16T19:46:05.000Z',
              publishedAt: '2021-05-16T19:46:05.000Z',
            },
            id: 1,
          },
        ]}
      />
    )

    await waitFor(() => {
      expect(screen.queryByText('Chargement...')).toBeFalsy()
    })

    expect(container).toMatchSnapshot()
  })

  it('should show 404 when restaurants are falsy', async () => {
    const { container } = render(<About restaurants={undefined} />)

    await waitFor(() => {
      expect(screen.queryByText('404')).toBeTruthy()
    })

    expect(container).toMatchSnapshot()
  })
})

describe('getStaticProps', () => {
  it('should return props', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    const mockGetStaticProps = vi.fn()

    mockGetStaticProps.mockReturnValue({
      props: {
        restaurants: [
          {
            attributes: {
              description: 'description',
              name: 'name',
              createdAt: '2021-05-16T19:46:05.000Z',
              updatedAt: '2021-05-16T19:46:05.000Z',
              publishedAt: '2021-05-16T19:46:05.000Z',
            },
            id: 1,
          },
        ],
      },
    })
    const props = await getStaticProps()

    expect(props).toEqual({
      props: {
        restaurants: [
          {
            attributes: {
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu',
              createdAt: '2023-08-15T15:00:00.000Z',
              name: 'Lorem ipsum dolor sit amet',
              publishedAt: '2023-08-15T18:00:00.000Z',
              updatedAt: '2023-08-15T17:00:00.000Z',
            },
            id: 42,
          },
        ],
      },
    })
  })
})
