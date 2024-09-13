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
  data: APIResponseData<'api::resource.resource'>
  latestStudies: APIResponseData<'api::resource.resource'>[]
}

export default function CustomPage(props: CustomPageProps) {
  const { image, title, seo, blocks } = props.data.attributes
  const { latestStudies } = props

  const memoBlocks = useMemo(
    () =>
      blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      )),
    [blocks]
  )

  return (
    <React.Fragment>
      <Header image={image} icon="" title={title} />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      <Seo metaData={seo} />
      <StyledLatestNews
        newsOrStudies={latestStudies}
        isNews={false}
        title="Les dernières **ressources**"
      />
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const pagePath = params?.['slug'] as string

  const queryParams = stringify(
    {
      populate: [
        'blocks.columns',
        'blocks.content',
        'blocks.cta',
        'blocks.firstCta',
        'blocks.image.image.data',
        'blocks.image.image',
        'blocks.items.image',
        'blocks.items.items',
        'blocks.items',
        'blocks.logo.logo',
        'blocks.logo',
        'blocks.secondCta',
        'blocks.socialMediaLink',
        'blocks',
        'blocks[0]',
        'image',
        'news',
        'relatedRessources.category',
        'relatedRessources.cta',
        'seo.metaSocial.image',
        'seo.metaSocial',
        'seo',
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

  const responseQuery = (await Pages.getPage(
    PATHS.RESOURCES,
    queryParams
  )) as APIResponseData<'api::resource.resource'>[]

  if (responseQuery.length === 0) {
    return { notFound: true }
  }

  const latestStudiesQuery = stringify({
    populate: ['image'],
    sort: ['date:desc'],
    pagination: {
      limit: 3,
    },
    filters: {
      title: {
        $ne: responseQuery[0]!.attributes.title,
      },
      category: {
        $eqi: responseQuery[0]!.attributes.category,
      },
    },
  })

  const latestResources = (await Pages.getPage(
    PATHS.RESOURCES,
    latestStudiesQuery
  )) as APIResponseData<'api::resource.resource'>[]

  return {
    props: {
      data: responseQuery[0]!,
      latestStudies: latestResources,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const resourcesQuery = stringify({
    pagination: {},
    populate: ['image'],
    sort: ['date:desc'],
  })

  const response = (await Pages.getPage(
    PATHS.RESOURCES,
    resourcesQuery
  )) as APIResponseData<'api::resource.resource'>[]

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
