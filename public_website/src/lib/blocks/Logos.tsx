import React from 'react'
import styled, { css } from 'styled-components'

import { LogoCarousel } from './logoCarousel/logoCarousel'
import { APIResponse } from '@/types/strapi'

type LogoProps = {
  controlsLabel?: string
  nextButtonLabel?: string
  previousButtonLabel?: string
  images?:
    | { logo?: APIResponse<'plugin::upload.file'> | null | undefined }[]
    | undefined
}

export function Logos({
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  images,
}: LogoProps) {
  return (
    <Root>
      <StyledCarouselWrapper>
        <LogoCarousel
          controlsLabel={controlsLabel}
          nextButtonLabel={nextButtonLabel}
          previousButtonLabel={previousButtonLabel}
          items={images}
        />
      </StyledCarouselWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    padding: 6.25rem 0 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 0;
    }
  `}
`

const StyledCarouselWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 0 0 7rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 4rem 1.5rem 2rem;
    }
  `}
`
