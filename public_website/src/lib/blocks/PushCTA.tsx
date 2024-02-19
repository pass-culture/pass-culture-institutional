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
// TODO: plug theme typographies (maybe ?)
// TODO: adjust left card size

const Root = styled.div`
  background-color: #f6f4fa;
  max-width: 80rem;
  margin: 6.25rem auto;
  gap: 5.625rem;
  border-radius: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
`

const ImageContainer = styled.div<{ imageUrl?: string }>`
  ${({ imageUrl }) => css`
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
  `}
`

const BackgroundLayer = styled.div`
  grid-column: 1 / span 1;
  margin: -3.125rem 0 -3.125rem 5rem;
  position: absolute;
  content: '';
  inset: 0;
  background-color: #320096;
  z-index: -1;
  transform: rotate(7deg);
  border-radius: 1rem;
  z-index: 0;
`

const QRCodeCard = styled.div`
  background-color: #2d0390;
  color: white;
  padding: 1.125rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-radius: 1rem;

  box-shadow: -4px 8px 24px 0px #00000036;

  p {
    font-weight: 700;
    line-height: 1.3125;
  }

  svg {
    border-radius: 0.625rem;
  }
`

const RightSide = styled.div`
  padding: 6.25rem 0;
  max-width: 32rem;

  h2 {
    font-size: 2.5rem;
    line-height: 1.25;
    font-weight: 700;

    color: #320096;

    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1rem;
    line-height: 2.125rem;
    font-weight: 500;

    margin-bottom: 2rem;
  }
`

const CtaLink = styled.a`
  display: inline-block;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;

  background: linear-gradient(90deg, #eb0055, #320096);
  color: #ffffff;

  padding: 1rem 1.75rem;
  border-radius: 9999px;
`
