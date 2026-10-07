import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CARD_BACKGROUNDS } from '@/theme/style'
import { ObservatoryThemeCardProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { isRenderable } from '@/utils/isRenderable'

export function ObservatoryThemeCard(props: ObservatoryThemeCardProps) {
  const { name, color, imageUrl, firstIcon, secondIcon, url } = props

  return (
    <Root>
      <StyledVisual $backgroundColor={CARD_BACKGROUNDS[color ?? 'lila']}>
        {imageUrl ? (
          <StyledImageWrapper>
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 800px) 80vw, 24rem"
              style={{ objectFit: 'contain' }}
            />
          </StyledImageWrapper>
        ) : (
          // Emojis are the fallback visual when no image is set
          <StyledIcons>
            <BlockRendererWithCondition condition={isRenderable(firstIcon)}>
              <StyledIcon>{firstIcon}</StyledIcon>
            </BlockRendererWithCondition>
            <BlockRendererWithCondition condition={isRenderable(secondIcon)}>
              <StyledIcon>{secondIcon}</StyledIcon>
            </BlockRendererWithCondition>
          </StyledIcons>
        )}
      </StyledVisual>
      <StyledTitle>
        {url ? <StyledLink href={url}>{name}</StyledLink> : name}
      </StyledTitle>
    </Root>
  )
}

const Root = styled.article`
  position: relative;
  width: 100%;
`

const StyledVisual = styled.div<{ $backgroundColor: string }>`
  ${({ theme, $backgroundColor }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1.2;
    margin-bottom: 1.5rem;
    border-radius: ${theme.radius.sm};
    background-color: ${$backgroundColor};
    overflow: hidden;
  `}
`

const StyledImageWrapper = styled.div`
  position: absolute;
  inset: 8%;
`

const StyledIcons = styled.div`
  display: flex;
  gap: 1.5rem;
`

const StyledIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['6xl']};

    &:nth-child(2) {
      transform: translateY(-1.5rem) rotate(8deg);
    }
  `}
`

const StyledTitle = styled.h3`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.semiBold};
  `}
`

// The link covers the whole card so that the visual is clickable too
const StyledLink = styled(Link)`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`
