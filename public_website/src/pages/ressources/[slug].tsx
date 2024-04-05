import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { BlockRenderer } from '@/lib/BlockRenderer'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'
interface CustomPageProps {
  data: APIResponseData<'api::resource.resource'>
  latestStudies: APIResponseData<'api::resource.resource'>[]
}

export default function CustomPage(props: CustomPageProps) {
  return (
    <React.Fragment>
      {props.data.attributes.blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}

      <StyledLatestNews
        news={props.latestStudies}
        title="Les dernières
            <mark>ressources</mark>"
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
        slug: page.attributes.path,
      },
    })),
    fallback: false,
  }

  return result
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
  const pagePath = params?.['slug'] as string

  const queryParams = stringify({
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
    ],
  })

  const apiEndpoint = `/resources?${queryParams}&filters[path][$eqi]=${encodeURIComponent(pagePath)}`

  const response =
    await fetchCMS<APIResponseData<'api::resource.resource'>[]>(apiEndpoint)

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
      title: {
        $ne: response.data[0]!.attributes.title,
      },
    },
  })
  const latestStudies = await fetchCMS<
    APIResponseData<'api::resource.resource'>[]
  >(`/resources?${latestStudiesQuery}`)

  return {
    props: {
      data: response.data[0]!,
      latestStudies: latestStudies.data,
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
