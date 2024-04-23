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
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding-left: 1.3rem;
      padding-right: 1.3rem;
    }
  `}
`
