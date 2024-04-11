import React from 'react'
import styled, { css } from 'styled-components'

import { LogoCarousel } from './logoCarousel/logoCarousel'
import { APIResponse } from '@/types/strapi'

type LogoProps = {
  logo: { logo: APIResponse<'plugin::upload.file'> | null | undefined }[]
}

export function Logos({ logo }: LogoProps) {
  return (
    <Root>
      <LogoCarousel items={logo} />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    margin-bottom: var(--module-spacing);

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 4rem 1.5rem 2rem;
    }
  `}
`
