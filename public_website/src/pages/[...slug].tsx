import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'

import { BlockRenderer } from '@/lib/BlockRenderer'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

interface CustomPageProps {
  data: APIResponseData<'api::page.page'>
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
  const pagePath = (params?.['slug'] as string[]).join('/')

  const queryParams = stringify({
    populate: ['Blocks.image.image', 'Blocks.firstCta', 'Blocks.secondCta'],
  })

  const apiEndpoint = `/pages?${queryParams}&filters[Path][$eqi]=${encodeURIComponent(pagePath)}`

  const response =
    await fetchCMS<APIResponseData<'api::page.page'>[]>(apiEndpoint)

  if (response.data.length === 0) {
    return { notFound: true }
  }

  console.log(response.data[0]?.attributes.Blocks, 'hey')

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
