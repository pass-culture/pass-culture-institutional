import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'
interface CustomPageProps {
  data: APIResponseData<'api::resource.resource'>
  latestStudies: APIResponseData<'api::resource.resource'>[]
}

export default function CustomPage(props: CustomPageProps) {
  return (
    <React.Fragment>
      <Header
        image={props.data.attributes.image}
        icon=""
        title={props.data.attributes.title}
      />
      {props.data.attributes.blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}
      <Seo metaData={props.data.attributes.seo} />
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

  const apiEndpoint = `/resources?${queryParams}`

  const response =
    await fetchCMS<APIResponseData<'api::resource.resource'>[]>(apiEndpoint)

  if (response.data.length === 0) {
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
        $ne: response.data[0]!.attributes.title,
      },
      category: {
        $eqi: response.data[0]!.attributes.category,
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
