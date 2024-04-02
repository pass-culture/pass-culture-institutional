import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { EventListItems } from '@/lib/blocks/EventListItems'
import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'
interface ListProps {
  newsRDVData: APIResponseData<'api::news.news'>[]
  listeActuCulturel: APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>

  eventsData: APIResponseData<'api::event.event'>[]
}

export default function ListeActuCulturels({
  newsRDVData,
  listeActuCulturel,
  eventsData,
}: ListProps) {
  const cat = Array.from(
    new Set(newsRDVData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(newsRDVData.map((item) => item.attributes.localisation))
  )

  const sec = Array.from(
    new Set(newsRDVData.map((item) => item.attributes.secteur))
  )

  const eventLACCat = Array.from(
    new Set(eventsData.map((item) => item.attributes.category))
  )

  const eventLACLoc = Array.from(
    new Set(eventsData.map((item) => item.attributes.localisation))
  )

  const eventLACSec = Array.from(
    new Set(eventsData.map((item) => item.attributes.secteur))
  )
  const [category, setCategory] = useState<string[]>([])
  const [originalRdvCategory, setOriginalRdvCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalRdvLocalisation, setOriginalRdvLocalisation] = useState<
    string[]
  >([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [originalRdvSecteur, setOriginalRdvSecteur] = useState<string[]>([])

  const [eventRdvCategory, setEventRdvCategory] = useState<string[]>([])
  const [originalEventRdvCategory, setOriginalEventRdvCategory] = useState<
    string[]
  >([])
  const [eventRdvLocalisation, setEventRdvLocalisation] = useState<string[]>([])
  const [originalEventRdvLocalisation, setOriginalEventRdvLocalisation] =
    useState<string[]>([])
  const [eventSecteur, setEventSecteur] = useState<string[]>([])
  const [originalEventSecteur, setOriginalEventSecteur] = useState<string[]>([])

  const [newsRdvFilters, setNewsRdvFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  const [eventFilters, setEventFilters] = useState<Filter[]>([])
  const [eventData, setEventData] = useState<
    APIResponseData<'api::event.event'>[]
  >([])

  useEffect(() => {
    setEventRdvCategory(eventLACCat)
    setEventRdvLocalisation(eventLACLoc)
    setOriginalEventRdvCategory(eventLACCat)
    setOriginalEventRdvLocalisation(eventLACLoc)
    setEventSecteur(eventLACSec)
    setOriginalEventSecteur(eventLACSec)

    setEventData(eventsData)
    let uniqueEventCategories = []
    let uniqueEventLocalisations = []
    let uniqueEventSecteurs = []

    setCategory(cat)
    setLocalisation(loc)
    setOriginalRdvCategory(cat)
    setOriginalRdvLocalisation(loc)
    setSecteur(sec)
    setOriginalRdvSecteur(sec)

    setData(newsRDVData)
    let uniqueCategories = []
    let uniqueLocalisations = []
    let uniqueSecteurs = []

    const eventFiltres = listeActuCulturel.attributes?.filtres?.map(
      (filtre) => {
        switch (filtre.filtre) {
          case "Secteur d'activités":
            uniqueEventSecteurs = Array.from(
              new Set(eventsData.map((item) => item.attributes.secteur))
            )
            return {
              ...filtre,
              value: uniqueEventSecteurs,
            }
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
          default:
            return { ...filtre, value: [] }
        }
      }
    )

    const filtres = listeActuCulturel.attributes?.filtres?.map((filtre) => {
      switch (filtre.filtre) {
        case 'Catégorie':
          uniqueCategories = Array.from(
            new Set(newsRDVData.map((item) => item.attributes.category))
          )
          return {
            ...filtre,
            value: uniqueCategories,
          }
        case 'Localisation':
          uniqueLocalisations = Array.from(
            new Set(newsRDVData.map((item) => item.attributes.localisation))
          )
          return {
            ...filtre,
            value: uniqueLocalisations,
          }
        case "Secteur d'activités":
          uniqueSecteurs = Array.from(
            new Set(newsRDVData.map((item) => item.attributes.secteur))
          )
          return {
            ...filtre,
            value: uniqueSecteurs,
          }
        default:
          return { ...filtre, value: [] }
      }
    })

    if (filtres) setNewsRdvFilters(filtres)
    if (eventFiltres) setEventFilters(eventFiltres)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const newsQuery = stringify({
      populate: ['image'],
      sort: ['date:desc'],
      pagination: {},
      filters: {
        localisation: {
          $eqi: localisation,
        },
        category: {
          $eqi: category,
        },
        secteur: {
          $eqi: secteur,
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
      `/news-list?${newsQuery}`
    )

    setData(news.data)
  }

  const fetchEventData = async () => {
    const eventQuery = stringify({
      sort: ['date:desc'],
      populate: ['image'],
      pagination: {},
      filters: {
        category: {
          $eqi: eventRdvCategory,
        },
        localisation: {
          $eqi: eventRdvLocalisation,
        },
        secteur: {
          $eqi: eventSecteur,
        },
      },
    })

    const events = await fetchCMS<APIResponseData<'api::event.event'>[]>(
      `/events?${eventQuery}`
    )

    setEventData(events.data)
  }

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setCategory(value[0] === '' ? originalRdvCategory : value)
        break
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalRdvLocalisation : value)
        break
      case "Secteur d'activités":
        setSecteur(value[0] === '' ? originalRdvSecteur : value)
        break
      default:
        break
    }
  }

  const handleEventFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setEventRdvCategory(value[0] === '' ? originalEventRdvCategory : value)
        break
      case 'Localisation':
        setEventRdvLocalisation(
          value[0] === '' ? originalEventRdvLocalisation : value
        )
        break
      case "Secteur d'activités":
        setEventSecteur(value[0] === '' ? originalEventSecteur : value)
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
  }, [eventRdvCategory, eventRdvLocalisation, eventSecteur])

  return (
    <React.Fragment>
      <StyledTitle>
        {listeActuCulturel.attributes.title && (
          <Typo.Heading2
            dangerouslySetInnerHTML={{
              __html: listeActuCulturel.attributes.title,
            }}
          />
        )}
        <FilterContainer
          filtres={newsRdvFilters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        buttonText={listeActuCulturel.attributes.buttonText}
      />

      <Separator isActive={listeActuCulturel.attributes.separator?.isActive} />

      <StyledTitle>
        {listeActuCulturel.attributes.titleEventSection && (
          <Typo.Heading3
            dangerouslySetInnerHTML={{
              __html: listeActuCulturel.attributes.titleEventSection,
            }}
          />
        )}
        <FilterContainer
          filtres={eventFilters}
          onFilterChange={handleEventFilterChange}
        />
      </StyledTitle>
      <StyledeventListItems
        events={eventData}
        buttonText={listeActuCulturel.attributes.buttonText}
      />
      <Separator isActive={listeActuCulturel.attributes.separator?.isActive} />

      <SimplePushCta
        title={listeActuCulturel.attributes.aide?.title}
        image={listeActuCulturel.attributes.aide?.image}
        cta={listeActuCulturel.attributes.aide?.cta}
        surtitle={listeActuCulturel.attributes.aide?.surtitle}
        icon={listeActuCulturel.attributes.aide?.icon}
      />
      {listeActuCulturel.attributes.socialMediaSection &&
        listeActuCulturel.attributes.socialMediaSection.title &&
        listeActuCulturel.attributes.socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={listeActuCulturel.attributes.socialMediaSection.title}
            socialMediaLink={
              listeActuCulturel.attributes.socialMediaSection.socialMediaLink
            }
          />
        )}
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  const newsQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {},
    filters: {
      category: {
        $eqi: ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
      },
    },
  })

  const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${newsQuery}`
  )

  const eventQuery = stringify({
    sort: ['date:desc'],
    populate: ['image', 'cta'],
    pagination: {},
  })

  const events = await fetchCMS<APIResponseData<'api::event.event'>[]>(
    `/events?${eventQuery}`
  )

  const query = stringify({
    populate: [
      'title',
      'buttonText',
      'filtres',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'separator',
      'aide',
      'aide.image',
      'aide.cta',
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>
  >(`/actualites-rdv-acteurs-culturel?${query}`)

  return {
    props: {
      newsRDVData: news.data,
      listeActuCulturel: data,

      eventsData: events.data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledTitle = styled.div`
  ${({ theme }) => css`
    padding: 1rem 1.5rem;
    max-width: 80rem;
    margin-inline: auto;
    margin-top: 4rem;

    h2 {
      margin-bottom: 4rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      h2 {
        text-align: center;
      }
    }
  `}
`
const StyledListItems = styled(ListItems)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 4rem;
      margin-bottom: 1rem;
    }
  `}
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
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 4rem;
      margin-bottom: 1rem;
    }
  `}
`
