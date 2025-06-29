import React, { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { BlockRenderer } from '@/lib/BlockRenderer'
import NoResult from '@/lib/blocks/NoResult'
import { Seo } from '@/lib/seo/seo'
import type { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { EventCard } from '@/ui/components/event-card/EventCard'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { fetchLayoutData } from '@/utils/fetchCMS'

interface CustomPageProps {
  data: APIResponseData<'api::event.event'>
  related: APIResponseData<'api::event.event'>[]
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, blocks } = props.data.attributes
  const { related } = props

  const memoBlocks = useMemo(
    () =>
      blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      )),
    [blocks]
  )

  const memoEvents = useMemo(
    () =>
      related?.map((eventItem) => (
        <EventCard
          key={eventItem.attributes.slug}
          title={eventItem.attributes.title}
          category={eventItem.attributes.category}
          date={eventItem.attributes.date}
          endDate={eventItem.attributes.endDate}
          imageUrl={
            eventItem.attributes.image?.data?.attributes?.url &&
            getStrapiURL(eventItem.attributes.image.data.attributes.url)
          }
          startTime={eventItem.attributes.startTime}
          endTime={eventItem.attributes.endTime}
          city={eventItem.attributes.city}
          cta={eventItem.attributes.cta}
          type=""
        />
      )),
    [related]
  )

  const hasEvents = useMemo((): boolean => {
    return related?.length > 0
  }, [related?.length])

  return (
    <React.Fragment>
      <Seo metaData={seo} />
      {memoBlocks}
      <StyledWrapper>
        <StyledHeading>Les derniers **événements**</StyledHeading>
        <Breadcrumb isUnderHeader />
        {hasEvents ? memoEvents : <NoResult />}
      </StyledWrapper>
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
        'news',
        'seo.metaSocial.image',
        'seo.metaSocial',
        'seo',
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

  const responseQuery = (await Pages.getPage(
    PATHS.EVENTS,
    queryParams
  )) as APIResponseData<'api::event.event'>[]

  if (responseQuery.length === 0) {
    return { notFound: true }
  }

  const relatedQuery = stringify({
    populate: ['image', 'cta'],
    pagination: {
      limit: 1,
    },
    filters: {
      title: {
        $ne: responseQuery[0]!.attributes.title,
      },
      category: {
        $eqi: responseQuery[0]!.attributes.category,
      },
    },
  })

  const latestEvents = (await Pages.getPage(
    PATHS.EVENTS,
    relatedQuery
  )) as APIResponseData<'api::event.event'>[]

  return {
    props: {
      ...(await fetchLayoutData()),
      data: responseQuery[0]!,
      related: latestEvents,
    },
  }
}) satisfies GetStaticProps<CustomPageProps>

export const getStaticPaths = (async () => {
  const eventsQuery = stringify({
    pagination: {},
    populate: ['image', 'cta'],
    sort: ['date:desc'],
  })

  const response = (await Pages.getPage(
    PATHS.EVENTS,
    eventsQuery
  )) as APIResponseData<'api::event.event'>[]

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

const StyledWrapper = styled.div`
  padding: 1rem 1.5rem;
  max-width: 80rem;
  margin-inline: auto;
`
const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 3.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.75rem;
    }
  `}
`
