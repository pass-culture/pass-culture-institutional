import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { EventListItems } from '@/lib/blocks/EventListItems'
import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ImageText } from '@/lib/blocks/ImageText'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'

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
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [originalSecteur, setOriginalSecteur] = useState<string[]>([])

  const [eventCategory, setEventCategory] = useState<string[]>([])
  const [originalEventCategory, setOriginalEventCategory] = useState<string[]>(
    []
  )
  const [eventLocalisation, setEventLocalisation] = useState<string[]>([])
  const [originalEventLocalisation, setOriginalEventLocalisation] = useState<
    string[]
  >([])
  const [eventSecteur, setEventSecteur] = useState<string[]>([])
  const [originalEventSecteur, setOriginalEventSecteur] = useState<string[]>([])

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
    setOriginalCategory(cat)
    setOriginalLocalisation(loc)
    setSecteur(sec)
    setOriginalSecteur(sec)

    setEventCategory(eventCat)
    setEventLocalisation(eventLoc)
    setOriginalEventCategory(eventCat)
    setOriginalEventLocalisation(eventLoc)
    setEventSecteur(eventSec)
    setOriginalEventSecteur(eventSec)

    setData(resourcesData)
    let uniqueCategories = []
    let uniqueLocalisations = []
    let uniqueSecteurs = []

    setEventData(eventsData)
    let uniqueEventCategories = []
    let uniqueEventLocalisations = []
    let uniqueEventSecteurs = []

    const filtres = presseListe.attributes?.filtres?.map((filtre) => {
      switch (filtre.filtre) {
        case 'Catégorie':
          uniqueCategories = Array.from(
            new Set(resourcesData.map((item) => item.attributes.category))
          )
          return {
            ...filtre,
            value: uniqueCategories,
          }
        case "Secteur d'activités":
          uniqueSecteurs = Array.from(
            new Set(resourcesData.map((item) => item.attributes.secteur))
          )
          return {
            ...filtre,
            value: uniqueSecteurs,
          }
        case 'Localisation':
          uniqueLocalisations = Array.from(
            new Set(resourcesData.map((item) => item.attributes.localisation))
          )
          return {
            ...filtre,
            value: uniqueLocalisations,
          }

        default:
          return { ...filtre, value: [] }
      }
    })

    const eventFiltres = presseListe.attributes?.filtres?.map((filtre) => {
      switch (filtre.filtre) {
        case 'Catégorie':
          uniqueEventCategories = Array.from(
            new Set(eventsData.map((item) => item.attributes.category))
          )
          return {
            ...filtre,
            value: uniqueEventCategories,
          }
        case 'Localisation':
          uniqueEventLocalisations = Array.from(
            new Set(eventsData.map((item) => item.attributes.localisation))
          )
          return {
            ...filtre,
            value: uniqueEventLocalisations,
          }
        case "Secteur d'activités":
          uniqueEventSecteurs = Array.from(
            new Set(eventsData.map((item) => item.attributes.secteur))
          )
          return {
            ...filtre,
            value: uniqueEventSecteurs,
          }
        default:
          return { ...filtre, value: [] }
      }
    })
    if (filtres) setFilters(filtres)
    if (eventFiltres) setEventFilters(eventFiltres)

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
          $containsi: 'S’informer - presse',
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
  const handleEventFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setEventCategory(value[0] === '' ? originalEventCategory : value)
        break
      case 'Localisation':
        setEventLocalisation(
          value[0] === '' ? originalEventLocalisation : value
        )
        break
      case "Secteur d'activités":
        setEventSecteur(value[0] === '' ? originalEventSecteur : value)
        break
      default:
        break
    }
  }
  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setCategory(value[0] === '' ? originalCategory : value)
        break
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalLocalisation : value)
        break
      case "Secteur d'activités":
        setSecteur(value[0] === '' ? originalSecteur : value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  useEffect(() => {
    fetchEventData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventCategory, eventLocalisation, eventSecteur])

  return (
    <React.Fragment>
      {presseListe.attributes.seo && (
        <Seo metaData={presseListe.attributes.seo} />
      )}
      <StyledTitle>
        {presseListe.attributes.title && (
          <Typo.Heading2
            dangerouslySetInnerHTML={{
              __html: presseListe.attributes.title,
            }}
          />
        )}

        <Breadcrumb />

        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        type="ressources"
        buttonText={presseListe.attributes.buttonText}
      />

      <Separator isActive={presseListe.attributes.separator?.isActive} />

      <StyledTitle>
        {presseListe.attributes.titleEventSection && (
          <Typo.Heading3
            dangerouslySetInnerHTML={{
              __html: presseListe.attributes.titleEventSection,
            }}
          />
        )}
        <FilterContainer
          filtres={eventFilters}
          onFilterChange={handleEventFilterChange}
        />
      </StyledTitle>
      <StyledeventListItems
        type="evenement/"
        events={eventData}
        buttonText={presseListe.attributes.buttonText}
      />
      <Separator isActive={presseListe.attributes.separator?.isActive} />
      <ImageText
        title={presseListe.attributes.texteImage.title}
        image={presseListe.attributes.texteImage.image}
        text={presseListe.attributes.texteImage.text}
        icon={presseListe.attributes.texteImage.icon}
        isImageRight={presseListe.attributes.texteImage.isImageRight}
      />

      <DoublePushCTA
        title={presseListe.attributes.pushCta.title}
        image={presseListe.attributes.pushCta.image}
        firstCta={presseListe.attributes.pushCta.firstCta}
        secondCta={presseListe.attributes.pushCta.secondCta}
        text={presseListe.attributes.pushCta.text}
        icon={presseListe.attributes.pushCta.icon}
      />
      <StyledSimplePushCta>
        <SimplePushCta
          title={presseListe.attributes.aide?.title}
          image={presseListe.attributes.aide?.image}
          cta={presseListe.attributes.aide?.cta}
          surtitle={presseListe.attributes.aide?.surtitle}
          icon={presseListe.attributes.aide?.icon}
        />
      </StyledSimplePushCta>
      {presseListe.attributes.socialMediaSection &&
        presseListe.attributes.socialMediaSection.title &&
        presseListe.attributes.socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={presseListe.attributes.socialMediaSection.title}
            socialMediaLink={
              presseListe.attributes.socialMediaSection.socialMediaLink
            }
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
