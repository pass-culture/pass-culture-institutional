import React from 'react'

import {
  AideEnseignantsDocument,
  AideEnseignantsQuery,
} from '@/generated/graphql'
import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface TeachersHelpProps {
  data: NonNullable<AideEnseignantsQuery['helpTeachers']>
  latestStudies: NonNullable<AideEnseignantsQuery['resources']>
}

export default function TeachersHelp({
  data,
  latestStudies,
}: TeachersHelpProps) {
  const { seo, heroSection, faq, cardText, simplepushcta, social } = data

  return (
    <PageLayout seo={seo} title={undefined} socialMediaSection={social}>
      <Header
        requiredTitle={heroSection?.requiredTitle}
        text={heroSection?.text}
        requiredIcon={heroSection.requiredIcon}
        requiredImage={heroSection.requiredImage}
      />
      <Breadcrumb isUnderHeader />

      <Faq
        requiredTitle={faq.requiredTitle}
        requiredCta={faq.requiredCta}
        categories={faq.categories}
        filteringProperty={faq.filteringProperty}
        limit={faq.limit}
      />
      <Separator isActive={false} />
      <LatestNews
        newsOrStudies={latestStudies.filter((item) => item !== null)}
        isNews={false}
        title={data.latestStudies.requiredTitle}
        cta={data.latestStudies.requiredCta}
      />
      <Separator isActive={false} />
      <DoublePushCTA
        requiredTitle={cardText.requiredTitle}
        text={cardText.text}
        requiredImage={cardText.requiredImage}
        firstCta={cardText.firstCta}
        secondCta={cardText.secondCta}
        icon={cardText.icon}
      />
      <Separator isActive={false} />
      <SimplePushCta
        requiredTitle={simplepushcta.requiredTitle}
        surtitle={simplepushcta.surtitle}
        requiredImage={simplepushcta.requiredImage}
        requiredCta={simplepushcta.requiredCta}
        icon={simplepushcta.icon}
      />
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<AideEnseignantsQuery>(AideEnseignantsDocument, {
      pagination: {
        limit: 3,
      },
      sort: ['date:desc'],
      filters: {
        category: {
          in: ['Étude ponctuelle', 'Étude ritualisée'],
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.helpTeachers) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      data: result.data.helpTeachers,
      latestStudies: result.data.resources,
    },
    revalidate: false,
  }
}
