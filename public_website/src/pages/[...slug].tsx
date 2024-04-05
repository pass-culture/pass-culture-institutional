import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'

import { BlockRenderer } from '@/lib/BlockRenderer'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

interface CustomPageProps {
  data: APIResponseData<'api::page.page'>
}

export default function CustomPage(props: CustomPageProps) {
  return (
    /* eslint-disable-next-line react/jsx-no-useless-fragment */
    <React.Fragment>
      {props.data.attributes.seo && (
        <Seo metaData={props.data.attributes.seo} />
      )}
      {props.data.attributes.Blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const pagePath = (params?.['slug'] as string[]).join('/')

  const queryParams = stringify({
    populate: [
      'Blocks.image.image',
      'Blocks.firstCta',
      'Blocks.secondCta',
      'Blocks.image.image.data',
      'Blocks.content',
      'Blocks.items',
      'Blocks[0]',
      'Blocks.items.image',
      'Blocks.logo',
      'Blocks.logo.logo',
      'Blocks.cta',
      'Blocks.items.items',
      'Blocks.socialMediaLink',
      'Blocks.columns',
      'Blocks.people',
      'Blocks.people.image',
      'Blocks.logos.cta',
      'Blocks.logos.image',
      'Blocks.breadCrumbs',
      'Blocks.breadCrumbs.fils',
      'Blocks.breadCrumbs.parent',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })

  const apiEndpoint = `/pages?${queryParams}&filters[Path][$eqi]=${encodeURIComponent(pagePath)}`

  const response =
    await fetchCMS<APIResponseData<'api::page.page'>[]>(apiEndpoint)

  if (response.data.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      data: response.data[0]!,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const response = await fetchCMS<APIResponseData<'api::page.page'>[]>('/pages')

  const result = {
    paths: response.data.map((page) => ({
      params: {
        slug: page.attributes.Path.split('/').filter((slug) => slug.length),
      },
    })),
    fallback: false,
  }

  return result
}) satisfies GetStaticPaths
