import React from 'react'
import { useQRCode } from 'next-qrcode'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { is } from '@react-three/fiber/dist/declarations/src/core/utils'
import { Button } from '@/ui/components/button/Button'

interface PushCTAProps {
  title: string
  description?: string
  image: APIResponse<'plugin::upload.file'> | null
  ctaLink: { Label: string; URL: string }

  className?: string
}

export function SimplePushCta(props: PushCTAProps) {
  const { SVG: QrCode } = useQRCode()

  return (
    <Root className={props.className}>
      <RightSide>
        {props.description && (
          <p dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
        <Title dangerouslySetInnerHTML={{ __html: props.title }} />
        <CtaLink href={props.ctaLink.URL}>{props.ctaLink.Label}</CtaLink>
      </RightSide>
      <CardContainer>
        <Card
          $imageUrl={
            props.image?.data.attributes.url &&
            getStrapiURL(props.image?.data.attributes.url)
          }></Card>
      </CardContainer>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    max-width: 90rem;
    margin: 0 auto;
    gap: 5.625rem;
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    position: relative;

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      padding: 1.5rem;
      display: block;
      color: ${theme.colors.black};
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
    // background-color: ${theme.colors.tertiary};
    border-radius: 1rem;
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    // background-position: center 4.5rem;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);

    @media (width < ${theme.mediaQueries.tablet}) {
      width: 100%;
      margin-bottom: 3.75rem;
      aspect-ratio: 0.8;
      padding: 0;
    }
  `}
`

const RightSide = styled.div`
  ${({ theme }) => css`
    padding: 6.25rem 0;
    padding-left: 5rem;
    max-width: 35rem;

    h2 {
      margin-bottom: 1.25rem;
    }

    p {
      font-size: ${theme.fonts.sizes.xl};
      line-height: 2.125rem;
      font-weight: ${theme.fonts.weights.medium};

      //   margin-bottom: 2rem;
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

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;

    margin-right: 1.5rem;
    // background: linear-gradient(
    //   90deg,
    //   ${theme.colors.tertiary},
    //   ${theme.colors.secondary}
    // );
    color: ${theme.colors.white};

    padding: 1rem 1.75rem;
    border-radius: 9999px;
    border: 1px solid ${theme.colors.white};

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
  `}
`

const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['6xl']};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
  `}
`
