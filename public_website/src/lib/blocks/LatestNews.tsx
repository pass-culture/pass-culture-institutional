import React, { useEffect, useState } from 'react'
import { stringify } from 'querystring'
import styled, { css } from 'styled-components'

import { CTA } from '@/types/CTA'
import { APIResponseData } from '@/types/strapi'
import { Button } from '@/ui/components/button/Button'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { NewsCard } from '@/ui/components/news-card/NewsCard'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { fetchCMS } from '@/utils/fetchCMS'

type LatestNewsProps = {
  title: string
  news:
    | APIResponseData<'api::news.news'>[]
    | APIResponseData<'api::resource.resource'>[]
  cta?: CTA
  className?: string
}

export function LatestNews({ title, news, cta, className }: LatestNewsProps) {
  const [newsData, setNewsData] = useState<
    | APIResponseData<'api::news.news'>[]
    | APIResponseData<'api::resource.resource'>[]
    | null
  >(null)

  const [isModule, setIsModule] = useState(true)
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
      <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
      <StyledList>
        {newsData?.slice(0, 3).map((newsItem) => {
          return (
            <li
              key={
                isModule
                  ? `/actualite/${newsItem.attributes.slug}`
                  : newsItem.attributes.slug
              }>
              <NewsCard
                title={newsItem.attributes.title}
                category={newsItem.attributes.category}
                date={newsItem.attributes.date}
                imageUrl={
                  newsItem.attributes.image &&
                  getStrapiURL(newsItem.attributes.image?.data.attributes.url)
                }
                slug={
                  isModule
                    ? `/actualite/${newsItem.attributes.slug}`
                    : newsItem.attributes.slug
                }
              />
            </li>
          )
        })}
      </StyledList>
      {cta?.Label && cta?.URL && <Button href={cta.URL}>{cta.Label}</Button>}
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

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 3.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.75rem;
    }
  `}
`

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-bottom: 2.25rem;
  }

  > li {
    scroll-snap-align: center;
  }
`
