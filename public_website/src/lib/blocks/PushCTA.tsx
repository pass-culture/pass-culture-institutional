import React from 'react'
import { useQRCode } from 'next-qrcode'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { CTA } from '@/types/CTA'
import { APIResponse } from '@/types/strapi'
import { Link } from '@/ui/components/Link'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'

interface PushCTAProps {
  title: string
  description?: string
  image: APIResponse<'plugin::upload.file'> | null
  qrCodeDescription: string
  ctaLink: CTA
  qrCodeUrl: string
  className?: string
}

export function PushCTA(props: PushCTAProps) {
  const { SVG: QrCode } = useQRCode()

  return (
    <Root className={props.className}>
      <CardContainer>
        <Card
          $imageUrl={
            props.image?.data?.attributes.url &&
            getStrapiURL(props.image?.data.attributes.url)
          }>
          <QRCodeCard>
            <QrCode
              text={props.qrCodeUrl}
              options={{
                width: 100,
                margin: 2,
                color: { dark: theme.colors.secondary },
              }}
            />
            <p>{props.qrCodeDescription}</p>
          </QRCodeCard>
        </Card>
        <BackgroundLayer />
      </CardContainer>
      <RightSide>
        <Typo.Heading2 dangerouslySetInnerHTML={{ __html: props.title }} />
        {props.description && (
          <p dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
        <CtaLink href={props.ctaLink.URL}>
          <span>{props.ctaLink.Label}</span>
        </CtaLink>
      </RightSide>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
    max-width: 80rem;
    margin: 0 auto;
    gap: 5.625rem;
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    position: relative;

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      padding: 1.5rem;
      display: block;
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
    border-radius: 1.5rem;
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

const BackgroundLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    content: '';
    inset: 0;
    background-color: ${theme.colors.secondary};
    transform: rotate(7deg);
    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    z-index: -1;

    @media (width < ${theme.mediaQueries.tablet}) {
      max-width: 80%;
      margin: 0 auto;
      aspect-ratio: 0.8;
      inset: 0;
      transform: rotate(5deg);
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
    border-radius: 1rem;

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
      padding: 0;
      max-width: none;
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
