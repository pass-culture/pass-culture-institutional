import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { BlockRenderer } from '@/lib/BlockRenderer'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'
interface CustomPageProps {
  data: APIResponseData<'api::news.news'>
  latestStudies: APIResponseData<'api::news.news'>[]
}

export default function CustomPage(props: CustomPageProps) {
  return (
    <React.Fragment>
      {props.data.attributes.Blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}

      {props.data.attributes.relatedNews.cta &&
        props.data.attributes.relatedNews.title && (
          <StyledLatestNews
            news={props.latestStudies}
            title={props.data.attributes.relatedNews.title}
            cta={props.data.attributes.relatedNews.cta}
          />
        )}
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const pagePath = params?.['slug'] as string

  const queryParams = stringify({
    populate: [
      'Blocks.image.image',
      'Blocks.socialMediaLink',
      'Blocks.image.image.data',
      'Blocks.content',
      'Blocks.items',
      'Blocks',
      'news',
      'Blocks[0]',
      'Blocks.items.image',
      'Blocks.logo',
      'Blocks.logo.logo',
      'relatedNews',
      'relatedNews.cta',
      'relatedNews.category',
      'Blocks.cta',
      'Blocks.items.items',
      'Blocks.columns',
      'Blocks.firstCta',
      'Blocks.secondCta',
    ],
  })

  const apiEndpoint = `/news-list?${queryParams}&filters[Path][$eqi]=${encodeURIComponent(pagePath)}`

  const response =
    await fetchCMS<APIResponseData<'api::news.news'>[]>(apiEndpoint)

  if (response.data.length === 0) {
    return { notFound: true }
  }

  const latestStudiesQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      category: {
        $eqi: response.data[0]!.attributes.category,
      },
    },
  })
  const latestStudies = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${latestStudiesQuery}`
  )

  return {
    props: {
      data: response.data[0]!,
      latestStudies: latestStudies.data,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const response =
    await fetchCMS<APIResponseData<'api::news.news'>[]>('/news-list')

  const result = {
    paths: response.data.map((page) => ({
      params: {
        slug: page.attributes.Path,
      },
    })),
    fallback: false,
  }

  return result
}) satisfies GetStaticPaths

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
