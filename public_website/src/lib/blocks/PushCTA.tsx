import React from 'react'
import { useQRCode } from 'next-qrcode'
import styled, { css } from 'styled-components'

import { onClickAnalytics } from '../analytics/helpers'
import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { theme } from '@/theme/theme'
import { PushCTAProps, QRCodeProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function PushCTA(props: PushCTAProps & QRCodeProps) {
  const { SVG: QrCode } = useQRCode()
  const {
    className = '',
    title,
    description,
    icon,
    ctaLink,
    qrCodeDescription,
    image,
    qrCodeUrl,
  } = props

  const image_props = image?.data?.attributes?.url

  return (
    <Root className={className}>
      <BlockRendererWithCondition condition={isRenderable(image_props)}>
        <CardContainer>
          <Card $imageUrl={getStrapiURL(image_props)}>
            <QRCodeCard>
              <QrCode
                text={qrCodeUrl}
                options={{
                  width: 100,
                  margin: 2,
                  color: { dark: theme.colors.secondary },
                }}
              />
              <p>{qrCodeDescription}</p>
            </QRCodeCard>
          </Card>
          <BlockRendererWithCondition condition={isRenderable(icon)}>
            <OutlinedText>{icon}</OutlinedText>
          </BlockRendererWithCondition>
        </CardContainer>
      </BlockRendererWithCondition>
      <RightSide>
        <Typo.Heading2>{title}</Typo.Heading2>
        <BlockRendererWithCondition condition={isRenderable(description)}>
          <p aria-label={parseText(description as string).accessibilityLabel}>
            {parseText(description as string).processedText}
          </p>
        </BlockRendererWithCondition>
        <CtaLink
          href={ctaLink.URL}
          onClick={(): void =>
            onClickAnalytics({
              eventName: ctaLink.eventName,
              eventOrigin: ctaLink.eventOrigin,
            })
          }>
          <span>{ctaLink.Label}</span>
        </CtaLink>
      </RightSide>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    background-color: ${theme.colors.sky};
    max-width: 80rem;
    margin: 0 auto;
    gap: 5.625rem;
    border-radius: ${theme.radius.sm};
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    position: relative;
    margin-top: calc(var(--module-margin) + 1.5625rem);
    margin-bottom: calc(var(--module-margin) + 1.5625rem);
    @media (width < ${theme.mediaQueries.tablet}) {
      overflow: visible;
      
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      background-color: transparent;
      display: block;
      padding-top: 1rem;
      margin-top: calc(var(--module-margin) - 1.75rem);
      &:before {
        content: ' ';
        height: 85%;
        background-color: ${theme.colors.sky};
        width: 90%;
        position: absolute;
        top: 20%;
        margin-left: -45%;
        left: 50%;
        z-index: 0;
        border-radius: ${theme.radius.sm};
      }
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: -3.125rem 0 -3.125rem 5rem;
  max-width: 28rem;

  @media (width < ${theme.mediaQueries.tablet}) {
    margin: 0 auto;
  }
`
const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    background-color: ${theme.colors.tertiary};
    border-radius: ${theme.radius.sm};
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-position: center 4.5rem;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);

    @media (width < ${theme.mediaQueries.tablet}) {
      max-width: 80%;
      margin: 0 auto 3.75rem;
      aspect-ratio: 0.8;
      padding: 0;
    }
  `}
`
const QRCodeCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    padding: 1.125rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    border-radius: ${theme.radius.sm};
    box-shadow: ${theme.shadows.sticker};

    p {
      font-weight: ${theme.fonts.weights.bold};
      line-height: 1.3125;
    }

    svg {
      border-radius: 0.625rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    }
  `}
`
const RightSide = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 6.25rem 0;
    max-width: 32rem;

    h2 {
      margin-bottom: 1.25rem;
    }

    p {
      font-size: ${theme.fonts.sizes.m};
      line-height: 2.125rem;
      font-weight: ${theme.fonts.weights.medium};
      margin-bottom: 2rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 0.5rem 4rem;
      max-width: none;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 0.5rem 2rem;
    }
  `}
`
const CtaLink = styled(Link)`
  ${({ theme }) => css`
    display: inline-block;

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;
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
    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary},
      ${theme.colors.secondary}
    );
    color: ${theme.colors.white};
    padding: 1rem 1.75rem;
    border-radius: 100px;
  `}
`
