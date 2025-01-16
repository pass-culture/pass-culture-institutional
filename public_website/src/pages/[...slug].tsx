import React, { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Separator } from '@/lib/blocks/Separator'
import { Seo } from '@/lib/seo/seo'
import { PageWrapper } from '@/theme/style'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: APIResponseData<'api::page.page'>
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, Blocks } = props.data.attributes

  const memoBlocks = useMemo(
    () =>
      Blocks?.map((block, index) => {
        const blockContent = (
          <React.Fragment key={`${block.__component}_${block.id}`}>
            <BlockRenderer block={block} />
            <Separator isActive={false} />
          </React.Fragment>
        )
        return index === 1 ? (
          <React.Fragment key={`${block.__component}_${block.id}`}>
            <Breadcrumb isUnderHeader />
            {blockContent}
          </React.Fragment>
        ) : (
          blockContent
        )
      }),
    [Blocks]
  )

  return (
    <PageWrapper>
      {!!seo && <Seo metaData={seo} />}
      {memoBlocks}
    </PageWrapper>
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
      'Blocks.items.image',
      'Blocks.logo',
      'Blocks.logo.logo',
      'Blocks.cta',
      'Blocks.items.items',
      'Blocks.socialMediaLink',
      'Blocks.columns',
      'Blocks.video',
      'Blocks.people',
      'Blocks.people.image',
      'Blocks.logos.cta',
      'Blocks.logos.image',
      'Blocks.breadCrumbs',
      'Blocks.breadCrumbs.fils',
      'Blocks.breadCrumbs.parent',
      'Blocks.images',
      'Blocks.carouselItems',
      'Blocks.carouselItems.image',
      'Blocks.QRCode',
      'Blocks.tab',
      'Blocks.tab.block',
      'Blocks.tab.block.image',
      'Blocks.tab.block.firstCta',
      'Blocks.tab.block.secondCta',
      'Blocks.tab.block.columns',
      'Blocks.tab.block.content',
      'Blocks.centered.title',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })

  const response = (await Pages.getPage(
    PATHS.PAGES,
    `${queryParams}&filters[Path][$eqi]=${encodeURIComponent(pagePath)}`
  )) as APIResponseData<'api::page.page'>[]

  if (response.length === 0) {
    return { notFound: true }
  }

  const eventQuery = stringify({
    sort: ['date:desc'],
    populate: ['image', 'cta'],
    pagination: {},
    filter: {
      pageLocalisation: {
        $containsi: 'S\u2019informer - presse',
      },
    },
  })
  const events = await Pages.getPage(PATHS.EVENTS, eventQuery)

  return {
    props: {
      data: response[0]!,
      eventsData: events,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const query = stringify(
    {
      pagination: {
        limit: 100,
      },
    },
    { encodeValuesOnly: true }
  )
  const response = (await Pages.getPage(
    PATHS.PAGES,
    query
  )) as APIResponseData<'api::page.page'>[]

  const result = {
    paths: response.map((page: APIResponseData<'api::page.page'>) => ({
      params: {
        slug: page.attributes.Path.split('/').filter((slug) => slug.length),
      },
    })),
    fallback: false,
  }

  return result
}) satisfies GetStaticPaths
