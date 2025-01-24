import React, { useMemo } from 'react'
import type { GetStaticProps } from 'next'
import styled, { css } from 'styled-components'

import {
  ResourceFragment,
  RessourcesDocument,
  RessourcesQuery,
} from '@/generated/graphql'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Seo } from '@/lib/seo/seo'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface CustomPageProps {
  data: ResourceFragment
  latestStudies: ResourceFragment[]
}

export default function CustomPage(props: CustomPageProps) {
  const { image, title, seo, blocks } = props.data
  const { latestStudies } = props

  const memoBlocks = useMemo(
    () =>
      blocks
        ?.filter((block) => block !== null)
        .map((block) => (
          <BlockRenderer
            key={`${block.__typename}_${(block as { id: string }).id}`}
            block={block}
          />
        )),
    [blocks]
  )

  return (
    <React.Fragment>
      <Header requiredImage={image} requiredIcon="" requiredTitle={title} />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      {seo && <Seo metaData={seo} />}
      <StyledLatestNews
        newsOrStudies={latestStudies}
        isNews={false}
        title="Les dernières **ressources**"
      />
    </React.Fragment>
  )
}

// export const getStaticProps = (async ({ params }) => {
//   const pagePath = params?.['slug'] as string

//   const queryParams = stringify(
//     {
//       populate: [
//         'blocks.columns',
//         'blocks.content',
//         'blocks.cta',
//         'blocks.firstCta',
//         'blocks.image.image.data',
//         'blocks.image.image',
//         'blocks.items.image',
//         'blocks.items.items',
//         'blocks.items',
//         'blocks.logo.logo',
//         'blocks.logo',
//         'blocks.secondCta',
//         'blocks.socialMediaLink',
//         'blocks',
//         'blocks[0]',
//         'image',
//         'news',
//         'relatedRessources.category',
//         'relatedRessources.cta',
//         'seo.metaSocial.image',
//         'seo.metaSocial',
//         'seo',
//       ],
//       filters: {
//         slug: {
//           $eqi: pagePath,
//         },
//       },
//     },
//     {
//       encodeValuesOnly: true,
//     }
//   )

//   const responseQuery = (await Pages.getPage(
//     PATHS.RESOURCES,
//     queryParams
//   )) as APIResponseData<'api::resource.resource'>[]

//   if (responseQuery.length === 0) {
//     return { notFound: true }
//   }

//   const latestStudiesQuery = stringify({
//     populate: ['image'],
//     sort: ['date:desc'],
//     pagination: {
//       limit: 3,
//     },
//     filters: {
//       title: {
//         $ne: responseQuery[0]!.attributes.title,
//       },
//       category: {
//         $eqi: responseQuery[0]!.attributes.category,
//       },
//     },
//   })

//   const latestResources = (await Pages.getPage(
//     PATHS.RESOURCES,
//     latestStudiesQuery
//   )) as APIResponseData<'api::resource.resource'>[]

//   return {
//     props: {
//       data: responseQuery[0]!,
//       latestStudies: latestResources,
//     },
//   }
// }) satisfies GetStaticProps<CustomPageProps>

// export const getStaticPaths = (async () => {
//   const resourcesQuery = stringify({
//     pagination: {},
//     populate: ['image'],
//     sort: ['date:desc'],
//   })

//   const response = (await Pages.getPage(
//     PATHS.RESOURCES,
//     resourcesQuery
//   )) as APIResponseData<'api::resource.resource'>[]

//   const result = {
//     paths: response.map((page) => ({
//       params: {
//         slug: page.attributes.slug,
//       },
//     })),
//     fallback: false,
//   }

//   return result
// }) satisfies GetStaticPaths

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePath = params?.['slug'] as string
  const result = await urqlClient
    .query<RessourcesQuery>(RessourcesDocument, {
      filters: {
        slug: {
          eqi: pagePath,
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.resources) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  if (result.data.resources.length === 0) {
    return { notFound: true }
  }

  const latestResult = await urqlClient
    .query<RessourcesQuery>(RessourcesDocument, {
      pagination: {
        limit: 1,
      },
      filters: {
        category: {
          eqi: result.data.resources[0]!.category,
        },
        title: {
          ne: result.data.resources[0]!.title,
        },
      },
      sort: ['date:desc'],
    })
    .toPromise()

  return {
    props: {
      data: result.data.resources[0]!,
      latestStudies: latestResult.data?.resources ?? [],
    },
    revalidate: false,
  }
}

export const getStaticPaths = async () => {
  const result = await urqlClient
    .query<RessourcesQuery>(RessourcesDocument, {
      sort: ['date:desc'],
    })
    .toPromise()

  const paths = {
    paths:
      result.data?.resources
        .filter((p) => p !== null)
        .map((page) => ({
          params: {
            slug: page?.slug,
          },
        })) ?? [],
    fallback: false,
  }

  return paths
}

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
