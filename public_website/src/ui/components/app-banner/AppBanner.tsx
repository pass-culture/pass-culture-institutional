import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '@/ui/components/Link'

type AppBannerProps = {
  title: string
  url: string
}

export function AppBanner({ title, url }: AppBannerProps) {
  return (
    <StyledAppBanner href={url} target="_blank">
      <p>{title}</p>
    </StyledAppBanner>
  )
}

const StyledAppBanner = styled(Link)`
  ${({ theme }) => css`
    max-width: 300px;
    box-sizing: border-box;
    min-height: 156px;
    grid-column: 1 / -1;
    justify-self: stretch;
    padding: 1.5rem 2rem;
    border-radius: 0.625rem;
    background: url('/images/banner-phone.png'),
      linear-gradient(138.16deg, #610286 10%, #cc0261 100%);
    background-position:
      bottom right -0.5rem,
      bottom right;
    background-size:
      auto 100%,
      cover;
    aspect-ratio: 300/156;
    background-repeat: no-repeat;
    box-shadow: ${theme.shadows.banner};
    display: flex;
    align-items: center;

    p {
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.bold};
      text-transform: uppercase;
      max-width: 50%;
    }
  `}
`
