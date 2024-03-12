import React from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { Button } from '@/ui/components/button/Button'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'

interface DoublePushCTAProps {
  title: string | undefined | TrustedHTML
  description: string | undefined
  image: APIResponse<'plugin::upload.file'> | null | undefined
  ctaLink: { Label: string; URL: string } | undefined

  secondctaLink: { Label: string; URL: string } | undefined
  className?: string
}

export function DoublePushCTA(props: DoublePushCTAProps) {

  return (
    <Root className={props.className}>
      <CardContainer>
        <Card
          $imageUrl={
            props.image?.data.attributes.url &&
            getStrapiURL(props.image?.data.attributes.url)
          }></Card>
      </CardContainer>
      <RightSide>
        {props.title && (
          <Typo.Heading2 dangerouslySetInnerHTML={{ __html: props.title }} />
        )}
        {props.description && (
          <p dangerouslySetInnerHTML={{ __html: props.description }} />
        )}

        <CtaLink href={props.ctaLink?.URL}>{props.ctaLink?.Label}</CtaLink>
        <Button
          href={props.secondctaLink?.URL}
          target="_blank"
          variant="quaternary">
          {props.secondctaLink?.Label}
        </Button>
      </RightSide>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
    max-width: 90rem;
    margin: 0 auto;
    gap: 5.625rem;
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    position: relative;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 1.5rem;
      display: block;

      border-radius: 0;

      position: relative;
      padding-top: 7.125rem;
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
    position: absolute;

    min-width: 90%;
    min-height: 40%;

    top: -8rem;
    left: 1.8rem;
  }
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

    @media (width < ${theme.mediaQueries.tablet}) {
      width: 95%;
      aspect-ratio: 1.5;
      padding: 0;
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
    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary},
      ${theme.colors.secondary}
    );
    color: ${theme.colors.white};

    padding: 1rem 1.75rem;
    border-radius: 9999px;

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
  `}
`
