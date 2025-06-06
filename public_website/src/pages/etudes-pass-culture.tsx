import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import type { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import FilterOption from '@/lib/filters/FilterOption'
import PageLayout from '@/lib/PageLayout'
import type { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { fetchLayoutData } from '@/utils/fetchCMS'
import { filterByAttribute } from '@/utils/filterbyAttributes'

interface ListProps {
  ressourcesData: APIResponseData<'api::resource.resource'>[]
  etudesPassCultureListe: APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
}

export default function EtudesPassCulture({
  ressourcesData,
  etudesPassCultureListe,
}: ListProps) {
  const {
    buttonText,
    filtres,
    observatoire,
    seo,
    showFilter,
    socialMediaSection,
    title,
  } = etudesPassCultureListe.attributes

  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [partner, setPartner] = useState<string[]>([])

  const cat = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.category))
  )
  const sec = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.secteur))
  )
  const loc = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.localisation))
  )
  const part = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.partnership))
  )

  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)
    setPartner(part)

    setData(ressourcesData)
    const filtresOption = filterByAttribute(filtres, ressourcesData)
    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    showFilter && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur, partner, showFilter])

  const fetchData = async () => {
    const resourcesQuery = stringify({
      populate: ['image'],
      pagination: {},
      sort: ['date:desc'],
      filters: {
        category: {
          $eqi: category,
        },

        secteur: {
          $eqi: secteur,
        },
        localisation: {
          $eqi: localisation,
        },
        partnership: {
          $eqi: partner,
        },
        pageLocalisation: {
          $containsi: 'S\u2019informer - études',
        },
      },
    })

    const resources = (await Pages.getPage(
      PATHS.RESOURCES,
      resourcesQuery
    )) as APIResponseData<'api::resource.resource'>[]

    setData(resources)
  }

  const hasData = data.length > 0

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      <React.Fragment>
        {showFilter && (
          <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
            <FilterOption
              setCategory={setCategory}
              originalCategory={category}
              setLocalisation={setLocalisation}
              originalLocalisation={localisation}
              setPartner={setPartner}
              originalPartner={partner}
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
      </React.Fragment>

      <Separator isActive />
      <WhiteSpace />
      {!!observatoire && (
        <SimplePushCta
          surtitle={observatoire?.surtitle}
          title={observatoire.title}
          image={observatoire?.image}
          icon={observatoire?.icon}
          cta={observatoire?.cta}
        />
      )}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const resourcesQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    filters: {
      category: {
        $eqi: [
          'Dossier de presse',
          'Communiqué de presse',
          'Étude ritualisée',
          'Étude ponctuelle',
        ],
      },
      pageLocalisation: {
        $containsi: 'S\u2019informer - études',
      },
    },
    pagination: {},
  })

  const query = stringify({
    populate: [
      'title',
      'filtres',
      'buttonText',
      'socialMediaSection.socialMediaLink',
      'separator',
      'socialMediaSection',
      'observatoire',
      'observatoire.image',
      'observatoire.cta',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })

  const resources = (await Pages.getPage(
    PATHS.RESOURCES,
    resourcesQuery
  )) as APIResponseData<'api::resource.resource'>[]

  const data = (await Pages.getPage(
    PATHS.ETUDES_PASS_PAGE,
    query
  )) as APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>

  return {
    props: {
      ...(await fetchLayoutData()),
      ressourcesData: resources,
      etudesPassCultureListe: data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledListItems = styled(ListItems)`
  top: 0;
`
const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
