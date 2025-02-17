import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { CTA } from '@/types/CTA'
import { LatestNewsProps } from '@/types/props'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { NewsCard } from '@/ui/components/news-card/NewsCard'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function LatestNews(props: LatestNewsProps) {
  const { title, newsOrStudies, cta, className, isNews } = props
  const slugPrefix = isNews ? `/actualite/` : `/ressources/`
  return (
    <Root className={className}>
      <HeadingWrapper>
        <StyledHeading>{title}</StyledHeading>
      </HeadingWrapper>
      <ListWrapper>
        <StyledList>
          {newsOrStudies?.slice(0, 3).map((item) => {
            const fullSlug = slugPrefix + item.attributes.slug
            return (
              <li key={fullSlug}>
                <NewsCard
                  title={item.attributes.title}
                  category={
                    'category' in item.attributes
                      ? item.attributes.category
                      : 'Article'
                  }
                  date={item.attributes.date}
                  imageUrl={
                    item.attributes.image &&
                    getStrapiURL(item.attributes.image?.data.attributes.url)
                  }
                  slug={fullSlug}
                />
              </li>
            )
          })}
        </StyledList>
      </ListWrapper>

      <ContentWrapper $noMargin>
        <BlockRendererWithCondition condition={isRenderable(cta?.URL)}>
          <ButtonWithCTA cta={cta as CTA} />
        </BlockRendererWithCondition>
      </ContentWrapper>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  --module-spacing: 0;

  > a {
    align-self: center;
  }
`

const HeadingWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 3.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.75rem;
    }
  `}
`

const ListWrapper = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  box-sizing: border-box;
  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-bottom: 2.25rem;
  }
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: repeat(1, 1fr);
    }
    > li {
      scroll-snap-align: center;
    }
  `}
`
