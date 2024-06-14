import React from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { CTA } from '@/types/CTA'
import { APIResponse } from '@/types/strapi'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { getStrapiURL } from '@/utils/apiHelpers'
import { parseText } from '@/utils/parseText'

interface PushCTAProps {
  title: string | undefined
  surtitle: string | undefined
  image: APIResponse<'plugin::upload.file'> | null | undefined
  cta: CTA | undefined
  icon: string | undefined
  className?: string
}

export function SimplePushCta(props: PushCTAProps) {
  return (
    <Root className={props.className}>
      <StyledContentWrapper $noMargin>
        <RightSide>
          {props.surtitle && (
            <p aria-label={parseText(props.surtitle).accessibilityLabel}>
              {parseText(props.surtitle).processedText}
            </p>
          )}

          {props.title && (
            <Title aria-label={parseText(props.title).accessibilityLabel}>
              {parseText(props.title).processedText}
            </Title>
          )}
          {props.cta && (
            <CtaLink href={props.cta.URL}>
              <span>{props.cta.Label}</span>
            </CtaLink>
          )}
        </RightSide>
        <CardContainer>
          <Card
            $imageUrl={
              props.image?.data?.attributes?.url &&
              getStrapiURL(props.image?.data?.attributes?.url)
            }></Card>
          <OutlinedText>{props.icon}</OutlinedText>
        </CardContainer>
      </StyledContentWrapper>
    </Root>
  )
}

const StyledContentWrapper = styled(ContentWrapper)`
  gap: 5.625rem;

  display: grid;
  grid-template-columns: 1.25fr 1fr;
  position: relative;
  width: 100%;

  @media (width < ${theme.mediaQueries.tablet}) {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    max-width: 90rem;
    margin: auto;
    border-radius: 2.5rem;

    margin-top: calc(var(--module-margin) + 3.125rem);
    margin-bottom: calc(var(--module-margin) + 3.125rem);

    @media (width < ${theme.mediaQueries.extraLargeDesktop}) {
      max-width: 95%;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-bottom: var(--module-margin);
      margin-top: calc(var(--module-margin) + 19rem);

      max-width: 100%;

      display: flex;
      justify-content: center;
      border-radius: 0;
      text-align: center;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: calc(var(--module-margin) + 7rem);
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  margin: -3.125rem 0 -3.125rem 5rem;
  max-width: 28rem;

  span {
    position: absolute;
    bottom: 20%;
    font-size: ${theme.fonts.sizes['8xl']};
    left: -1.5rem;
    transform: rotate(7deg);
  }

  @media (width < ${theme.mediaQueries.tablet}) {
    margin: auto;
    position: absolute;

    top: -19rem;

    min-width: 90%;
    min-height: 40%;

    span {
      display: none;
    }
  }

  @media (width < ${theme.mediaQueries.mobile}) {
    top: -7rem;
  }
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    border-radius: 1rem;
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    aspect-ratio: 333.49/415;

    @media (width < ${theme.mediaQueries.tablet}) {
      width: 80%;
      padding: 0;
      margin: 0 auto;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      max-width: 23rem;
      width: unset;
      height: unset;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 16rem;
      width: unset;
      height: unset;
    }
  `}
`

const RightSide = styled.div`
  ${({ theme }) => css`
    padding: 4rem 0 4rem 0;
    max-width: 35rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h2 {
      margin-bottom: 1.25rem;
    }

    p {
      font-size: ${theme.fonts.sizes.xl};
      line-height: 2.125rem;
      font-weight: ${theme.fonts.weights.medium};
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-bottom: 4rem;
      padding-left: 0;
      padding-top: 11rem;
      padding-bottom: 0;

      display: block;
      p {
        margin-top: 1rem;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3rem auto 3rem auto;
      margin-bottom: 0;

      p {
        margin: 0;
        font-size: ${theme.fonts.sizes.s};
      }
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

    outline-offset: 2px;
    transition: background 0.3s ease-in-out;
    &:hover {
      background: ${`rgba(255, 255, 255, 0.20);`};
    }
    &:focus {
      outline: 2px solid ${theme.colors.white};
    }
    color: ${theme.colors.white};

    padding: 1rem 1.75rem;
    border-radius: 100px;
    border: 1px solid ${theme.colors.white};

    @media (width < ${theme.mediaQueries.mobile}) {
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

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-right: 0;
      margin-bottom: 1.5rem;
      font-size: ${theme.fonts.sizes['3xl']};
    }
  `}
`
