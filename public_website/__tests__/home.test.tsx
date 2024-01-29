import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import Home, { getStaticProps } from '../src/pages'
import { act, fireEvent, render, screen, waitFor } from '.'
import { activePlaylistTagsFixtures, playlistOffersFixtures } from './fixtures'

describe('Home page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<Home />)

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })

  it('should render the page', () => {
    const { container } = render(<Home />)

    expect(container).toMatchSnapshot()
  })

  it('should select the checkbox when clicking on its label', () => {
    render(<Home />)

    const checkbox = screen.getByTestId('checkbox-acceptTerms')
    const label = screen.getByText('Checkbox à cocher')

    fireEvent.click(label)

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should render the page with the response of the CMS', async () => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      INSTITUTIONAL_API_KEY: 'dummy_key',
      BACKEND_API_URL: 'http://dummy_localhost:5001/',
    }

    const { props } = await getStaticProps()
    render(<Home {...props} />)

    expect(
      screen.queryByText(
        activePlaylistTagsFixtures[0]?.attributes.displayName ?? ''
      )
    ).toBeTruthy()
  })
  it('should render the page with the response of the Backend', async () => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      INSTITUTIONAL_API_KEY: 'dummy_key',
      BACKEND_API_URL: 'http://dummy_localhost:5001/',
    }

    const { props } = await getStaticProps()
    render(<Home {...props} />)

    expect(
      screen.queryAllByText(playlistOffersFixtures.data[0]?.name ?? '')
    ).toBeTruthy()
  })

  it('should render the active playlist tags', async () => {
    const { container } = render(<Home tags={activePlaylistTagsFixtures} />)

    await waitForDataToBeLoadedAndRendered()

    expect(container).toMatchSnapshot()
  })
})

async function waitForDataToBeLoadedAndRendered() {
  await waitFor(() => {
    expect(screen.queryByText('Chargement...')).toBeFalsy()
  })
}
