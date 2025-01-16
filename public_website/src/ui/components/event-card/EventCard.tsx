import React from 'react'
import Image from "next/legacy/image"
import styled, { css } from 'styled-components'

import { ArrowLeft } from '../icons/ArrowLeft'
import { Calendar } from '../icons/Calendar'
import { Clock } from '../icons/Clock'
import { TargetBlank } from '../icons/TargeBlank'
import { Link } from '../Link'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CTA } from '@/types/CTA'
import { ListCardProps } from '@/types/props'
import { convertTime } from '@/utils/convertTime'
import { getFormattedDateAfterComparison } from '@/utils/getFormattedDateAfterComparison'
import { isRenderable } from '@/utils/isRenderable'

export function EventCard(
  props: Omit<
    ListCardProps & {
      startTime: string | Date
      endTime: string | Date
      endDate: string | Date | null | undefined
      city: string
      cta: CTA
    },
    'slug'
  >
) {
  const {
    title,
    category,
    date,
    endDate,
    imageUrl,
    startTime,
    endTime,
    city,
    cta,
    type,
  } = props

  const imageUrlProps = isRenderable(imageUrl)
  const typeProps = isRenderable(type)

  const renderCTA = (): React.ReactNode => {
    if (typeProps)
      return (
        <CtaLink href={cta.URL} target="_blank">
          <TargetBlank />
          {cta.Label}
        </CtaLink>
      )

    return <CtaLink href={cta.URL}>{cta.Label}</CtaLink>
  }

  return (
    <Root>
      <StyledContentWrapper>
        <StyledLocation>
          {category} {city}
        </StyledLocation>
        <StyledLocationTitle>{title}</StyledLocationTitle>
        <StyledTimeWrapper>
          <time>
            <Calendar />
            {getFormattedDateAfterComparison(date, endDate)}
          </time>
          <p className="desktop">
            <Clock /> {convertTime(startTime)} <ArrowLeft />
            {convertTime(endTime)}
          </p>
          <p className="mobile">
            <Clock /> {convertTime(startTime)}
          </p>
        </StyledTimeWrapper>
        {renderCTA()}
      </StyledContentWrapper>

      <BlockRendererWithCondition condition={imageUrlProps}>
        <StyledCardImage
          src={imageUrl as string}
          alt=""
          width={385}
          height={310}
          layout="responsive"
        />
      </BlockRendererWithCondition>
    </Root>
  )
}

const Root = styled.article`
  ${({ theme }) => css`
    position: relative;
    max-width: 100%;
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    padding-left: 4rem;
    border-radius: ${theme.radius.sm};
    margin: 0 1rem;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-bottom: 1.5rem;
      padding-left: 0;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      margin: 0;

      border-top-right-radius: ${theme.radius.sm};
      border-top-left-radius: ${theme.radius.sm};
      border-bottom-right-radius: 0rem;
      border-bottom-left-radius: 0rem;
    }
  `}
`
const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-self: center;
    padding-right: 1rem;
    box-sizing: border-box;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 2rem;
      align-self: start;
      width: 100%;
    }
  `}
`
const StyledLocation = styled.p`
  ${({ theme }) => css`
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-size: ${theme.fonts.sizes['2xs']};
    font-weight: ${theme.fonts.weights.semiBold};
    width: fit-content;
  `}
`

const StyledLocationTitle = styled.h3`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.bold};
    font-size: ${theme.fonts.sizes['6xl']};
    margin-bottom: 1rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      font-size: ${theme.fonts.sizes['3xl']};
    }
  `}
`

const StyledTimeWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding-right: 1rem;
    gap: 3rem;
    margin-bottom: 3rem;
    .desktop {
      display: flex;
      align-items: center;
      gap: 1.3rem;
    }
    .mobile {
      display: none;
      align-items: center;
      gap: 0.5rem;
    }
    time {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      flex-direction: column;
      gap: 1.5rem;
      .desktop {
        display: none;
      }
      .mobile {
        display: flex;
      }
    }
  `}
`
const CtaLink = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: fit-content;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;
    color: ${theme.colors.white};
    padding: 1rem 1.75rem;
    border-radius: 6.25rem;
    border: 0.0625rem solid ${theme.colors.white};
    outline-offset: 0.125rem;
    transition: background 0.3s ease-in-out;
    &:hover {
      background: ${`rgba(255, 255, 255, 0.20);`};
    }
    &:active {
      outline: 0.125rem solid ${theme.colors.white};
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      margin: auto;
      margin-bottom: 1.5rem;
      font-size: ${theme.fonts.sizes['2xs']};
    }
  `}
`
const StyledCardImage = styled(Image)`
  ${({ theme }) => css`
    border-top-right-radius: ${theme.radius.sm};
    border-bottom-right-radius: ${theme.radius.sm};
    aspect-ratio: 1.2;
    min-width: 100%;
    object-fit: cover;
    min-height: 100%;

    @media (width < ${theme.mediaQueries.mobile}) {
      border-top-right-radius: ${theme.radius.sm};
      border-top-left-radius: ${theme.radius.sm};
      border-bottom-right-radius: 0rem;
      border-bottom-left-radius: 0rem;
    }
  `}
`
