import React from 'react'
import { useQRCode } from 'next-qrcode'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

interface PushCTAProps {
  Title: string
  Text?: string
  Image: APIResponse<'plugin::upload.file'> | null
}

export function PushCTA(props: PushCTAProps) {
  const qrCodeUrl = 'https://example.com'

  const { SVG: QrCode } = useQRCode()

  return (
    <Root>
      <ImageContainer
        imageUrl={
          props.Image?.data.attributes.url &&
          getStrapiURL(props.Image?.data.attributes.url)
        }>
        <QRCodeCard>
          <QrCode
            text={qrCodeUrl}
            /* TODO: plug theme color */
            options={{ width: 100, margin: 2, color: { dark: '#2D0390' } }}
          />
          <p>Scanne ce QR code pour télécharger l’application</p>
        </QRCodeCard>
      </ImageContainer>
      <BackgroundLayer />
      <RightSide>
        <h2 dangerouslySetInnerHTML={{ __html: props.Title }} />
        {props.Text && <p dangerouslySetInnerHTML={{ __html: props.Text }} />}
        <CtaLink href="#">Télécharger l’application</CtaLink>
      </RightSide>
    </Root>
  )
}

// TODO: plug theme colors
// TODO: adjust left card size

const Root = styled.div`
  ${({ theme }) => css`
    background-color: #f6f4fa;
    max-width: 80rem;
    margin: 6.25rem auto;
    gap: 5.625rem;
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    position: relative;

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      grid-template-columns: 1fr;
      gap: 3.75rem;
      padding: 1rem;
    }
  `}
`

const ImageContainer = styled.div<{ imageUrl?: string }>`
  ${({ imageUrl, theme }) => css`
    background-color: #eb0055;
    max-width: 28rem;
    border-radius: 1rem;
    margin: -3.125rem 0 -3.125rem 5rem;
    background-image: ${imageUrl ? `url(${imageUrl})` : 'none'};
    background-size: cover;
    background-position: center 4.5rem;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;

    position: relative;
    z-index: 1;

    @media (width < ${theme.mediaQueries.tablet}) {
      max-width: 100%;
      margin: 0;
      aspect-ratio: 0.8;
      padding: 0;
    }
  `}
`

const BackgroundLayer = styled.div`
  ${({ theme }) => css`
    grid-column: 1 / span 1;
    margin: -3.125rem 0 -3.125rem 5rem;
    position: absolute;
    content: '';
    inset: 1rem;
    background-color: ${theme.colors.secondary};
    z-index: -1;
    transform: rotate(10deg);
    border-radius: 1.5rem;
    z-index: 0;

    @media (width < ${theme.mediaQueries.tablet}) {
      max-width: 100%;
      margin: 0;
      aspect-ratio: 0.8;
      inset: 1rem;
      transform: rotate(5deg);
    }
  `}
`

const QRCodeCard = styled.div`
  ${({ theme }) => css`
    background-color: #2d0390;
    color: ${theme.colors.white};
    padding: 1.125rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    border-radius: 1rem;

    box-shadow: ${theme.shadows.sticker};

    p {
      font-weight: 700;
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
      font-size: 2.5rem;
      line-height: 1.25;
      font-weight: 700;

      color: ${theme.colors.secondary};

      margin-bottom: 1.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 2.125rem;
      font-weight: 500;

      margin-bottom: 2rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 0;
      max-width: none;
    }
  `}
`

const CtaLink = styled.a`
  ${({ theme }) => css`
    display: inline-block;

    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.4;

    background: linear-gradient(90deg, #eb0055, ${theme.colors.secondary});
    color: ${theme.colors.white};

    padding: 1rem 1.75rem;
    border-radius: 9999px;
  `}
`
