import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'

import { BlockRenderer } from '@/lib/BlockRenderer'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'
interface CustomPageProps {
  data: APIResponseData<'api::event.event'>
}

export default function CustomPage(props: CustomPageProps) {
  return (
    /* eslint-disable-next-line react/jsx-no-useless-fragment */
    <React.Fragment>
      {props.data.attributes.Blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const pagePath = params?.['slug'] as string

  const queryParams = stringify({
    populate: [
      'Blocks.image.image',
      'Blocks',
      'news',
      'Blocks[0]',
      'Blocks.items.image',
      'Blocks.logo',
      'Blocks.logo.logo',
      'Blocks.cta',
      'Blocks.socialMediaLink',
      'Blocks.image.image.data',
      'Blocks.content',
      'Blocks.items',
      'Blocks.items.items',
      'Blocks.columns',
      'Blocks.firstCta',
      'Blocks.secondCta',
    ],
  })

  const apiEndpoint = `/events?${queryParams}&filters[Path][$eqi]=${encodeURIComponent(pagePath)}`

  const response =
    await fetchCMS<APIResponseData<'api::event.event'>[]>(apiEndpoint)

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
  const response =
    await fetchCMS<APIResponseData<'api::event.event'>[]>('/events')

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
