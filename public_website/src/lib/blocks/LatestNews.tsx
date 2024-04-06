import React, { useEffect, useState } from 'react'
import { stringify } from 'querystring'
import styled, { css } from 'styled-components'

import { APIResponseData } from '@/types/strapi'
import { Button } from '@/ui/components/button/Button'
import { NewsCard } from '@/ui/components/news-card/NewsCard'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { fetchCMS } from '@/utils/fetchCMS'

type LatestNewsProps = {
  title: string
  news:
    | APIResponseData<'api::news.news'>[]
    | APIResponseData<'api::resource.resource'>[]
  cta?: { Label: string; URL: string }
  className?: string
}

export function LatestNews({ title, news, cta, className }: LatestNewsProps) {
  const [newsdata, setNewsData] = useState<
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
        {newsdata?.slice(0, 3).map((newsItem) => {
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
      {cta?.Label && cta?.URL && isModule && (
        <Button href={`/actualite/${cta.URL}`}>{cta.Label}</Button>
      )}
      {cta?.Label && cta?.URL && !isModule && (
        <Button href={cta.URL}>{cta.Label}</Button>
      )}
    </Root>
  )
}

const Root = styled.div`
  padding: 1rem 1.5rem;
  max-width: 80rem;
  margin-inline: auto;
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

  > li {
    scroll-snap-align: center;
  }
`
