import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'

import BlockRenderer from '@/lib/BlockRenderer'
import { fetchCMS } from '@/utils/fetchCMS'

interface BlockData {
  id: number
  __component: string
}

interface CustomPageData {
  id: number
  attributes: {
    Path: string
    Blocks: BlockData[]
  }
}

interface CustomPageProps {
  data: CustomPageData
}

export default function CustomPage(props: CustomPageProps) {
  return (
    <React.Fragment>
      {props.data.attributes.Blocks.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      ))}
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const pagePath = '/' + (params?.['slug'] as string[]).join('/')
  const response = await fetchCMS<CustomPageData[]>(
    `/pages?populate=*&filters[Path][$eqi]=${encodeURIComponent(pagePath)}`
  )

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
  const response = await fetchCMS<CustomPageData[]>('/pages')

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
