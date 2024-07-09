import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { theme } from '@/theme/theme'
import { CTA } from '@/types/CTA'
import { HeaderProps } from '@/types/props'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function Header(props: HeaderProps) {
  const { text, title, cta, image, icon, icon2, aboveTitle } = props
  const img_url = image?.data?.attributes?.url
  return (
    <Root>
      <StyledContentWrapper>
        <div>
          <BlockRendererWithCondition condition={isRenderable(aboveTitle)}>
            <StyledAboveHeading>{aboveTitle}</StyledAboveHeading>
          </BlockRendererWithCondition>
          <StyledHeading>{title}</StyledHeading>
          <BlockRendererWithCondition condition={isRenderable(text)}>
            <StyledText>{text}</StyledText>
          </BlockRendererWithCondition>
          <BlockRendererWithCondition condition={isRenderable(cta?.URL)}>
            <StyledBtnWrapper>
              <ButtonWithCTA cta={cta as CTA} />
            </StyledBtnWrapper>
          </BlockRendererWithCondition>
        </div>
        <BlockRendererWithCondition condition={isRenderable(img_url)}>
          <CardContainer>
            <Card $imageUrl={getStrapiURL(img_url as string)}>
              <BlockRendererWithCondition condition={isRenderable(icon)}>
                <OutlinedText shadow>{icon}</OutlinedText>
              </BlockRendererWithCondition>
              <BlockRendererWithCondition condition={isRenderable(icon2)}>
                <OutlinedText shadow>{icon2}</OutlinedText>
              </BlockRendererWithCondition>
            </Card>
            <BackgroundLayer />
          </CardContainer>
        </BlockRendererWithCondition>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      ${theme.colors.lightBlue} 0%,
      ${theme.colors.white} 100%
    );

    transform: translateY(-8rem);
    overflow: hidden;

    @media (width < ${theme.mediaQueries.mobile}) {
      transform: translateY(-7rem);
      margin-bottom: -2rem;
      overflow: visible;
    }
  `}
`

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: calc(75.8125rem + 1.3rem);
    margin: 0 auto;
    position: relative;
    transform: translateY(-8rem);
    padding: calc(12rem + 10rem) 1.3rem 2.5rem;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 8rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      grid-template-columns: 1fr;
      padding: calc(6rem + 10rem) 1.3rem 2.5rem;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 1.5rem;
      padding: calc(6rem + 10rem) 1.3rem 2.5rem;
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
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['5xl']};
      margin-bottom: 1.5rem;
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
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 0;
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: -3.125rem 0 -3.125rem 0rem;
  max-width: 28rem;

  @media (width < ${theme.mediaQueries.tablet}) {
    max-width: 100%;
    margin: 3.875rem 10rem -4.125rem 10rem;
  }

  @media (width < ${theme.mediaQueries.mobile}) {
    margin: 2rem 2rem -10.125rem 2rem;
  }
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    background-color: ${theme.colors.tertiary};
    border-radius: 1.5rem;
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    aspect-ratio: 290 / 360;
    position: relative;

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
  `}
`

const BackgroundLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    content: '';
    inset: 0;
    background-color: ${theme.colors.secondary};
    transform: rotate(7deg);
    border-radius: 1.5rem;
    width: 100%;
    z-index: -1;
    aspect-ratio: 290 / 360;
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
