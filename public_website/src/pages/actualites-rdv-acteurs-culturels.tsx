import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { EventListItems } from '@/lib/blocks/EventListItems'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import FilterOption from '@/lib/filters/FilterOption'
import PageLayout from '@/lib/PageLayout'
import { StyledTitle } from '@/theme/style'
import { ListOffresProps, PushCTAProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { filterByAttribute } from '@/utils/filterbyAttributes'
import { separatorIsActive } from '@/utils/separatorIsActive'

export default function ListeActuCulturels({
  newsRDVData,
  listeActuCulturel,
  eventsData,
}: ListOffresProps) {
  const {
    aide,
    buttonText,
    filtres,
    seo,
    separator,
    showFilter,
    socialMediaSection,
    title,
    titleEventSection,
  } = listeActuCulturel.attributes

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
    setCategory(cat)
    setLocalisation(loc)
    setOriginalRdvCategory(cat)
    setOriginalRdvLocalisation(loc)
    setSecteur(sec)
    setOriginalRdvSecteur(sec)

    setData(newsRDVData)
    const newsFiltres = filterByAttribute(filtres, newsRDVData)
    const eventFiltres = filterByAttribute(filtres, eventsData)
    if (newsFiltres) setNewsRdvFilters(newsFiltres)
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
        pageLocalisation: {
          $containsi: 'Acteurs culturels',
        },
      },
    })

    const news = (await Pages.getPage(
      PATHS.NEWS,
      newsQuery
    )) as APIResponseData<'api::news.news'>[]

    setData(news)
  }

  const fetchEventData = async () => {
    const eventQuery = stringify({
      sort: ['date:desc'],
      populate: ['image', 'cta'],
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
        pageLocalisation: {
          $containsi: 'Acteurs culturels',
        },
      },
    })
    const events = (await Pages.getPage(
      PATHS.EVENTS,
      eventQuery
    )) as APIResponseData<'api::event.event'>[]

    setEventData(events)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  useEffect(() => {
    fetchEventData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventRdvCategory, eventRdvLocalisation, eventSecteur])

  const hasData = data.length > 0
  const hasEventData = eventData.length > 0

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      {showFilter && (
        <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
          <FilterOption
            setCategory={setCategory}
            setLocalisation={setLocalisation}
            originalCategory={originalRdvCategory}
            originalLocalisation={originalRdvLocalisation}
            originalSecteur={originalRdvSecteur}
            setSecteur={setSecteur}
            data={newsRdvFilters}
          />
        </ContentWrapper>
      )}

      {hasData ? (
        <StyledListItems news={data} type="actualite" buttonText={buttonText} />
      ) : (
        <NoResult />
      )}
      <Separator isActive={separatorIsActive(separator)} />

      <StyledTitle>
        {!!titleEventSection && (
          <Typo.Heading3>{titleEventSection}</Typo.Heading3>
        )}
      </StyledTitle>

      {showFilter && (
        <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
          <FilterOption
            setCategory={setEventRdvCategory}
            originalCategory={originalEventRdvCategory}
            setLocalisation={setEventRdvLocalisation}
            originalLocalisation={originalEventRdvLocalisation}
            setSecteur={setEventSecteur}
            originalSecteur={originalEventSecteur}
            data={eventFilters}
          />
        </ContentWrapper>
      )}

      {hasEventData ? (
        <StyledeventListItems
          type="evenement/"
          events={eventData}
          buttonText={buttonText}
        />
      ) : (
        <NoResult />
      )}
      <Separator isActive />
      <WhiteSpace />
      <SimplePushCta {...(aide as PushCTAProps)} />
      <Separator isActive={false} />
    </PageLayout>
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
      pageLocalisation: {
        $containsi: 'Acteurs culturels',
      },
    },
  })
  const news = (await Pages.getPage(
    PATHS.NEWS,
    newsQuery
  )) as APIResponseData<'api::news.news'>[]

  const eventQuery = stringify({
    sort: ['date:desc'],
    populate: ['image', 'cta'],
    pagination: {},
    filter: {
      pageLocalisation: {
        $containsi: 'Acteurs culturels',
      },
    },
  })

  const events = (await Pages.getPage(
    PATHS.EVENTS,
    eventQuery
  )) as APIResponseData<'api::event.event'>[]

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
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const data = (await Pages.getPage(
    PATHS.ACTU_RDV_ACTEURS,
    query
  )) as APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>

  return {
    props: {
      newsRDVData: news,
      listeActuCulturel: data,
      eventsData: events,
    },
  }
}) satisfies GetStaticProps<ListOffresProps>

const StyledListItems = styled(ListItems)`
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`
const StyledeventListItems = styled(EventListItems)`
  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
