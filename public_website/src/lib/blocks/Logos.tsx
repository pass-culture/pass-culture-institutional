import React from 'react'
import styled, { css } from 'styled-components'

import { LogoCarousel } from './logoCarousel/logoCarousel'
import { APIResponse } from '@/types/strapi'

type LogoProps = {
  controlsLabel?: string
  nextButtonLabel?: string
  previousButtonLabel?: string
  logo: { logo: APIResponse<'plugin::upload.file'> | null | undefined }[]
}

export function Logos({
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  logo,
}: LogoProps) {
  return (
    <Root>
      <LogoCarousel
        controlsLabel={controlsLabel}
        nextButtonLabel={nextButtonLabel}
        previousButtonLabel={previousButtonLabel}
        items={logo}
      />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    padding: 6.25rem 0 7rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 4rem 1.5rem 2rem;
    }
  `}
`
