import React from 'react'

import {
  AideJeunesParentsDocument,
  AideJeunesParentsQuery,
} from '@/generated/graphql'
import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { Header } from '@/lib/blocks/Header'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface HelpProps {
  helpData: NonNullable<AideJeunesParentsQuery['help']>
}

export default function Help({ helpData }: HelpProps) {
  const { seo, heroSection, faq, cardText, simplepushcta, social } = helpData

  return (
    <PageLayout seo={seo} title={undefined} socialMediaSection={social}>
      <Header
        requiredTitle={heroSection.requiredTitle}
        text={heroSection?.text}
        requiredIcon={heroSection.requiredIcon}
        icon2={heroSection?.icon2}
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
    .query<AideJeunesParentsQuery>(AideJeunesParentsDocument, {})
    .toPromise()

  if (result.error || !result.data || !result.data.help) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      helpData: result.data.help,
    },
    revalidate: false,
  }
}
