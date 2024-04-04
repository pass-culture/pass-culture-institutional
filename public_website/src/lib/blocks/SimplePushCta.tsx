import React from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { Link } from '@/ui/components/Link'
import { getStrapiURL } from '@/utils/apiHelpers'

interface PushCTAProps {
  title: string | undefined
  surtitle: string | undefined
  image: APIResponse<'plugin::upload.file'> | null | undefined
  cta: { Label: string; URL: string } | undefined
  icon: string | undefined
  className?: string
}

export function SimplePushCta(props: PushCTAProps) {
  return (
    <Root className={props.className}>
      <RightSide>
        {props.surtitle && (
          <p dangerouslySetInnerHTML={{ __html: props.surtitle }} />
        )}

        {props.title && (
          <Title dangerouslySetInnerHTML={{ __html: props.title }} />
        )}
        {props.cta && <CtaLink href={props.cta.URL}>{props.cta.Label}</CtaLink>}
      </RightSide>
      <CardContainer>
        <Card
          $imageUrl={
            props.image?.data.attributes.url &&
            getStrapiURL(props.image?.data.attributes.url)
          }></Card>
        <p>{props.icon}</p>
      </CardContainer>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    max-width: 90rem;
    margin: 10rem auto;
    gap: 5.625rem;
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    position: relative;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 1.5rem;
      display: block;
      border-radius: 0;
      text-align: center;
      padding-top: 10.125rem;
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: -3.125rem 0 -3.125rem 5rem;
  max-width: 28rem;

  p {
    position: absolute;
    top: 20%;
    font-size: ${theme.fonts.sizes['8xl']};
    right: -1.5rem;
    transform: rotate(7deg);
  }
  @media (width < ${theme.mediaQueries.tablet}) {
    margin: 0 auto;
    position: absolute;

    top: -6rem;

    min-width: 90%;
    min-height: 40%;

    p {
      display: none;
    }
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
    padding-left: 5rem;
    max-width: 35rem;

    h2 {
      margin-bottom: 1.25rem;
    }

    p {
      font-size: ${theme.fonts.sizes.xl};
      line-height: 2.125rem;
      font-weight: ${theme.fonts.weights.medium};
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

    margin-right: 1.5rem;

    color: ${theme.colors.white};

    padding: 1rem 1.75rem;
    border-radius: 100px;
    border: 1px solid ${theme.colors.white};

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-right: 0;
      margin-bottom: 1.5rem;
      font-size: ${theme.fonts.sizes['2xs']};
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
      font-size: ${theme.fonts.sizes['5xl']};
    }
  `}
`
