import React from 'react'
import styled from 'styled-components'

import {
  ActualitesRdvActeursCulturelsDocument,
  ActualitesRdvActeursCulturelsQuery,
} from '@/generated/graphql'
import { EventListItems } from '@/lib/blocks/EventListItems'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { StyledTitle } from '@/theme/style'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'

type ListOffresProps = {
  newsRDVData: NonNullable<ActualitesRdvActeursCulturelsQuery['newsList']>
  listeActuCulturel: NonNullable<
    ActualitesRdvActeursCulturelsQuery['actualitesRdvActeursCulturel']
  >
  eventsData: NonNullable<ActualitesRdvActeursCulturelsQuery['events']>
}

export default function ListeActuCulturels({
  newsRDVData,
  listeActuCulturel,
  eventsData,
}: ListOffresProps) {
  const {
    aide,
    buttonText,
    // filtres,
    seo,
    separator,
    // showFilter,
    socialMediaSection,
    title,
    titleEventSection,
  } = listeActuCulturel

  // const cat = Array.from(
  //   new Set(newsRDVData.map((item) => item.attributes.category))
  // )

  // const loc = Array.from(
  //   new Set(newsRDVData.map((item) => item.attributes.localisation))
  // )

  // const sec = Array.from(
  //   new Set(newsRDVData.map((item) => item.attributes.secteur))
  // )

  // const eventLACCat = Array.from(
  //   new Set(eventsData.map((item) => item.attributes.category))
  // )

  // const eventLACLoc = Array.from(
  //   new Set(eventsData.map((item) => item.attributes.localisation))
  // )

  // const eventLACSec = Array.from(
  //   new Set(eventsData.map((item) => item.attributes.secteur))
  // )
  // const [category, setCategory] = useState<string[]>([])
  // const [originalRdvCategory, setOriginalRdvCategory] = useState<string[]>([])
  // const [localisation, setLocalisation] = useState<string[]>([])
  // const [originalRdvLocalisation, setOriginalRdvLocalisation] = useState<
  //   string[]
  // >([])
  // const [secteur, setSecteur] = useState<string[]>([])
  // const [originalRdvSecteur, setOriginalRdvSecteur] = useState<string[]>([])

  // const [eventRdvCategory, setEventRdvCategory] = useState<string[]>([])
  // const [originalEventRdvCategory, setOriginalEventRdvCategory] = useState<
  //   string[]
  // >([])
  // const [eventRdvLocalisation, setEventRdvLocalisation] = useState<string[]>([])
  // const [originalEventRdvLocalisation, setOriginalEventRdvLocalisation] =
  //   useState<string[]>([])
  // const [eventSecteur, setEventSecteur] = useState<string[]>([])
  // const [originalEventSecteur, setOriginalEventSecteur] = useState<string[]>([])

  // const [newsRdvFilters, setNewsRdvFilters] = useState<Filter[]>([])
  // const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  // const [eventFilters, setEventFilters] = useState<Filter[]>([])
  // const [eventData, setEventData] = useState<
  //   APIResponseData<'api::event.event'>[]
  // >([])

  // useEffect(() => {
  //   setEventRdvCategory(eventLACCat)
  //   setEventRdvLocalisation(eventLACLoc)
  //   setOriginalEventRdvCategory(eventLACCat)
  //   setOriginalEventRdvLocalisation(eventLACLoc)
  //   setEventSecteur(eventLACSec)
  //   setOriginalEventSecteur(eventLACSec)
  //   setEventData(eventsData)
  //   setCategory(cat)
  //   setLocalisation(loc)
  //   setOriginalRdvCategory(cat)
  //   setOriginalRdvLocalisation(loc)
  //   setSecteur(sec)
  //   setOriginalRdvSecteur(sec)

  //   setData(newsRDVData)
  //   const newsFiltres = filterByAttribute(filtres, newsRDVData)
  //   const eventFiltres = filterByAttribute(filtres, eventsData)
  //   if (newsFiltres) setNewsRdvFilters(newsFiltres)
  //   if (eventFiltres) setEventFilters(eventFiltres)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const fetchData = async () => {
  //   const newsQuery = stringify({
  //     populate: ['image'],
  //     sort: ['date:desc'],
  //     pagination: {},
  //     filters: {
  //       localisation: {
  //         $eqi: localisation,
  //       },
  //       category: {
  //         $eqi: category,
  //       },
  //       secteur: {
  //         $eqi: secteur,
  //       },
  //       pageLocalisation: {
  //         $containsi: 'Acteurs culturels',
  //       },
  //     },
  //   })

  //   const news = (await Pages.getPage(
  //     PATHS.NEWS,
  //     newsQuery
  //   )) as APIResponseData<'api::news.news'>[]

  //   setData(news)
  // }

  // const fetchEventData = async () => {
  //   const eventQuery = stringify({
  //     sort: ['date:desc'],
  //     populate: ['image', 'cta'],
  //     pagination: {},
  //     filters: {
  //       category: {
  //         $eqi: eventRdvCategory,
  //       },
  //       localisation: {
  //         $eqi: eventRdvLocalisation,
  //       },
  //       secteur: {
  //         $eqi: eventSecteur,
  //       },
  //       pageLocalisation: {
  //         $containsi: 'Acteurs culturels',
  //       },
  //     },
  //   })
  //   const events = (await Pages.getPage(
  //     PATHS.EVENTS,
  //     eventQuery
  //   )) as APIResponseData<'api::event.event'>[]

  //   setEventData(events)
  // }

  // useEffect(() => {
  //   showFilter && fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category, localisation, secteur, showFilter])

  // useEffect(() => {
  //   showFilter && fetchEventData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [eventRdvCategory, eventRdvLocalisation, eventSecteur, showFilter])

  return (
    <PageLayout
      seo={seo}
      title={title ?? undefined}
      socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      {/* {showFilter && (
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
      )} */}

      {newsRDVData.length > 0 ? (
        <StyledListItems
          news={newsRDVData.filter((item) => item !== null)}
          type="actualite"
          buttonText={buttonText ?? ''}
        />
      ) : (
        <NoResult />
      )}
      <Separator isActive={separator?.isActive ?? false} />

      <StyledTitle>
        {!!titleEventSection && (
          <Typo.Heading3>{titleEventSection}</Typo.Heading3>
        )}
      </StyledTitle>

      {/* {showFilter && (
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
      )} */}

      {eventsData.length > 0 ? (
        <StyledeventListItems
          type="evenement/"
          events={eventsData.filter((item) => item !== null)}
          buttonText={buttonText ?? ''}
        />
      ) : (
        <NoResult />
      )}
      <Separator isActive />
      <WhiteSpace />
      {aide && <SimplePushCta {...aide} />}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<ActualitesRdvActeursCulturelsQuery>(
      ActualitesRdvActeursCulturelsDocument,
      {
        sortNews: ['date:desc'],
        filtersNews: {
          category: {
            in: ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
          },
          pageLocalisation: {
            containsi: 'S\u2019informer',
          },
        },
        sortEvents: ['date:desc'],
        filtersEvents: {
          pageLocalisation: {
            containsi: 'Acteurs culturels',
          },
        },
      }
    )
    .toPromise()

  if (
    result.error ||
    !result.data ||
    !result.data.actualitesRdvActeursCulturel ||
    !result.data.newsList ||
    !result.data.events
  ) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      newsRDVData: result.data.newsList,
      listeActuCulturel: result.data.actualitesRdvActeursCulturel,
      eventsData: result.data.events,
    },
    revalidate: false,
  }
}

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
