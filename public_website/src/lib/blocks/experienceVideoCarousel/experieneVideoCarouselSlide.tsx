import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ComponentCommonExperienceVideoCarouselItemFragment } from '@/generated/graphql'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { theme } from '@/theme/theme'
import { Typo } from '@/ui/components/typographies'
import { isRenderable } from '@/utils/isRenderable'

type ExperienceVideoCarouselSlideProps =
  ComponentCommonExperienceVideoCarouselItemFragment & {
    slideIndex: number
    isLandscape: boolean
  }

export function ExperienceVideoCarouselSlide(
  props: ExperienceVideoCarouselSlideProps
) {
  const { slideIndex, isLandscape = true, title, description, url } = props
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Root
      $isLandscape
      index={slideIndex}
      key={title}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <StyledWrapper>
        <BlockRendererWithCondition condition={isMounted && isRenderable(url)}>
          <StyledExperienceVideo
            url={url}
            width="100%"
            controls
            height={isLandscape ? '100%' : 470}
            alt={description}
          />
        </BlockRendererWithCondition>
        <StyledTitle>{title}</StyledTitle>
        <Description>{description}</Description>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled(Slide)<{ $isLandscape?: boolean }>`
  ${($isLandscape) => css`
    min-width: ${$isLandscape ? '17.8125rem;' : '100%;'}
      ${({ theme }) => css`
    .inner {
        margin-right: 1rem;
        margin-left: 1rem;
      
      @media (width < ${theme.mediaQueries.mobile}) {
        margin-right: 0;
        margin-left: 0;
      }
  }}
  `};
  `}
`

const StyledExperienceVideo = styled(ReactPlayer)`
  ${({ theme }) => css`
    border-radius: ${theme.radius.sm};
    object-fit: cover;
    width: 100%;
    height: auto;
    aspect-ratio: 1.7;
    overflow: hidden;
  `}
`
const StyledTitle = styled(Typo.Heading3)`
  ${({ theme }) => css`
    margin: 1.5rem 0 0.25rem;
    font-size: ${theme.fonts.sizes.xl};
    font-weight: ${theme.fonts.weights.bold};
    line-height: 1.4;
  `}
`
const Description = styled.p`
  font-size: ${theme.fonts.sizes.xl};
  font-weight: ${theme.fonts.weights.medium};
  line-height: 1.6;
`

const StyledWrapper = styled.div`
  display: block;
  position: relative;

  button {
    position: absolute;
    left: 1rem;
    bottom: 8rem;
    z-index: 15;
  }
`
