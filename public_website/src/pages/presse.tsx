import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { EventListItems } from '@/lib/blocks/EventListItems'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ImageText } from '@/lib/blocks/ImageText'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import FilterOption from '@/lib/filters/FilterOption'
import PageLayout from '@/lib/PageLayout'
import { StyledTitle } from '@/theme/style'
import { ListPressProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { filterByAttribute } from '@/utils/filterbyAttributes'
import { separatorIsActive } from '@/utils/separatorIsActive'

export default function Presse({
  resourcesData,
  presseListe,
  eventsData,
}: ListPressProps) {
  const {
    aide,
    buttonText,
    pushCta,
    seo,
    separator,
    showFilter,
    socialMediaSection,
    texteImage,
    title,
    titleEventSection,
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
    const resourcesQuery = stringify({
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
          $containsi: 'S\u2019informer - presse',
        },
      },
    })

    const resources = (await Pages.getPage(
      PATHS.RESOURCES,
      resourcesQuery
    )) as APIResponseData<'api::resource.resource'>[]

    setData(resources)
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
          $containsi: 'S\u2019informer - presse',
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
    showFilter && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur, showFilter])

  useEffect(() => {
    showFilter && fetchEventData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventCategory, eventLocalisation, eventSecteur, showFilter])

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
            originalCategory={category}
            setLocalisation={setLocalisation}
            originalLocalisation={localisation}
            setSecteur={setSecteur}
            originalSecteur={secteur}
            data={filters}
          />
        </ContentWrapper>
      )}

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

      <StyledTitle>
        <Typo.Heading3>{titleEventSection}</Typo.Heading3>
      </StyledTitle>

      {showFilter && (
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
      )}

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
      <Separator isActive={false} />
      <StyledSimplePushCta>
        {!!aide && (
          <SimplePushCta
            title={aide.title}
            image={aide.image}
            cta={aide.cta}
            surtitle={aide.surtitle}
            icon={aide.icon}
          />
        )}
      </StyledSimplePushCta>
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const resourcesQuery = stringify({
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
        $containsi: 'S\u2019informer - presse',
      },
    },
  })
  const resources = (await Pages.getPage(
    PATHS.RESOURCES,
    resourcesQuery
  )) as APIResponseData<'api::resource.resource'>[]

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
  const data = (await Pages.getPage(
    PATHS.PRESSE,
    query
  )) as APIResponseData<'api::presse.presse'>

  const eventQuery = stringify({
    sort: ['date:desc'],
    populate: ['image', 'cta'],
    pagination: {},
    filter: {
      pageLocalisation: {
        $containsi: 'S\u2019informer - presse',
      },
    },
  })

  const events = (await Pages.getPage(
    PATHS.EVENTS,
    eventQuery
  )) as APIResponseData<'api::event.event'>[]

  return {
    props: {
      resourcesData: resources,
      presseListe: data,
      eventsData: events,
    },
  }
}) satisfies GetStaticProps<ListPressProps>

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
