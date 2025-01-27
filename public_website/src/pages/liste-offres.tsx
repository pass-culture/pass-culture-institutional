import React from 'react'

import { ListeOffresDocument, ListeOffresQuery } from '@/generated/graphql'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { ExperienceVideoCarousel } from '@/lib/blocks/experienceVideoCarousel/experienceVideoCarousel'
import { Header } from '@/lib/blocks/Header'
import { OffersCarousel } from '@/lib/blocks/offersCarousel/offersCarousel'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Offer } from '@/types/playlist'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { OfferSection } from '@/ui/components/offer-section/OfferSection'
import { fetchBackend } from '@/utils/fetchBackend'

type ListProps = {
  offerListe: NonNullable<ListeOffresQuery['listeOffre']>
  offerItems: Offer[]
}

export default function ListeOffre({ offerListe, offerItems }: ListProps) {
  const {
    seo,
    separator,
    hero,
    offres,
    socialMediaSection,
    question,
    experience,
    offres_culturelles,
  } = offerListe

  return (
    <PageLayout
      seo={seo}
      title={undefined}
      socialMediaSection={socialMediaSection}>
      {!!hero && (
        <Header
          requiredTitle={hero.requiredTitle}
          text={hero.text}
          requiredImage={hero.requiredImage}
          requiredIcon={hero.requiredIcon}
        />
      )}
      <Breadcrumb isUnderHeader />
      <OfferSection offers={offerItems} {...offres} />
      <Separator isActive={separator?.isActive ?? false} />
      <BlockRendererWithCondition
        condition={
          !!offres_culturelles &&
          offres_culturelles.offersCarouselItems.length > 0
        }>
        <OffersCarousel {...offres_culturelles!} />
      </BlockRendererWithCondition>
      <Separator isActive={false} />
      <BlockRendererWithCondition
        condition={!!experience && experience.carouselItems.length > 0}>
        <ExperienceVideoCarousel
          title={experience?.title ?? ''}
          carouselItems={experience?.carouselItems ?? []}
          isLandscape={experience?.isLandscape}
        />
      </BlockRendererWithCondition>
      <Separator isActive={false} />
      {!!question && (
        <SimplePushCta
          requiredTitle={question.requiredTitle}
          surtitle={question.surtitle}
          icon={question.icon}
          requiredImage={question.requiredImage}
          requiredCta={question.requiredCta}
        />
      )}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<ListeOffresQuery>(ListeOffresDocument, {})
    .toPromise()

  if (result.error || !result.data || !result.data.listeOffre) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  const offerTag = result.data.listeOffre.offres?.offreTag

  const offerItems = (await fetchBackend(
    `institutional/playlist/${offerTag}`
  )) as Offer[]

  return {
    props: {
      offerListe: result.data.listeOffre,
      offerItems,
    },
    revalidate: false,
  }
}
