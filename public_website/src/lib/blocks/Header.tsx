import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { ComponentBlockHeaderFragment } from '@/generated/graphql'
import { theme } from '@/theme/theme'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function Header(props: Omit<ComponentBlockHeaderFragment, 'id'>) {
  const {
    text,
    requiredTitle,
    cta,
    requiredImage,
    requiredIcon,
    icon2,
    aboveTitle,
  } = props
  return (
    <Root>
      <StyledContentWrapper>
        <StyledContent>
          <BlockRendererWithCondition condition={isRenderable(aboveTitle)}>
            <StyledAboveHeading>
              {parseText(aboveTitle as string).processedText}
            </StyledAboveHeading>
          </BlockRendererWithCondition>
          <StyledHeading>{requiredTitle}</StyledHeading>
          <BlockRendererWithCondition condition={isRenderable(text)}>
            <StyledText>{text}</StyledText>
          </BlockRendererWithCondition>
          <BlockRendererWithCondition condition={isRenderable(cta?.URL)}>
            <StyledBtnWrapper>
              {cta && <ButtonWithCTA cta={cta} />}
            </StyledBtnWrapper>
          </BlockRendererWithCondition>
        </StyledContent>
        <BlockRendererWithCondition
          condition={isRenderable(requiredImage?.url)}>
          <CardContainer>
            <Card $imageUrl={getStrapiURL(requiredImage?.url)}>
              <BlockRendererWithCondition
                condition={isRenderable(requiredIcon)}>
                <OutlinedText shadow>{requiredIcon}</OutlinedText>
              </BlockRendererWithCondition>
              <BlockRendererWithCondition condition={isRenderable(icon2)}>
                <OutlinedText shadow>{icon2}</OutlinedText>
              </BlockRendererWithCondition>
            </Card>
          </CardContainer>
        </BlockRendererWithCondition>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    overflow: hidden;
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: -2rem;
    }
  `}
`
const StyledContent = styled.div`
  @media (width < ${theme.mediaQueries.mobile}) {
    margin-top: 50px;
  }
`
const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: calc(75.8125rem + 1.3rem);
    margin: 0 auto;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 6.25rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      grid-template-columns: 1fr 1fr;
      gap: 6.25rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      grid-template-columns: 1fr;
      padding-left: 0;
      padding-right: 0;
      gap: 1rem;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 0rem;
      padding-left: 0;
      padding-right: 0;
      gap: 1rem;
    }
  `}
`

const StyledHeading = styled(Typo.Heading1)`
  ${({ theme }) => css`
    max-width: 35rem;
    margin: 0 0 3rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      max-width: 100%;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      text-align: center;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['5xl']};
      margin-bottom: 1.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `}
`

const StyledAboveHeading = styled.div`
  ${({ theme }) => css`
    max-width: 35rem;
    margin: 0 0 1rem;
    font-size: ${theme.fonts.sizes['2xl']};
    color: ${theme.colors.secondary};
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      max-width: 100%;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      text-align: center;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['xl']};
      margin-bottom: 1.5rem;
    }
  `}
`

const StyledText = styled.p`
  ${({ theme }) => css`
    max-width: 43rem;
    margin: 0 0 2rem;

    color: #000;
    font-size: ${theme.fonts.sizes.m};
    font-weight: ${theme.fonts.weights.medium};
    line-height: 1.875rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      max-width: 100%;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      text-align: center;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 0;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `}
`
const CardContainer = styled.div`
  position: relative;
  z-index: 1;

  @media (width < ${theme.mediaQueries.tablet}) {
    max-width: 100%;
  }

  @media (width < ${theme.mediaQueries.mobile}) {
    max-width: 100%;
  }
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    background-color: ${theme.colors.sky};
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column-reverse;
    position: relative;
    width: 100%;
    min-height: 31.25rem;
    span:nth-child(1) {
      font-size: ${theme.fonts.sizes['8xl']};
      position: absolute;
      bottom: 30%;
      right: -5%;
      transform: rotate(-15deg);
    }
    span:nth-child(2) {
      font-size: ${theme.fonts.sizes['8xl']};
      position: absolute;
      top: 15%;
      left: -5%;
      transform: rotate(15deg);
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: calc(var(--module-margin) * 2);
      min-height: 24.0625rem;

      span:nth-child(1) {
        bottom: -7%;
        right: 5%;
        transform: rotate(-15deg);
      }
      span:nth-child(2) {
        display: none;
      }
    }
  `}
`

const StyledBtnWrapper = styled.div`
  margin-bottom: 2rem;
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.tablet}) {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      width: 100%;
    }
  `}
`
