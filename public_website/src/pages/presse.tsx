import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { EventListItems } from '@/lib/blocks/EventListItems'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ImageText } from '@/lib/blocks/ImageText'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import FilterOption from '@/lib/filters/FilterOption'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'
import { filterByAttribute } from '@/utils/filterbyAttributes'
import { separatorIsActive } from '@/utils/separatorIsActive'

interface ListProps {
  resourcesData: APIResponseData<'api::resource.resource'>[]
  presseListe: APIResponseData<'api::presse.presse'>
  eventsData: APIResponseData<'api::event.event'>[]
}

export default function Presse({
  resourcesData,
  presseListe,
  eventsData,
}: ListProps) {
  const {
    seo,
    title,
    buttonText,
    titleEventSection,
    texteImage,
    pushCta,
    aide,
    socialMediaSection,
    separator,
    filtres,
  } = presseListe.attributes

  const cat = Array.from(
    new Set(resourcesData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(resourcesData.map((item) => item.attributes.localisation))
  )

  const sec = Array.from(
    new Set(resourcesData.map((item) => item.attributes.secteur))
  )

  const eventCat = Array.from(
    new Set(eventsData.map((item) => item.attributes.category))
  )

  const eventLoc = Array.from(
    new Set(eventsData.map((item) => item.attributes.localisation))
  )

  const eventSec = Array.from(
    new Set(eventsData.map((item) => item.attributes.secteur))
  )
  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])

  const [eventCategory, setEventCategory] = useState<string[]>([])
  const [eventLocalisation, setEventLocalisation] = useState<string[]>([])
  const [eventSecteur, setEventSecteur] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )

  const [eventFilters, setEventFilters] = useState<Filter[]>([])
  const [eventData, setEventData] = useState<
    APIResponseData<'api::event.event'>[]
  >([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)

    setEventCategory(eventCat)
    setEventLocalisation(eventLoc)
    setEventSecteur(eventSec)

    setData(resourcesData)

    setEventData(eventsData)

    const filtresOption = filterByAttribute(filtres, resourcesData)
    if (filtresOption) setFilters(filtresOption)

    if (filtresOption) setEventFilters(filtresOption)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const newsQuery = stringify({
      sort: ['date:desc'],
      pagination: {},
      populate: ['image'],
      filters: {
        category: {
          $eqi: category,
        },
        localisation: {
          $eqi: localisation,
        },
        secteur: {
          $eqi: secteur,
        },
        pageLocalisation: {
          // $containsi: 'S’informer - presse',
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
      `/resources?${newsQuery}`
    )

    setData(news.data)
  }
  const fetchEventData = async () => {
    const eventQuery = stringify({
      pagination: {},
      sort: ['date:desc'],
      populate: ['image', 'cta'],
      filters: {
        category: {
          $eqi: eventCategory,
        },
        localisation: {
          $eqi: eventLocalisation,
        },
        secteur: {
          $eqi: eventSecteur,
        },
        pageLocalisation: {
          $containsi: 'S’informer - presse',
        },
      },
    })

    const events = await fetchCMS<APIResponseData<'api::event.event'>[]>(
      `/events?${eventQuery}`
    )

    setEventData(events.data)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  useEffect(() => {
    fetchEventData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventCategory, eventLocalisation, eventSecteur])

  const hasData = data.length > 0
  const hasEventData = eventData.length > 0

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <StyledTitle>
        {title && <Typo.Heading2>{title}</Typo.Heading2>}
      </StyledTitle>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
        <FilterOption
          setCategory={setCategory}
          originalCategory={category}
          setLocalisation={setLocalisation}
          originalLocalisation={localisation}
          setSecteur={setSecteur}
          originalSecteur={secteur}
          data={filters}
        />
      </ContentWrapper>
      {hasData ? (
        <StyledListItems
          news={data}
          type="ressources"
          buttonText={buttonText}
        />
      ) : (
        <NoResult />
      )}

      <Separator isActive={separatorIsActive(separator)} />
      {/* BLOC EVENTS / RENDEZ-VOUS */}
      <StyledTitle>
        {titleEventSection && (
          <Typo.Heading3>{titleEventSection}</Typo.Heading3>
        )}
      </StyledTitle>

      <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
        <FilterOption
          setCategory={setEventCategory}
          originalCategory={eventCat}
          setLocalisation={setEventLocalisation}
          originalLocalisation={eventLocalisation}
          setSecteur={setEventSecteur}
          originalSecteur={eventSecteur}
          data={eventFilters}
        />
      </ContentWrapper>

      {hasEventData ? (
        <StyledeventListItems
          type="evenement"
          events={eventData}
          buttonText={buttonText}
        />
      ) : (
        <NoResult />
      )}

      <Separator isActive={separatorIsActive(separator)} />
      <ImageText
        title={texteImage.title}
        image={texteImage.image}
        text={texteImage.text}
        icon={texteImage.icon}
        isImageRight={texteImage.isImageRight}
      />

      <DoublePushCTA
        title={pushCta.title}
        image={pushCta.image}
        firstCta={pushCta.firstCta}
        secondCta={pushCta.secondCta}
        text={pushCta.text}
        icon={pushCta.icon}
      />
      <StyledSimplePushCta>
        {aide && (
          <SimplePushCta
            title={aide.title}
            image={aide.image}
            cta={aide.cta}
            surtitle={aide.surtitle}
            icon={aide.icon}
          />
        )}
      </StyledSimplePushCta>
      {socialMediaSection &&
        socialMediaSection.title &&
        socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={socialMediaSection.title}
            socialMediaLink={socialMediaSection.socialMediaLink}
          />
        )}
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  const newsQuery = stringify({
    sort: ['date:desc'],
    pagination: {},
    populate: ['image'],
    filters: {
      category: {
        $eqi: [
          'Dossier de presse',
          'Étude ritualisée',
          'Étude ponctuelle',
          'Communiqué de presse',
        ],
      },
      pageLocalisation: {
        $containsi: 'S’informer - presse',
      },
    },
  })

  const newsRequest = await fetchCMS<
    APIResponseData<'api::resource.resource'>[]
  >(`/resources?${newsQuery}`)

  const query = stringify({
    populate: [
      'title',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'buttonText',
      'filtres',
      'separator',
      'pushCta',
      'pushCta.image',
      'pushCta.firstCta',
      'pushCta.secondCta',
      'texteImage',
      'texteImage.image',
      'aide.image',
      'aide.cta',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const { data } = await fetchCMS<APIResponseData<'api::presse.presse'>>(
    `/presse?${query}`
  )

  const eventQuery = stringify({
    sort: ['date:desc'],
    populate: ['image', 'cta'],
    pagination: {},
    filter: {
      pageLocalisation: {
        $containsi: 'S’informer - presse',
      },
    },
  })

  const events = await fetchCMS<APIResponseData<'api::event.event'>[]>(
    `/events?${eventQuery}`
  )

  return {
    props: {
      resourcesData: newsRequest.data,
      presseListe: data,
      eventsData: events.data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledTitle = styled(ContentWrapper)`
  ${({ theme }) => css`
    --module-spacing: 0;
    margin-top: 3.5rem;

    h2 {
      margin-bottom: 3.5rem;
      font-size: ${theme.fonts.sizes['8xl']};
    }

    h3 {
      margin-bottom: 3.5rem;

      font-size: ${theme.fonts.sizes['6xl']};
      color: ${theme.colors.secondary};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 2rem;

      h2 {
        text-align: center;
        font-size: ${theme.fonts.sizes['4xl']};
        margin-bottom: 2rem;
      }

      h3 {
        font-size: ${theme.fonts.sizes['3xl']};
        margin-bottom: 3rem;
      }
    }
  `}
`
const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
const StyledListItems = styled(ListItems)`
  margin-top: 3rem;
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`
const StyledSocialMedia = styled(SocialMedia)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
    }
  `}
`
const StyledeventListItems = styled(EventListItems)`
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const StyledSimplePushCta = styled.div`
  margin-top: 17rem;
`
