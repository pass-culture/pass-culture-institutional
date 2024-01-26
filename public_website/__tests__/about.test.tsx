import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import About, { getStaticProps } from '../src/pages/about'
import { act, render, screen, waitFor } from '.'
import { restaurantDataFixtures } from './fixtures'

describe('About page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<About restaurants={[]} />)

    await waitForDataToBeLoadedAndRendered()

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })

    expect(a11yResult).toHaveNoViolations()
  })

  it('should render the page', async () => {
    const { container } = render(<About restaurants={[]} />)

    await waitForDataToBeLoadedAndRendered()

    expect(container).toMatchSnapshot()
  })

  it('should render the page with the response of the server', async () => {
    process.env = { ...process.env, ID_TOKEN: 'dummy_token' }

    const { props } = await getStaticProps()
    render(<About {...props} />)
    expect(screen.queryByText('Tacos de Lyon')).toBeTruthy()
  })

  it('should render the page with restaurants', async () => {
    const { container } = render(<About restaurants={restaurantDataFixtures} />)

    await waitForDataToBeLoadedAndRendered()

    expect(container).toMatchSnapshot()
  })

  it('should show 404 when restaurants are falsy', async () => {
    render(<About restaurants={undefined} />)

    await waitFor(() => {
      expect(screen.queryByText('404')).toBeTruthy()
    })
  })
})

async function waitForDataToBeLoadedAndRendered() {
  await waitFor(() => {
    expect(screen.queryByText('Chargement...')).toBeFalsy()
  })
}
