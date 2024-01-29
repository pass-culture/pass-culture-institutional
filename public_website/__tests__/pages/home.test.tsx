import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import Home, { getStaticProps } from '../../src/pages'
import { act, render, screen } from '..'

describe('Home page', () => {
  it('should pass accessibility tests', async () => {
    const { container } = render(<Home />)

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })

  it('should render correctly', () => {
    const { container } = render(<Home />)

    expect(container).toMatchSnapshot()
  })

  it('should display the playlist name', async () => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      INSTITUTIONAL_API_KEY: 'dummy_key',
      BACKEND_API_URL: 'http://dummy_localhost:5001/',
    }

    const { props } = await getStaticProps()
    render(<Home {...props} />)

    const PLAYLIST_NAME = 'Bons plans du moment'
    expect(screen.queryByText(PLAYLIST_NAME)).toBeTruthy()
  })

  it('should display the playlist', async () => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      INSTITUTIONAL_API_KEY: 'dummy_key',
      BACKEND_API_URL: 'http://dummy_localhost:5001/',
    }

    const { props } = await getStaticProps()
    render(<Home {...props} />)

    const FIRST_OFFER = 'Livre 1 avec EAN'
    expect(screen.queryByText(FIRST_OFFER)).toBeTruthy()

    const LAST_OFFER = 'Livre 10 avec EAN'
    expect(screen.queryByText(LAST_OFFER)).toBeTruthy()
  })
})
