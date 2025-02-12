import React, { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: APIResponseData<'api::reglement.reglement'>
}

export default function CustomPage(props: CustomPageProps) {
  const { title, seo, blocks, image } = props.data.attributes

  const memoBlocks = useMemo(
    () =>
      blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      )),
    [blocks]
  )

  return (
    <React.Fragment>
      <Header icon="" title={title} image={image} />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      <Seo metaData={seo} />
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
    PATHS.REGLEMENTS,
    queryParams
  )) as APIResponseData<'api::reglement.reglement'>[]

  if (responseQuery.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      data: responseQuery[0]!,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const reglementsQuery = stringify({
    pagination: {},
    populate: ['image'],
    sort: ['date:desc'],
  })

  const response = (await Pages.getPage(
    PATHS.REGLEMENTS,
    reglementsQuery
  )) as APIResponseData<'api::reglement.reglement'>[]

  return {
    paths: response.map((page) => ({
      params: {
        slug: page.attributes.slug,
      },
    })),
    fallback: false,
  }
}) satisfies GetStaticPaths
