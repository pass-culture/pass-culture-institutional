import React from 'react'
import styled, { css } from 'styled-components'

import { onClickAnalytics } from '../analytics/helpers'
import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { CTA } from '@/types/CTA'
import { PushCTAProps } from '@/types/props'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function DoublePushCTA(
  props: PushCTAProps & {
    text?: string
    firstCta: CTA
    secondCta?: CTA
  }
) {
  const {
    className = '',
    title,
    icon,
    image,
    text,
    firstCta,
    secondCta,
  } = props

  const image_url = image?.data?.attributes?.url

  return (
    <StyledContentWrapper>
      <BlockRendererWithCondition condition={isRenderable(image_url)}>
        <MobileImage src={getStrapiURL(image_url as string)} alt="" />
      </BlockRendererWithCondition>

      <Root className={className}>
        <BlockRendererWithCondition condition={isRenderable(image_url)}>
          <CardContainer>
            <Card $imageUrl={getStrapiURL(image_url)} />
            <OutlinedText shadow>{icon}</OutlinedText>
          </CardContainer>
        </BlockRendererWithCondition>
        <RightSide>
          <Typo.Heading2>{title}</Typo.Heading2>
          <BlockRendererWithCondition condition={isRenderable(text)}>
            <p aria-label={parseText(text as string).accessibilityLabel}>
              {parseText(text as string).processedText}
            </p>
          </BlockRendererWithCondition>

          <CtaContainer>
            <span>
              <CtaLink
                href={firstCta.URL}
                onClick={(): void => {
                  firstCta?.eventName && firstCta?.eventOrigin
                    ? onClickAnalytics({
                        eventName: firstCta?.eventName,
                        eventOrigin: firstCta?.eventOrigin,
                      })
                    : void 0
                }}>
                <span>{firstCta.Label}</span>
              </CtaLink>
            </span>
            <BlockRendererWithCondition
              condition={isRenderable(secondCta?.URL)}>
              <span>
                <ButtonWithCTA
                  target="_blank"
                  variant="quaternary"
                  cta={secondCta as CTA}
                />
              </span>
            </BlockRendererWithCondition>
          </CtaContainer>
        </RightSide>
      </Root>
    </StyledContentWrapper>
  )
}

const StyledContentWrapper = styled(ContentWrapper)`
  ${({ theme }) => css`
    min-width: 100%;
    padding: 0;
    background-color: ${theme.colors.saumon};
    margin-top: calc(var(--module-margin) * 2);
    margin-bottom: calc(var(--module-margin) * 2);
    @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
      padding: 0;
      margin-top: calc(var(--module-margin) * 8);
      margin-bottom: calc(var(--module-margin) * 3);
    }
  `}
`

const Root = styled.div`
  ${({ theme }) => css`
    gap: 5.625rem;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    position: relative;
    max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
    margin: 0 auto;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: block;
      position: relative;
      padding: 0;
      margin: 0;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      display: block;
      border-radius: 0;
      position: relative;
      padding: 0;
      margin-top: 0;
    }
  `}
`
const CtaContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.625rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      flex-direction: column;
      gap: 0rem;
    }
  `}
`
const CardContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: 1;
    margin: -3.125rem 0;
    max-width: 28rem;

    span {
      position: absolute;
      top: 20%;
      right: -1rem;
      font-size: ${theme.fonts.sizes['8xl']};
      transform: rotate(-7deg);
    }

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      margin: 0 auto;
      position: relative;
      min-width: 90%;
      min-height: 40%;
      top: -7rem;
      span {
        display: none;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0 auto;
      position: absolute;
      min-width: 90%;
      min-height: 40%;
      left: 1.8rem;
    }
  `}
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    border-radius: ${theme.radius.sm};
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    aspect-ratio: 510/634.64;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      width: 70%;
      aspect-ratio: 338/233;
      padding: 0;
      margin: 0 auto;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const RightSide = styled.div`
  ${({ theme }) => css`
    padding: 6.25rem 0;
    max-width: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      margin-bottom: 1.25rem;
    }

    p {
      font-size: ${theme.fonts.sizes.m};
      line-height: 2.125rem;
      font-weight: ${theme.fonts.weights.medium};

      margin-bottom: 2rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes.s};
        line-height: 1.75rem;
      }
    }

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      padding: 2rem;
      max-width: none;
      margin-top: -7rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: -7rem;
      padding-inline: 1.3rem;
    }
  `}
`

const CtaLink = styled(Link)`
  ${({ theme }) => css`
    display: inline-block;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;
    margin-right: 0.75rem;
    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary},
      ${theme.colors.secondary}
    );
    color: ${theme.colors.white};
    padding: 1rem 1.75rem;
    border-radius: 6.25rem;
    position: relative;
    span {
      position: relative;
      z-index: 1;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      border-radius: 2rem;
      background-color: rgba(46, 5, 146, 0.7);
      opacity: 0;
      z-index: 0;
      transition: opacity 0.4s ease-in-out;
      pointer-events: none;
      z-index: 0;
    }
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      margin-right: 0;
      margin-bottom: 1.25rem;
      display: block;
      width: fit-content;
    }
  `}
`

const MobileImage = styled.img`
  ${({ theme }) => css`
    display: none;
    width: 60%;
    z-index: 1;
    position: relative;
    border-radius: ${theme.radius.sm};
    object-fit: cover;
    max-width: 13rem;
    aspect-ratio: 13/16;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: block;
      margin: 0 auto;
      max-width: 50%;
      top: -7rem;
    }
  `}
`
