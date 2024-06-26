import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { ArrowLeft } from '../icons/ArrowLeft'
import { Calendar } from '../icons/Calendar'
import { Clock } from '../icons/Clock'
import { TargetBlank } from '../icons/TargeBlank'
import { Link } from '../Link'
import { CTA } from '@/types/CTA'
import { formatDate } from '@/utils/formatDate'

type ListCardProps = {
  title: string
  category: string
  date: Date | string
  imageUrl: string | null | undefined
  startTime: string | Date
  endTime: string | Date
  city: string
  cta: CTA
  type?: string
}

export function EventCard({
  title,
  category,
  date,
  imageUrl,
  startTime,
  endTime,
  city,
  cta,
  type,
}: ListCardProps) {
  const convertTime = (time: string | Date) => {
    let timeString: string

    if (typeof time === 'string') {
      timeString = time
    } else {
      const splitTime = time?.toISOString().split('T')[1]
      timeString = ''
      if (splitTime) timeString = splitTime
    }

    const timeArray = timeString.split(':')
    return `${timeArray[0]}h${timeArray[1]}`
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
            {formatDate(date)}
          </time>
          <p className="desktop">
            <Clock /> {convertTime(startTime)} <ArrowLeft />
            {convertTime(endTime)}
          </p>
          <p className="mobile">
            <Clock /> {convertTime(startTime)}
          </p>
        </StyledTimeWrapper>
        {/* ICI LA REDIRECTION SUR LES TAGS ACTU NE FONCTIONNE PAS À CAUSE DU PARAMÈTRES TYPES (VÉRIFIER SON RÔLES CAR OP SI TYPE SUP) */}
        {type
          ? cta?.URL && (
              <CtaLink href={type + cta.URL} target="_blank">
                <TargetBlank />
                {cta.Label}
              </CtaLink>
            )
          : cta?.URL && <CtaLink href={cta.URL}>{cta.Label}</CtaLink>}
      </StyledContentWrapper>

      {imageUrl && (
        <StyledCardImage
          src={imageUrl}
          alt=""
          width={385}
          height={310}
          layout="responsive" // TODO: Fix deprecated use of "layout" (https://nextjs.org/docs/messages/next-image-upgrade-to-13)
        />
      )}
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
    border-radius: 0.625rem;
    margin: 0 1rem;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding-bottom: 1.5rem;
      padding-left: 0;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      margin: 0;
    }
  `}
`
const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-self: center;
    padding-right: 1rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding-right: 0;
      padding-left: 1rem;
      align-self: start;
      padding-right: 3rem;
      width: 80%;
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
    border-radius: 100px;
    border: 1px solid ${theme.colors.white};

    outline-offset: 2px;
    transition: background 0.3s ease-in-out;
    &:hover {
      background: ${`rgba(255, 255, 255, 0.20);`};
    }
    &:active {
      outline: 2px solid ${theme.colors.white};
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      margin: auto;
      margin-bottom: 1.5rem;
      font-size: ${theme.fonts.sizes['2xs']};
      width: 80%;
    }
  `}
`
const StyledCardImage = styled(Image)`
  ${({ theme }) => css`
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
    aspect-ratio: 1.2;
    height: auto;
    min-width: 100%;
    object-fit: cover;

    @media (width < ${theme.mediaQueries.tablet}) {
      border-top-right-radius: 0.625rem;
      border-top-left-radius: 0.625rem;
      border-bottom-right-radius: 0rem;
    }
  `}
`
