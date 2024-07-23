import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { LatestEventsProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { EventCard } from '@/ui/components/event-card/EventCard'
import { getStrapiURL } from '@/utils/apiHelpers'

export function EventListItems(props: LatestEventsProps) {
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
      </BlockRendererWithCondition>
      <BlockRendererWithCondition condition={isMoreButton()}>
        <LoadMoreButton onClick={loadMore}>{buttonText}</LoadMoreButton>
      </BlockRendererWithCondition>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  padding: 1rem 1.5rem;
  max-width: 80rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;

  > a {
    align-self: center;
  }
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    // margin-bottom: 5rem;

    // > li {
    //   scroll-snap-align: center;
    // }

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
    }
  `}
`

const LoadMoreButton = styled.button`
  ${({ theme }) => css`
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
