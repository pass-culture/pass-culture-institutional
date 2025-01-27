import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { RessourcepassFragment } from '@/generated/graphql'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ResourceCard } from '@/ui/components/resource-cards/ResourceCard'

export function RessourceItems(props: {
  news: RessourcepassFragment[]
  buttonText?: string
  className: string
}) {
  const { news, className, buttonText } = props

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
          <li key={newsItem.cta?.URL}>
            <ResourceCard
              title={newsItem.title}
              category={newsItem.category}
              date={newsItem.date as string}
              cta={newsItem.cta}
            />
          </li>
        ))}
      </StyledList>
      <BlockRendererWithCondition condition={isVisible()}>
        <LoadMoreButton onClick={loadMore}>{buttonText}</LoadMoreButton>
      </BlockRendererWithCondition>
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
      box-shadow: 0px 0px 6px 0px #00000026;
      border-radius: ${theme.radius.sm};
      height: 15.625rem;
      min-height: 15.625rem;
      max-height: 15.625rem;
      padding: 1.5rem;
      box-sizing: border-box;
      position: relative;
    }
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
      margin: 1rem auto;
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
