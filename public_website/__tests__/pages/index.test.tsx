import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import Home, { getStaticProps } from '@/pages'

describe('Home page', () => {
  it('should pass accessibility tests', async () => {
    const { props } = await getStaticProps()
    const { container } = render(
      <Home homeData={props.homeData} latestStudies={props.latestStudies} />
    )

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })
})
