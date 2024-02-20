import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'

type EligibilitySectionProps = {
  title: string
  items: { title: string; description: string; emoji: string }[]
  cardTitle: string
  cardDescription: string
  cardCta: { Label: string; URL: string }
  cardFirstEmoji: string
  cardSecondEmoji: string
}

export function EligibilitySection({
  title,
  items,
  cardTitle,
  cardDescription,
  cardCta,
  cardFirstEmoji,
  cardSecondEmoji,
}: EligibilitySectionProps) {
  return (
    <Root>
      <StyledCard>
        <StyledCardHeading dangerouslySetInnerHTML={{ __html: cardTitle }} />
        <StyledCardDescription>{cardDescription}</StyledCardDescription>
        <Button variant="tertiary" href={cardCta.URL}>
          {cardCta.Label}
        </Button>
        <StyledCardFirstEmoji aria-hidden="true">
          {cardFirstEmoji}
        </StyledCardFirstEmoji>
        <StyledCardSecondEmoji aria-hidden="true">
          {cardSecondEmoji}
        </StyledCardSecondEmoji>
      </StyledCard>
      <StyledListContainer>
        <StyledListHeading>{title}</StyledListHeading>
        <StyledList>
          {items.map((item, i) => {
            return (
              <StyledListItem key={i}>
                <span aria-hidden="true">{item.emoji}</span>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </StyledListItem>
            )
          })}
        </StyledList>
      </StyledListContainer>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 1.5rem;
    padding: 0 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
    }
  `}
`

const StyledCard = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      #eb0055 0%,
      ${theme.colors.secondary} 100%
    );
    border-radius: 2.5rem;
    padding: 5rem 4rem;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    container-type: inline-size;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 2rem 1rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 4rem 2rem 5rem;
    }
  `}
`

const StyledCardHeading = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weights.bold};
    font-size: ${theme.fonts.sizes['6xl']};
    transform: rotate(-2deg);

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['4xl']};
    }
  `}
`

const StyledCardDescription = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weights.medium};
    line-height: 2;
  `}
`

const StyledCardFirstEmoji = styled.span`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 2rem;
    font-size: ${theme.fonts.sizes['8xl']};
    transform: rotate(10deg);

    @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    }
  `}
`

const StyledCardSecondEmoji = styled.span`
  ${({ theme }) => css`
    position: absolute;
    bottom: 2rem;
    left: -0.8rem;
    font-size: ${theme.fonts.sizes['8xl']};
    transform: rotate(-50deg);
  `}
`

const StyledListContainer = styled.div`
  ${({ theme }) => css`
    border-radius: 2.5rem;
    background: ${theme.colors.lightBlue};
    padding: 3.25rem 3rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 2.5rem 2rem;
    }
  `}
`

const StyledListHeading = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes['4xl']};
    font-weight: ${theme.fonts.weights.bold};
    margin-bottom: 1.5rem;
    line-height: 1.4;
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 2.5rem;
    }
  `}
`

const StyledListItem = styled.li`
  ${({ theme }) => css`
    display: grid;
    align-items: center;
    grid-template-columns: 2.25rem 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'emoji title'
      'emoji description';
    gap: 0 2.75rem;

    span {
      grid-area: emoji;
      font-size: ${theme.fonts.sizes['5xl']};
      justify-self: center;
      transform: rotate(-10deg);

      @media (width < ${theme.mediaQueries.mobile}) {
        justify-self: start;
        margin-bottom: 1rem;
      }
    }

    p:first-of-type {
      grid-area: title;
      font-weight: ${theme.fonts.weights.bold};
    }

    p:last-child {
      grid-area: description;
      font-weight: ${theme.fonts.weights.medium};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'emoji'
        'title'
        'description';
    }
  `}
`
