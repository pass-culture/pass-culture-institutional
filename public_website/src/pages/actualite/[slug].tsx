import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { News } from '@/domain/news/news.output'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { fetchCMS } from '@/utils/fetchCMS'

interface CustomPageProps {
  data: APIResponseData<'api::news.news'>
  latestStudies: APIResponseData<'api::news.news'>[]
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, image, title, blocks, aboveTitle } = props.data.attributes
  return (
    <React.Fragment>
      <Seo metaData={seo} />
      <Header image={image} icon="" title={title} aboveTitle={aboveTitle} />
      <Breadcrumb isUnderHeader />
      {blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}

      <StyledLatestNews
        news={props.latestStudies}
        title="Les dernières **actualités**"
      />
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const pagePath = params?.['slug'] as string
  const queryParams = stringify(
    {
      populate: [
        'blocks.image.image',
        'blocks.socialMediaLink',
        'blocks.image.image.data',
        'blocks.content',
        'blocks.items',
        'blocks',
        'news',
        'blocks[0]',
        'blocks.items.image',
        'blocks.logo',
        'blocks.logo.logo',
        'relatedNews',
        'relatedNews.cta',
        'relatedNews.category',
        'blocks.cta',
        'blocks.items.items',
        'blocks.columns',
        'blocks.firstCta',
        'blocks.secondCta',
        'seo',
        'seo.metaSocial',
        'seo.metaSocial.image',
        'image',
      ],
      filters: {
        slug: {
          $eqi: pagePath,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const actu = await News.getNews(queryParams)

  if (actu.length === 0) {
    return { notFound: true }
  }
  const latestActuQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      category: {
        $eqi: actu[0]!.attributes.category,
      },
      title: {
        $ne: actu[0]!.attributes.title,
      },
    },
  })
  const latestActu = await News.getNews(latestActuQuery)

  return {
    props: {
      data: actu[0]!,
      latestStudies: latestActu,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const response =
    await fetchCMS<APIResponseData<'api::news.news'>[]>('/news-list')

  const result = {
    paths: response.data.map((page) => ({
      params: {
        slug: page.attributes.slug,
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
