import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { ExperienceVideoCarousel } from '@/lib/blocks/experienceVideoCarousel/experienceVideoCarousel'
import { Header } from '@/lib/blocks/Header'
import { OffersCarousel } from '@/lib/blocks/offersCarousel/offersCarousel'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import PageLayout from '@/lib/PageLayout'
import { Offer } from '@/types/playlist'
import {
  ExperienceVideoCarouselSlideProps,
  ListProps,
  OffersVideoCarouselProps,
} from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { OfferSection } from '@/ui/components/offer-section/OfferSection'
import { fetchBackend } from '@/utils/fetchBackend'
import { separatorIsActive } from '@/utils/separatorIsActive'

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
  } = offerListe.attributes

  return (
    <PageLayout
      seo={seo}
      title={undefined}
      socialMediaSection={socialMediaSection}>
      {!!hero && (
        <Header
          title={hero.title}
          text={hero.text}
          image={hero.image}
          icon={hero.icon}
        />
      )}

      <Breadcrumb isUnderHeader />

      <OfferSection
        title={offres.title}
        description={offres.description}
        offers={offerItems}
        cta={offres.cta}
        firstCartTitle={offres.firstCartTitle}
        secondCartTitle={offres.secondCartTitle}
        descriptionCard={offres.descritptionCard}
        ctaCard={offres.ctaCard}
        firstIcon={offres.firstIcon}
        secondIcon={offres.secondIcon}
      />

      <Separator isActive={separatorIsActive(separator)} />
      <WhiteSpace space={0} />
      <BlockRendererWithCondition
        condition={!!offres_culturelles && offres_culturelles.items.length > 0}>
        <OffersCarousel {...(offres_culturelles as OffersVideoCarouselProps)} />
      </BlockRendererWithCondition>

      <BlockRendererWithCondition
        condition={!!experience && experience.carouselItems.length > 0}>
        <ExperienceVideoCarousel
          title={experience?.title as string}
          carouselItems={
            experience?.carouselItems as Omit<
              ExperienceVideoCarouselSlideProps,
              'slideIndex'
            >[]
          }
          isLandscape={experience?.isLandscape}
        />
      </BlockRendererWithCondition>

      {!!question && (
        <SimplePushCta
          title={question.title}
          surtitle={question.surtitle}
          icon={question.icon}
          image={question.image}
          cta={question.cta}
        />
      )}
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const query = stringify({
    populate: [
      'hero.image',
      'hero',
      'separator',
      'offres',
      'offres.cta',
      'question',
      'question.image',
      'question.cta',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'offres.ctaCard',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
      'experience',
      'experience.carouselItems',
      'offres_culturelles',
      'offres_culturelles.cta',
      'offres_culturelles.items',
    ],
  })
  const data = (await Pages.getPage(
    PATHS.OFFERS_LIST,
    query
  )) as APIResponseData<'api::liste-offre.liste-offre'>

  const offerTag = data.attributes.offres?.offreTag

  const offerItems = (await fetchBackend(
    `institutional/playlist/${offerTag}`
  )) as Offer[]

  return {
    props: {
      offerListe: data,
      offerItems,
    },
  }
}) satisfies GetStaticProps<ListProps>
