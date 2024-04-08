import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { APIResponseData } from '@/types/strapi'
import { EventCard } from '@/ui/components/event-card/EventCard'
import { getStrapiURL } from '@/utils/apiHelpers'

type LatestNewsProps = {
  events: APIResponseData<'api::event.event'>[]
  className?: string
  buttonText?: string
  type?: string
}

export function EventListItems({
  events,
  className,
  buttonText,
  type,
}: LatestNewsProps) {
  const [visibleItems, setVisibleItems] = useState(2)

  const loadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + 2, events.length)
    )
  }
  return (
    <Root className={className}>
      <StyledList>
        {events.length > 0 &&
          events.slice(0, visibleItems).map((eventItem) => (
            <li key={eventItem.attributes.slug}>
              <EventCard
                title={eventItem.attributes.title}
                category={eventItem.attributes.category}
                date={eventItem.attributes.date}
                imageUrl={
                  eventItem.attributes.image &&
                  getStrapiURL(eventItem.attributes.image?.data.attributes.url)
                }
                startTime={eventItem.attributes.startTime}
                endTime={eventItem.attributes.endTime}
                city={eventItem.attributes.city}
                cta={eventItem.attributes.cta}
                type={type}
              />
            </li>
          ))}
      </StyledList>
      {visibleItems < events.length && (
        <LoadMoreButton onClick={loadMore}>{buttonText}</LoadMoreButton>
      )}
    </Root>
  )
}

const Root = styled.div`
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
      padding: 1rem auto;
    }
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    margin-bottom: 5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    > li {
      scroll-snap-align: center;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
    }
  `}
`

const LoadMoreButton = styled.button`
  ${({ theme }) => css`
    margin-top: 1rem;
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
