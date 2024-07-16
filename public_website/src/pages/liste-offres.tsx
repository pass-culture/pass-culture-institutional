import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { ExperienceVideoCarousel } from '@/lib/blocks/experienceVideoCarousel/experienceVideoCarousel'
import { Header } from '@/lib/blocks/Header'
import { OffersCarousel } from '@/lib/blocks/offersCarousel/offersCarousel'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import { Seo } from '@/lib/seo/seo'
import { Offer } from '@/types/playlist'
import { ExperienceVideoCarouselSlideProps, ListProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import ButtonScrollTo from '@/ui/components/buttonScrollTo/ButtonScrollTo'
import { OfferSection } from '@/ui/components/offer-section/OfferSection'
import { fetchBackend } from '@/utils/fetchBackend'
import { fetchCMS } from '@/utils/fetchCMS'
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
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      {hero && hero.title && hero.icon && (
        <Header
          title={hero.title}
          text={hero.text}
          image={hero.image}
          icon={hero.icon}
        />
      )}

      <Breadcrumb isUnderHeader />
      <ButtonScrollTo noTranslate />
      <span id="target-anchor-scroll">
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
      </span>
      <Separator isActive={separatorIsActive(separator)} />
      <WhiteSpace space={0} />

      {offres_culturelles && (
        <OffersCarousel
          title={offres_culturelles.title}
          items={offres_culturelles.items}
          cta={{
            Label: offres_culturelles?.cta?.Label,
            URL: offres_culturelles?.cta?.URL,
            eventName: offres_culturelles?.cta?.eventName,
            eventOrigin: offres_culturelles?.cta?.eventOrigin,
          }}
        />
      )}

      <BlockRendererWithCondition
        condition={!!experience && experience.carouselItems.length > 0}>
        <StyledBackgroundExperienceVideoCarousel>
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
        </StyledBackgroundExperienceVideoCarousel>
      </BlockRendererWithCondition>

      {question && (
        <SimplePushCta
          title={question.title}
          surtitle={question.surtitle}
          icon={question.icon}
          image={question.image}
          cta={question.cta}
        />
      )}
      {socialMediaSection?.title && socialMediaSection?.socialMediaLink && (
        <SocialMedia
          title={socialMediaSection?.title}
          socialMediaLink={socialMediaSection?.socialMediaLink}
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

const StyledBackgroundExperienceVideoCarousel = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
    width: 100%;
    height: 100%;
    padding: 1rem 0rem 1rem 0rem;
  `}
`
