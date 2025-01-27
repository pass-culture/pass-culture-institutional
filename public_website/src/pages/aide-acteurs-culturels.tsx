import React from 'react'

import {
  AideActeursCulturelsDocument,
  AideActeursCulturelsQuery,
} from '@/generated/graphql'
import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { Header } from '@/lib/blocks/Header'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

type Props = {
  helpData: NonNullable<AideActeursCulturelsQuery['helpCulturalActors']>
}

export default function CulturalActorsHelp({ helpData }: Props) {
  const { seo, heroSection, faq, simplepushcta, cardText, social } = helpData

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
        categories={faq.categories}
        requiredCta={faq.requiredCta}
        filteringProperty={faq.filteringProperty}
        limit={faq.limit}
      />
      <Separator isActive={false} />
      <DoublePushCTA
        requiredTitle={cardText.requiredTitle}
        text={cardText.text}
        firstCta={cardText.firstCta}
        requiredImage={cardText.requiredImage}
        secondCta={cardText.secondCta}
      />
      <Separator isActive={false} />
      <SimplePushCta
        requiredTitle={simplepushcta.requiredTitle}
        surtitle={simplepushcta.surtitle}
        requiredCta={simplepushcta.requiredCta}
        requiredImage={simplepushcta.requiredImage}
        icon={simplepushcta.icon}
      />
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<AideActeursCulturelsQuery>(AideActeursCulturelsDocument, {})
    .toPromise()

  if (result.error || !result.data || !result.data.helpCulturalActors) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      helpData: result.data.helpCulturalActors,
    },
    revalidate: false,
  }
}
