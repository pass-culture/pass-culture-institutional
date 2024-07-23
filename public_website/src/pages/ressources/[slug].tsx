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
import { fetchCMS } from '@/utils/fetchCMS'
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
        news={latestStudies}
        title="Les dernières **ressources**"
      />
    </React.Fragment>
  )
}

export const getStaticPaths = (async () => {
  const response =
    await fetchCMS<APIResponseData<'api::resource.resource'>[]>('/resources')

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
        'blocks.logo.logo',
        'blocks.cta',
        'blocks.items.items',
        'relatedRessources.cta',
        'relatedRessources.category',
        'blocks[0]',
        'blocks.items.image',
        'blocks.logo',
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
  const response = (await Pages.getPage(
    PATHS.RESOURCES,
    queryParams
  )) as APIResponseData<'api::resource.resource'>[]

  if (response.length === 0) {
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
        $ne: response[0]!.attributes.title,
      },
      category: {
        $eqi: response[0]!.attributes.category,
      },
    },
  })
  const latestResources = (await Pages.getPage(
    PATHS.RESOURCES,
    latestStudiesQuery
  )) as APIResponseData<'api::resource.resource'>[]

  return {
    props: {
      data: response[0]!,
      latestStudies: latestResources,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
