import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { APIResponseData } from '@/types/strapi'
import { Button } from '@/ui/components/button/Button'
import { ListCard } from '@/ui/components/list-card/ListCard'
import { getStrapiURL } from '@/utils/apiHelpers'

type LatestNewsProps = {
  news: APIResponseData<'api::news.news'>[]
  className?: string
  buttonText: string
}

export function ListItems({ news, className, buttonText }: LatestNewsProps) {
  const [visibleItems, setVisibleItems] = useState(9)

  const loadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + 9, news.length)
    )
  }

  return (
    <Root className={className}>
      {/* <StyledHeading dangerouslySetInnerHTML={{ __html: title }} /> */}
      <StyledList>
        {news.slice(0, visibleItems).map((newsItem) => (
          <li key={newsItem.attributes.slug}>
            <ListCard
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
      {visibleItems < news.length && (
        <LoadMoreButton onClick={loadMore}>{buttonText}</LoadMoreButton>
      )}
      {/* <Button href={cta.URL}>{cta.Label}</Button> */}
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
      max-width: 80%;
    }
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

const LoadMoreButton = styled(Button)`
  margin-top: 1rem;
  margin-inline: auto;
`
