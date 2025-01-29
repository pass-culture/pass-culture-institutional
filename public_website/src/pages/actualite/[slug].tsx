import React, { useMemo } from 'react'
import type { GetStaticProps } from 'next'
import styled, { css } from 'styled-components'

import {
  ActualitesDocument,
  ActualitesQuery,
  NewsFragment,
} from '@/generated/graphql'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Seo } from '@/lib/seo/seo'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: NewsFragment
  latestStudies: NewsFragment[]
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, image, title, blocks, aboveTitle } = props.data

  const memoBlocks = useMemo(
    () =>
      blocks
        ?.filter((block) => block !== null)
        .map((block) => (
          <BlockRenderer
            key={`${block.__typename}_${(block as { id: string }).id}`}
            block={block}
          />
        )),
    [blocks]
  )

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <Header
        requiredImage={image}
        requiredIcon=""
        requiredTitle={title}
        aboveTitle={aboveTitle}
      />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      <StyledLatestNews
        newsOrStudies={props.latestStudies}
        isNews={true}
        title="Les dernières **actualités**"
      />
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePath = params?.['slug'] as string
  const result = await urqlClient
    .query<ActualitesQuery>(ActualitesDocument, {
      filters: {
        slug: {
          eqi: pagePath,
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.newsList) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  if (result.data.newsList.length === 0) {
    return { notFound: true }
  }

  const latestResult = await urqlClient
    .query<ActualitesQuery>(ActualitesDocument, {
      pagination: {
        limit: 3,
      },
      filters: {
        category: {
          eqi: result.data.newsList[0]!.category,
        },
        title: {
          ne: result.data.newsList[0]!.title,
        },
      },
      sort: ['date:desc'],
    })
    .toPromise()

  return {
    props: {
      data: result.data.newsList[0]!,
      latestStudies: latestResult.data?.newsList ?? [],
    },
    revalidate: false,
  }
}

export const getStaticPaths = async () => {
  const result = await urqlClient
    .query<ActualitesQuery>(ActualitesDocument, {
      sort: ['date:desc'],
    })
    .toPromise()

  const paths = {
    paths:
      result.data?.newsList
        .filter((p) => p !== null)
        .map((page) => ({
          params: {
            slug: page?.slug,
          },
        })) ?? [],
    fallback: false,
  }

  return paths
}

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
