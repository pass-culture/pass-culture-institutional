import React, { useEffect, useState } from 'react'
import { stringify } from 'querystring'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { CTA } from '@/types/CTA'
import { LatestNewsProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { NewsCard } from '@/ui/components/news-card/NewsCard'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { fetchCMS } from '@/utils/fetchCMS'
import { isRenderable } from '@/utils/isRenderable'

export function LatestNews(props: LatestNewsProps) {
  const { title, news, cta, className } = props
  const [newsData, setNewsData] = useState<
    | APIResponseData<'api::news.news'>[]
    | APIResponseData<'api::resource.resource'>[]
    | null
  >(null)

  const [isModule, setIsModule] = useState<boolean>(true)
  useEffect(() => {
    const fetchLatestStudies = async () => {
      if (!news) {
        const latestStudiesQuery = stringify({
          sort: ['date:desc'],
          populate: ['image', 'cta'],
        })
        const latestStudies = await fetchCMS<
          APIResponseData<'api::news.news'>[]
        >(`/news-list?${latestStudiesQuery}`)

        setNewsData(latestStudies.data)
      } else {
        setIsModule(false)

        setNewsData(news)
      }
    }

    fetchLatestStudies()
  }, [isModule, news])

  return (
    <Root className={className}>
      <HeadingWrapper>
        <StyledHeading>{title}</StyledHeading>
      </HeadingWrapper>
      <ListWrapper>
        <StyledList>
          {newsData?.slice(0, 3).map((newsItem) => {
            const slug = isModule
              ? `/actualite/${newsItem.attributes.slug}`
              : `/ressources/${newsItem.attributes.slug}`
            return (
              <li key={slug}>
                <NewsCard
                  title={newsItem.attributes.title}
                  category={newsItem.attributes.category}
                  date={newsItem.attributes.date}
                  imageUrl={
                    newsItem.attributes.image &&
                    getStrapiURL(newsItem.attributes.image?.data.attributes.url)
                  }
                  slug={slug}
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
