import React from 'react'
import styled from 'styled-components'

import { PresseDocument, PresseQuery } from '@/generated/graphql'
import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { EventListItems } from '@/lib/blocks/EventListItems'
import { ImageText } from '@/lib/blocks/ImageText'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { StyledTitle } from '@/theme/style'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'

type PresseProps = {
  resourcesData: NonNullable<PresseQuery['resources']>
  presseListe: NonNullable<PresseQuery['presse']>
  eventsData: NonNullable<PresseQuery['events']>
}

export default function Presse({
  resourcesData,
  presseListe,
  eventsData,
}: PresseProps) {
  const {
    aide,
    buttonText,
    pushCta,
    seo,
    separator,
    // showFilter,
    socialMediaSection,
    texteImage,
    title,
    titleEventSection,
    // filtres,
  } = presseListe

  // const cat = Array.from(new Set(resourcesData.map((item) => item?.category)))

  // const loc = Array.from(
  //   new Set(resourcesData.map((item) => item?.localisation))
  // )

  // const sec = Array.from(new Set(resourcesData.map((item) => item?.secteur)))

  // const eventCat = Array.from(new Set(eventsData.map((item) => item?.category)))

  // const eventLoc = Array.from(
  //   new Set(eventsData.map((item) => item?.localisation))
  // )

  // const eventSec = Array.from(new Set(eventsData.map((item) => item?.secteur)))
  // const [category, setCategory] = useState<string[]>([])
  // const [localisation, setLocalisation] = useState<string[]>([])
  // const [secteur, setSecteur] = useState<string[]>([])

  // const [eventCategory, setEventCategory] = useState<string[]>([])
  // const [eventLocalisation, setEventLocalisation] = useState<string[]>([])
  // const [eventSecteur, setEventSecteur] = useState<string[]>([])

  // const [filters, setFilters] = useState<Filter[]>([])
  // const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
  //   []
  // )

  // const [eventFilters, setEventFilters] = useState<Filter[]>([])
  // const [eventData, setEventData] = useState<
  //   APIResponseData<'api::event.event'>[]
  // >([])

  // useEffect(() => {
  //   setCategory(cat)
  //   setLocalisation(loc)
  //   setSecteur(sec)

  //   setEventCategory(eventCat)
  //   setEventLocalisation(eventLoc)
  //   setEventSecteur(eventSec)

  //   setData(resourcesData)

  //   setEventData(eventsData)

  //   const filtresOption = filterByAttribute(filtres, resourcesData)
  //   if (filtresOption) setFilters(filtresOption)

  //   if (filtresOption) setEventFilters(filtresOption)

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const fetchData = async () => {
  //   const resourcesQuery = stringify({
  //     sort: ['date:desc'],
  //     pagination: {},
  //     populate: ['image'],
  //     filters: {
  //       category: {
  //         $eqi: category,
  //       },
  //       localisation: {
  //         $eqi: localisation,
  //       },
  //       secteur: {
  //         $eqi: secteur,
  //       },
  //       pageLocalisation: {
  //         $containsi: 'S\u2019informer - presse',
  //       },
  //     },
  //   })

  //   const resources = (await Pages.getPage(
  //     PATHS.RESOURCES,
  //     resourcesQuery
  //   )) as APIResponseData<'api::resource.resource'>[]

  //   setData(resources)
  // }

  // const fetchEventData = async () => {
  //   const eventQuery = stringify({
  //     pagination: {},
  //     sort: ['date:desc'],
  //     populate: ['image', 'cta'],
  //     filters: {
  //       category: {
  //         $eqi: eventCategory,
  //       },
  //       localisation: {
  //         $eqi: eventLocalisation,
  //       },
  //       secteur: {
  //         $eqi: eventSecteur,
  //       },
  //       pageLocalisation: {
  //         $containsi: 'S\u2019informer - presse',
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
  // }, [eventCategory, eventLocalisation, eventSecteur, showFilter])

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
            originalCategory={category}
            setLocalisation={setLocalisation}
            originalLocalisation={localisation}
            setSecteur={setSecteur}
            originalSecteur={secteur}
            data={filters}
          />
        </ContentWrapper>
      )} */}

      {resourcesData.length > 0 ? (
        <StyledListItems
          news={resourcesData.filter((item) => item !== null)}
          type="ressources"
          buttonText={buttonText ?? undefined}
        />
      ) : (
        <NoResult />
      )}

      <Separator isActive={separator?.isActive ?? false} />

      <StyledTitle>
        <Typo.Heading3>{titleEventSection}</Typo.Heading3>
      </StyledTitle>

      {/* {showFilter && (
        <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
          <FilterOption
            setCategory={setEventCategory}
            originalCategory={eventCat.filter((item) => item !== undefined)}
            setLocalisation={setEventLocalisation}
            originalLocalisation={eventLocalisation.filter(
              (item) => item !== undefined
            )}
            setSecteur={setEventSecteur}
            originalSecteur={eventSecteur.filter((item) => item !== undefined)}
            data={eventFilters}
          />
        </ContentWrapper>
      )} */}

      {eventsData.length > 0 ? (
        <StyledeventListItems
          type="evenement"
          events={eventsData.filter((item) => item !== null)}
          buttonText={buttonText ?? ''}
        />
      ) : (
        <NoResult />
      )}

      <Separator isActive={separator?.isActive ?? false} />
      <ImageText {...texteImage} />

      <DoublePushCTA {...pushCta} />
      <Separator isActive={false} />
      <StyledSimplePushCta>
        {!!aide && <SimplePushCta {...aide} />}
      </StyledSimplePushCta>
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<PresseQuery>(PresseDocument, {
      sort: ['date:desc'],
      filters: {
        category: {
          in: [
            'Dossier de presse',
            'Étude ritualisée',
            'Étude ponctuelle',
            'Communiqué de presse',
          ],
        },
        pageLocalisation: {
          containsi: 'S\u2019informer - presse',
        },
      },
      sortEvents: ['date:desc'],
      filtersEvents: {
        pageLocalisation: {
          containsi: 'S\u2019informer - presse',
        },
      },
    })
    .toPromise()

  if (
    result.error ||
    !result.data ||
    !result.data.presse ||
    !result.data.resources ||
    !result.data.events
  ) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      resourcesData: result.data.resources,
      presseListe: result.data.presse,
      eventsData: result.data.events,
    },
    revalidate: false,
  }
}

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
const StyledListItems = styled(ListItems)`
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const StyledeventListItems = styled(EventListItems)``

const StyledSimplePushCta = styled.div``
