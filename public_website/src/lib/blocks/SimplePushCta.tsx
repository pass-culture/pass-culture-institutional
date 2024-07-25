import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { theme } from '@/theme/theme'
import { CTA } from '@/types/CTA'
import { PushCTAProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

const SimplePushCtaTitle = (props: { title: string }): React.ReactNode => {
  const { title } = props

  return (
    <Title aria-label={parseText(title).accessibilityLabel}>
      {parseText(title).processedText}
    </Title>
  )
}
const SimplePushCtaSurTitle = (props: {
  surtitle: string
}): React.ReactNode => {
  const { surtitle } = props
  return (
    <p aria-label={parseText(surtitle).accessibilityLabel}>
      {parseText(surtitle).processedText}
    </p>
  )
}
const SimplePushCtaLink = (props: {
  Label: string
  URL: string
}): React.ReactNode => {
  const { URL, Label } = props
  return (
    <CtaLink href={URL}>
      <span>{Label}</span>
    </CtaLink>
  )
}
const SimplePushCtaCard = (props: { url: string }): React.ReactNode => {
  const { url } = props
  return <Card $imageUrl={getStrapiURL(url)} />
}

export function SimplePushCta(props: PushCTAProps) {
  const { className, surtitle, title, cta, image, icon } = props
  const image_props = image?.data?.attributes?.url

  return (
    <StyledContentWrapper>
      <Root className={className}>
        <RightSide>
          <BlockRendererWithCondition condition={isRenderable(surtitle)}>
            <SimplePushCtaSurTitle surtitle={surtitle as string} />
          </BlockRendererWithCondition>
          <BlockRendererWithCondition condition={isRenderable(title)}>
            <SimplePushCtaTitle title={title} />
          </BlockRendererWithCondition>
          <BlockRendererWithCondition condition={isRenderable(cta?.URL)}>
            <SimplePushCtaLink {...(cta as CTA)} />
          </BlockRendererWithCondition>
        </RightSide>
        <CardContainer>
          <BlockRendererWithCondition condition={isRenderable(image_props)}>
            <SimplePushCtaCard url={image_props as string} />
          </BlockRendererWithCondition>
          <BlockRendererWithCondition condition={isRenderable(icon)}>
            <OutlinedText>{icon}</OutlinedText>
          </BlockRendererWithCondition>
        </CardContainer>
      </Root>
    </StyledContentWrapper>
  )
}

const StyledContentWrapper = styled.section`
  background-color: ${theme.colors.deepink};
  min-width: 100%;
  padding: 0;
  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  margin-top: calc(var(--module-margin) * 2 + 3.125rem);
  margin-bottom: calc(var(--module-margin) * 2 + 3.125rem);
  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: 0;
    margin-top: calc(var(--module-margin) * 2 + 3.125rem);
    margin-bottom: calc(var(--module-margin) * 2);
  }
  @media (width < ${theme.mediaQueries.largeDesktop}) {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: calc(var(--module-margin) * 2 + 8rem);
    margin-bottom: calc(var(--module-margin) * 2);
  }
`

const Root = styled.div`
  ${({ theme }) => css`
    gap: 5.625rem;
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    position: relative;
    max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
    margin: 0 auto;
    color: ${theme.colors.secondary};

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      max-width: 100%;
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      border-radius: 0;
      text-align: center;
      gap: 0;
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  max-width: 28rem;
  margin: -3.125rem 0;
  span {
    position: absolute;
    bottom: 20%;
    font-size: ${theme.fonts.sizes['8xl']};
    left: -1.5rem;
    transform: rotate(7deg);
  }

  @media (width < ${theme.mediaQueries.largeDesktop}) {
    margin: 0 auto;
    position: relative;
    min-width: 30rem;
    margin-top: -8rem;
    span {
      display: none;
    }
  }
  @media (width < ${theme.mediaQueries.mobile}) {
    min-width: 100%;
  }
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    border-radius: ${theme.radius.sm};
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    aspect-ratio: 333.49/415;

    @media (width < ${theme.mediaQueries.tablet}) {
      width: 23rem;
      padding: 0;
      margin: 0 auto;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      width: 18rem;
      padding: 0;
      margin: 0 auto;
    }
  `}
`

const RightSide = styled.div`
  ${({ theme }) => css`
    padding: 4rem 0 4rem 2rem;
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

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      margin-bottom: 4rem;
      position: relative;
      padding: 0;
      display: block;
      p {
        margin-top: 1rem;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 0;
      padding: 2rem;
      p {
        margin-bottom: 1.25rem;
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
      background: ${theme.colors.secondary};
      color: ${theme.colors.white};
    }
    &:active {
      outline: 2px solid ${theme.colors.secondary};
    }
    color: ${theme.colors.secondary};

    padding: 1rem 1.75rem;
    border-radius: 100px;
    border: 1px solid ${theme.colors.secondary};

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
