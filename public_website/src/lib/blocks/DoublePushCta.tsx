import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { Separator } from './Separator'
import {
  ComponentBlockDoublePushCtaFragment,
  ComponentCommonLinkFragment,
  UploadFileFragment,
} from '@/generated/graphql'
import { useOnClickAnalytics } from '@/hooks/useOnClickAnalytics'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function DoublePushCTA(
  props: Omit<
    ComponentBlockDoublePushCtaFragment,
    'id' | 'requiredImage' | '__typename'
  > & {
    requiredImage?: UploadFileFragment
    className?: string
  }
) {
  const {
    className = '',
    requiredTitle,
    icon,
    requiredImage,
    text,
    firstCta,
    secondCta,
  } = props

  const { onClickAnalytics } = useOnClickAnalytics()

  return (
    <StyledContentWrapper>
      <Separator isActive={false} />
      <StyledContent>
        <BlockRendererWithCondition
          condition={isRenderable(requiredImage?.url)}>
          <MobileImage
            src={getStrapiURL(requiredImage?.url as string)}
            alt=""
          />
        </BlockRendererWithCondition>

        <Root className={className}>
          <BlockRendererWithCondition
            condition={isRenderable(requiredImage?.url)}>
            <CardContainer>
              <Card $imageUrl={getStrapiURL(requiredImage?.url)} />
              <OutlinedText shadow>{icon}</OutlinedText>
            </CardContainer>
          </BlockRendererWithCondition>
          <RightSide>
            <Typo.Heading2>{requiredTitle}</Typo.Heading2>
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
                    !!firstCta.eventName && !!firstCta.eventOrigin
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
                    cta={secondCta as ComponentCommonLinkFragment}
                  />
                </span>
              </BlockRendererWithCondition>
            </CtaContainer>
          </RightSide>
        </Root>
      </StyledContent>
    </StyledContentWrapper>
  )
}

const StyledContentWrapper = styled(ContentWrapper)`
  ${({ theme }) => css`
    min-width: 100%;
    padding: 0;
    overflow: visible;
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      margin-top: calc(120px + var(--module-margin));
    }
  `}
`

const StyledContent = styled.div`
  ${({ theme }) => css`
    margin: auto;
    position: relative;
    margin-top: var(--module-margin);
    margin-bottom: var(--module-margin);
    background-color: ${theme.colors.saumon};
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
      position: relative;
      padding: 0;
      margin: 0;
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
    max-width: 28rem;
    margin: -3.125rem 0px;
    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0;
    }
    span {
      position: absolute;
      top: 20%;
      right: -2rem;
      font-size: ${theme.fonts.sizes['8xl']};
      transform: rotate(-7deg);

      @media (width < ${theme.mediaQueries.largeDesktop}) {
        right: 2rem;
      }
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
      padding: 0;
      margin: 0 auto;
      top: -120px;
      position: relative;
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
      margin-top: -120px;
      position: relative;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
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
  `}
`
