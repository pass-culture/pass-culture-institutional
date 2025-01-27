import React, { useMemo } from 'react'
import type { GetStaticProps } from 'next'
import styled, { css } from 'styled-components'

import {
  EvenementsDocument,
  EvenementsQuery,
  EventFragment,
} from '@/generated/graphql'
import { BlockRenderer } from '@/lib/BlockRenderer'
import NoResult from '@/lib/blocks/NoResult'
import { Seo } from '@/lib/seo/seo'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { EventCard } from '@/ui/components/event-card/EventCard'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'

interface CustomPageProps {
  data: EventFragment
  related: EventFragment[]
}

export default function CustomPage(props: CustomPageProps) {
  const { seo, blocks } = props.data
  const { related } = props

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

  const memoEvents = useMemo(
    () =>
      related?.map((eventItem) => (
        <EventCard
          key={eventItem.slug}
          title={eventItem.title}
          category={eventItem.category}
          date={eventItem.date}
          endDate={eventItem.endDate}
          imageUrl={eventItem.image && getStrapiURL(eventItem.image?.url)}
          startTime={eventItem.startTime}
          endTime={eventItem.endTime}
          city={eventItem.city}
          cta={eventItem.cta}
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
      {seo && <Seo metaData={seo} />}
      {memoBlocks}
      <StyledWrapper>
        <StyledHeading>Les derniers **événements**</StyledHeading>
        <Breadcrumb isUnderHeader />
        {hasEvents ? memoEvents : <NoResult />}
      </StyledWrapper>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePath = params?.['slug'] as string
  const result = await urqlClient
    .query<EvenementsQuery>(EvenementsDocument, {
      filters: {
        slug: {
          eqi: pagePath,
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.events) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  if (result.data.events.length === 0) {
    return { notFound: true }
  }

  const latestResult = await urqlClient
    .query<EvenementsQuery>(EvenementsDocument, {
      pagination: {
        limit: 1,
      },
      filters: {
        category: {
          eqi: result.data.events[0]!.category,
        },
        title: {
          ne: result.data.events[0]!.title,
        },
      },
      sort: ['date:desc'],
    })
    .toPromise()

  return {
    props: {
      data: result.data.events[0]!,
      latestEvents: latestResult.data?.events ?? [],
    },
    revalidate: false,
  }
}

export const getStaticPaths = async () => {
  const result = await urqlClient
    .query<EvenementsQuery>(EvenementsDocument, {
      sort: ['date:desc'],
    })
    .toPromise()

  const paths = {
    paths:
      result.data?.events
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
