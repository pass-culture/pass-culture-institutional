import React, { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: APIResponseData<'api::blogtech.blogtech'>
  latestStudies: APIResponseData<'api::blogtech.blogtech'>[]
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, image, title, blocks, aboveTitle } = props.data.attributes

  const memoBlocks = useMemo(
    () =>
      blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      )),
    [blocks]
  )

  return (
    <React.Fragment>
      <Seo metaData={seo} />
      <Header image={image} icon="" title={title} aboveTitle={aboveTitle} />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      {props.latestStudies.length > 0 && (
        <StyledLatestNews
          newsOrStudies={props.latestStudies}
          isNews={true}
          title="Les dernières **actualités**"
        />
      )}
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
  const blogtech = (await Pages.getPage(
    PATHS.BLOGTECH,
    queryParams
  )) as APIResponseData<'api::blogtech.blogtech'>[]

  if (blogtech.length === 0) {
    return { notFound: true }
  }
  const latestBlogtechQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      title: {
        $ne: blogtech[0]!.attributes.title,
      },
    },
  })

  const latestBlogtech = (await Pages.getPage(
    PATHS.BLOGTECH,
    latestBlogtechQuery
  )) as APIResponseData<'api::blogtech.blogtech'>[]

  return {
    props: {
      data: blogtech[0]!,
      latestStudies: latestBlogtech,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const blogtechQuery = stringify({
    pagination: {},
    populate: ['image'],
    sort: ['date:desc'],
  })

  const response = (await Pages.getPage(
    PATHS.BLOGTECH,
    blogtechQuery
  )) as APIResponseData<'api::blogtech.blogtech'>[]

  const result = {
    paths: response.map((page) => ({
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
