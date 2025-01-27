import React from 'react'
import styled, { css } from 'styled-components'

import { LogoCarousel } from './logoCarousel/logoCarousel'
import { ComponentBlockLogosFragment } from '@/generated/graphql'

export function Logos(props: ComponentBlockLogosFragment) {
  return (
    <Root>
      <LogoCarousel {...props} />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);

    @media (width < ${theme.mediaQueries.tablet}) {
      background-color: transparent;
      padding-left: 1.3rem;
      padding-right: 1.3rem;
    }
  `}
`
