import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { EventFragment } from '@/generated/graphql'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { EventCard } from '@/ui/components/event-card/EventCard'
import { getStrapiURL } from '@/utils/apiHelpers'

type EventListItemsProps = {
  type: string
  events: NonNullable<EventFragment[]>
  className?: string
  buttonText: string
}

export function EventListItems(props: EventListItemsProps) {
  const { events, className, buttonText, type } = props
  const [visibleItems, setVisibleItems] = useState<number>(2)

  const loadMore = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + 2, events.length)
    )
  }

  const isMoreButton = (): boolean => {
    return visibleItems < events.length
  }

  return (
    <Root className={className}>
      <BlockRendererWithCondition condition={events.length > 0}>
        <StyledList>
          {events.slice(0, visibleItems).map((eventItem) => (
            <li key={eventItem.slug}>
              <EventCard
                title={eventItem.title}
                category={eventItem.category}
                date={eventItem.date}
                endDate={eventItem.endDate}
                imageUrl={eventItem.image && getStrapiURL(eventItem.image?.url)}
                startTime={eventItem.startTime}
                endTime={eventItem.endTime}
                city={eventItem.city}
                cta={eventItem.cta}
                type={type}
              />
            </li>
          ))}
        </StyledList>
      </BlockRendererWithCondition>
      <BlockRendererWithCondition condition={isMoreButton()}>
        <LoadMoreButton onClick={loadMore}>{buttonText}</LoadMoreButton>
      </BlockRendererWithCondition>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    padding: 1rem 1.5rem;
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;

    > a {
      align-self: center;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      padding-bottom: 0;
    }
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
    }
  `}
`

const LoadMoreButton = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    margin-top: 1.875rem;
    margin-inline: auto;

    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary} -11.18%,
      ${theme.colors.secondary} 64.8%
    );
    border-radius: 2rem;
    color: ${theme.colors.white};
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 1rem 2rem;
    text-align: center;
    width: max-content;
  `}
`
