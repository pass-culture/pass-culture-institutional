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
import type { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: APIResponseData<'api::rubrique-instit.rubrique-instit'>
  latestStudies: APIResponseData<'api::rubrique-instit.rubrique-instit'>[]
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, image, title, blocks, aboveTitle } = props.data.attributes

  const memoBlocks = useMemo(
    () =>
      blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      )),
    [blocks]
  )

  return (
    <React.Fragment>
      <Seo metaData={seo} />
      <Header image={image} icon="" title={title} aboveTitle={aboveTitle} />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      {props.latestStudies.length > 0 && (
        <StyledLatestNews
          newsOrStudies={props.latestStudies}
          newsType="rubrique-instit"
          title="Les derniers **articles**"
        />
      )}
    </React.Fragment>
  )
}

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
        'blocks[0]',
        'blocks.items.image',
        'blocks.logo',
        'blocks.logo.logo',
        'relatedNews',
        'relatedNews.cta',
        'relatedNews.category',
        'blocks.cta',
        'blocks.items.items',
        'blocks.columns',
        'blocks.firstCta',
        'blocks.secondCta',
        'seo',
        'seo.metaSocial',
        'seo.metaSocial.image',
        'image',
        'blocks.tab.block.accordions',
        'blocks.tab.block.accordions.simpleText',
        'blocks.tab.block.accordions.simpleText.columns',
        'blocks.tab.block.accordions.simpleText.columns.text',
        'blocks.accordions',
        'blocks.accordions.simpleText',
        'blocks.accordions.simpleText.columns',
        'blocks.accordions.simpleText.columns.text',
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
  const rubriqueInstit = (await Pages.getPage(
    PATHS.RUBRIQUE_INSTIT,
    queryParams
  )) as APIResponseData<'api::rubrique-instit.rubrique-instit'>[]

  if (rubriqueInstit.length === 0) {
    return { notFound: true }
  }
  const latestRubriqueInstitQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      title: {
        $ne: rubriqueInstit[0]!.attributes.title,
      },
    },
  })

  const latestRubriqueInstit = (await Pages.getPage(
    PATHS.RUBRIQUE_INSTIT,
    latestRubriqueInstitQuery
  )) as APIResponseData<'api::rubrique-instit.rubrique-instit'>[]

  return {
    props: {
      data: rubriqueInstit[0]!,
      latestStudies: latestRubriqueInstit,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const rubriqueInstitQuery = stringify({
    pagination: {},
    populate: ['image'],
    sort: ['date:desc'],
  })

  const response = (await Pages.getPage(
    PATHS.RUBRIQUE_INSTIT,
    rubriqueInstitQuery
  )) as APIResponseData<'api::rubrique-instit.rubrique-instit'>[]

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
