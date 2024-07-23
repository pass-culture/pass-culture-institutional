import React from 'react'
import styled, { css } from 'styled-components'

import { useOS } from '@/hooks/useOS'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { AppBannerProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { isRenderable } from '@/utils/isRenderable'

export function AppBanner(props: AppBannerProps) {
  const { title, androidUrl, defaultUrl, iosUrl, onClick } = props
  const isAndroid = useOS().isAndroid
  const isIos = useOS().isIos

  const setUrl = (): string | undefined => {
    if (isIos) return iosUrl
    if (isAndroid) return androidUrl
    return defaultUrl
  }

  const url = setUrl()

  return (
    <BlockRendererWithCondition condition={isRenderable(url)}>
      <StyledAppBanner href={url as string} target="_blank" onClick={onClick}>
        <p>{title}</p>
      </StyledAppBanner>
    </BlockRendererWithCondition>
  )
}

const StyledAppBanner = styled(Link)`
  ${({ theme }) => css`
    box-sizing: border-box;
    min-height: 156px;
    grid-column: 1 / -1;
    justify-self: stretch;
    padding: 1.5rem 2rem;
    border-radius: 0.625rem;
    background: url('/images/banner-phone.png'),
      radial-gradient(ellipse at top, #eae3ff, transparent),
      radial-gradient(ellipse at bottom, #ffd7e9, transparent);

    background-position:
      bottom right 0rem,
      bottom right;
    background-size:
      auto 100%,
      cover;
    background-repeat: no-repeat;
    box-shadow: ${theme.shadows.banner};
    display: flex;
    align-items: center;
    border: 1px solid #cbcdd2;
    border: 1px solid #cbcdd2;

    p {
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.bold};
      text-transform: uppercase;
      max-width: 50%;
    }
  `}
`
