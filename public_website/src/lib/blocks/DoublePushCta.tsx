import React from 'react'
import styled, { css } from 'styled-components'

import { onClickAnalytics } from '../analytics/helpers'
import { CTA } from '@/types/CTA'
import { APIResponse } from '@/types/strapi'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { parseText } from '@/utils/parseText'

interface DoublePushCTAProps {
  title: string
  text: string | undefined
  image: APIResponse<'plugin::upload.file'> | null | undefined
  firstCta: CTA

  secondCta: CTA | undefined
  className?: string
  icon?: string
}

export function DoublePushCTA(props: DoublePushCTAProps) {
  return (
    <StyledContentWrapper>
      <MobileImage
        src={
          props.image?.data?.attributes?.url &&
          getStrapiURL(props.image?.data?.attributes?.url)
        }
        alt=""
      />
      <Root className={props.className}>
        <CardContainer>
          <Card
            $imageUrl={
              props.image?.data?.attributes?.url &&
              getStrapiURL(props.image?.data?.attributes?.url)
            }></Card>

          <OutlinedText shadow>{props.icon}</OutlinedText>
        </CardContainer>
        <RightSide>
          {props.title && <Typo.Heading2>{props.title}</Typo.Heading2>}
          {props.text && (
            <p aria-label={parseText(props.text).accessibilityLabel}>
              {parseText(props.text).processedText}
            </p>
          )}
          <CtaLink
            href={props.firstCta?.URL}
            onClick={() => {
              onClickAnalytics({
                eventName: props.firstCta?.eventName,
                eventOrigin: props.firstCta?.eventOrigin,
              })
            }}>
            <span>{props.firstCta?.Label}</span>
          </CtaLink>
          {props.secondCta && (
            <ButtonWithCTA
              target="_blank"
              variant="quaternary"
              cta={props.secondCta}
            />
          )}
        </RightSide>
      </Root>
    </StyledContentWrapper>
  )
}

const StyledContentWrapper = styled(ContentWrapper)`
  // Offset for protruding image
  padding-top: 3.125rem;
  padding-bottom: 3.125rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: 0;
  }
`

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
    gap: 5.625rem;
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    position: relative;
    margin: 0 -3.4rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: block;
      position: relative;
      padding-top: 25.125rem;
      margin: 0;
      margin-top: 15.125rem;
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

const CardContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: 1;
    margin: -3.125rem 0;
    margin-left: 3.4rem;
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
      position: absolute;

      min-width: 90%;
      min-height: 40%;

      top: -10rem;
      left: 1.8rem;
      span {
        display: none;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0 auto;
      position: absolute;

      min-width: 90%;
      min-height: 40%;

      top: -7rem;
      left: 1.8rem;
    }
  `}
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    border-radius: 1rem;
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
      width: 80%;
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
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-top: 12rem;
      margin-top: -10rem;
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
    border-radius: 100px;
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
    width: 85%;
    margin: 0 2rem;
    z-index: 1;
    position: relative;
    border-radius: 1rem;
    object-fit: cover;
    max-width: 13rem;

    aspect-ratio: 13/16;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: block;
    }
  `}
`
