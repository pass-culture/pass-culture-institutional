import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { Header } from '@/lib/blocks/Header'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Offer } from '@/types/playlist'
import { APIResponseData } from '@/types/strapi'
import { OfferSection } from '@/ui/components/offer-section/OfferSection'
import { fetchBackend } from '@/utils/fetchBackend'
import { fetchCMS } from '@/utils/fetchCMS'

interface ListProps {
  offerListe: APIResponseData<'api::liste-offre.liste-offre'>
  offerItems: Offer[]
}

export default function ListeOffre({ offerListe, offerItems }: ListProps) {
  return (
    <React.Fragment>
      {offerListe.attributes.hero &&
        offerListe.attributes.hero.title &&
        offerListe.attributes.hero.icon && (
          <Header
            title={offerListe.attributes.hero.title}
            text={offerListe.attributes.hero.text}
            image={offerListe.attributes.hero.image}
            icon={offerListe.attributes.hero.icon}
          />
        )}

      <OfferSection
        title={offerListe.attributes.offres?.title}
        description={offerListe.attributes.offres?.description}
        offers={offerItems}
        cta={offerListe.attributes.offres?.cta}
        firstCartTitle={offerListe.attributes.offres?.firstCartTitle}
        secondCartTitle={offerListe.attributes.offres?.secondCartTitle}
        descriptionCard={offerListe.attributes.offres?.descritptionCard}
        ctaCard={offerListe.attributes.offres?.ctaCard}
        firstIcon={offerListe.attributes.offres?.firstIcon}
        secondIcon={offerListe.attributes.offres?.secondIcon}
      />

      {offerListe.attributes.separator && (
        <Separator isActive={offerListe.attributes.separator.isActive} />
      )}

      <SimplePushCta
        title={offerListe.attributes.question?.title}
        surtitle={offerListe.attributes.question?.surtitle}
        icon={offerListe.attributes.question?.icon}
        image={offerListe.attributes.question?.image}
        cta={offerListe.attributes.question?.cta}
      />
      {offerListe.attributes.socialMediaSection?.title &&
        offerListe.attributes.socialMediaSection?.socialMediaLink && (
          <SocialMedia
            title={offerListe.attributes.socialMediaSection?.title}
            socialMediaLink={
              offerListe.attributes.socialMediaSection?.socialMediaLink
            }
          />
        )}
    </React.Fragment>
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
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::liste-offre.liste-offre'>
  >(`/liste-offre?${query}`)
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
