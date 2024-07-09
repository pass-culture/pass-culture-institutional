import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { LatestEventsProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ListCard } from '@/ui/components/list-card/ListCard'
import { getStrapiURL } from '@/utils/apiHelpers'

export function ListItems(
  props: Omit<
    LatestEventsProps & {
      type: string
      news:
        | APIResponseData<'api::news.news'>[]
        | APIResponseData<'api::resource.resource'>[]
    },
    'events'
  >
) {
  const { news, className, buttonText, type } = props
  const [visibleItems, setVisibleItems] = useState<number>(9)

  const loadMore = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + 9, news.length)
    )
  }

  const isVisible = (): boolean => visibleItems < news.length

  return (
    <Root $noMargin $marginBottom={2} $marginTop={2} className={className}>
      <StyledList>
        {news?.slice(0, visibleItems).map((newsItem) => (
          <li key={newsItem.attributes.slug}>
            <ListCard
              type={type}
              title={newsItem.attributes.title}
              category={newsItem.attributes.category}
              date={newsItem.attributes.date}
              imageUrl={
                newsItem.attributes.image &&
                getStrapiURL(newsItem.attributes.image?.data.attributes.url)
              }
              slug={newsItem.attributes.slug}
            />
          </li>
        ))}
      </StyledList>
      {isVisible() && buttonText && (
        <LoadMoreButton onClick={loadMore}>{buttonText}</LoadMoreButton>
      )}
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;

  > a {
    align-self: center;
  }
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    > li {
      scroll-snap-align: center;
      margin-bottom: 1rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
      margin: 1rem auto;
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
