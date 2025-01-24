import React, { useMemo } from 'react'
import type { GetStaticProps } from 'next'

import { PageDocument, PageQuery } from '@/generated/graphql'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Separator } from '@/lib/blocks/Separator'
import { Seo } from '@/lib/seo/seo'
import urqlClient from '@/lib/urqlClient'
import { PageWrapper } from '@/theme/style'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: NonNullable<PageQuery['pages'][number]>
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, Blocks } = props.data

  const memoBlocks = useMemo(
    () =>
      Blocks?.map((block, index) => {
        const blockContent = (
          <React.Fragment
            key={`${block?.__typename}_${(block as { id: string })?.id}`}>
            {block && <BlockRenderer block={block} />}
            <Separator isActive={false} />
          </React.Fragment>
        )
        return index === 1 ? (
          <React.Fragment
            key={`${block?.__typename}_${(block as { id: string })?.id}`}>
            <Breadcrumb isUnderHeader />
            {blockContent}
          </React.Fragment>
        ) : (
          blockContent
        )
      }),
    [Blocks]
  )

  return (
    <PageWrapper>
      {!!seo && <Seo metaData={seo} />}
      {memoBlocks}
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePath = (params?.['slug'] as string[]).join('/')
  const result = await urqlClient
    .query<PageQuery>(PageDocument, {
      filters: {
        Path: {
          eqi: pagePath,
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.pages) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  if (result.data.pages.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      data: result.data.pages[0],
    },
    revalidate: false,
  }
}

export const getStaticPaths = async () => {
  const result = await urqlClient
    .query<PageQuery>(PageDocument, {
      pagination: {
        limit: 100,
      },
    })
    .toPromise()

  const paths = {
    paths:
      result.data?.pages
        .filter((p) => p !== null)
        .map((page) => ({
          params: {
            slug: page?.Path.split('/').filter((slug) => slug.length),
          },
        })) ?? [],
    fallback: false,
  }

  return paths
}
