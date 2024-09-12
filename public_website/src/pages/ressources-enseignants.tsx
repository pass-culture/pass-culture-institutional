import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import FilterOption from '@/lib/filters/FilterOption'
import PageLayout from '@/lib/PageLayout'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { filterByAttribute } from '@/utils/filterbyAttributes'

interface ListProps {
  resourceREData: APIResponseData<'api::resource.resource'>[]
  ressourcesEnseignantsListe: APIResponseData<'api::ressources-enseignant.ressources-enseignant'>
}

export default function RessourcesEnseignants({
  resourceREData,
  ressourcesEnseignantsListe,
}: ListProps) {
  const {
    aide,
    buttonText,
    filtres,
    seo,
    showFilter,
    socialMediaSection,
    title,
  } = ressourcesEnseignantsListe.attributes

  const cat = Array.from(
    new Set(resourceREData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(resourceREData.map((item) => item.attributes.localisation))
  )

  const sec = Array.from(
    new Set(resourceREData.map((item) => item.attributes.secteur))
  )
  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])

  const [secteur, setSecteur] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)

    setData(resourceREData)

    const filtresOption = filterByAttribute(filtres, resourceREData)
    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDataRessourcesEnseignants = async () => {
    const newsQuery = stringify({
      populate: ['image'],
      sort: ['date:desc'],
      pagination: {},
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
        pageLocalisation: {
          $containsi: 'S\u2019informer - ressources',
        },
      },
    })

    const news = (await Pages.getPage(
      PATHS.RESOURCES,
      newsQuery
    )) as APIResponseData<'api::resource.resource'>[]

    setData(news)
  }

  useEffect(() => {
    fetchDataRessourcesEnseignants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  const hasData = data.length > 0

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <UnpaddedBreadcrumb />
      {hasData && (
        <React.Fragment>
          {showFilter && (
            <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
              <FilterOption
                setCategory={setCategory}
                setLocalisation={setLocalisation}
                originalCategory={category}
                originalLocalisation={localisation}
                setSecteur={setSecteur}
                originalSecteur={secteur}
                data={filters}
              />
            </ContentWrapper>
          )}

          <StyledListItems
            news={data}
            type="ressources"
            buttonText={buttonText}
          />
        </React.Fragment>
      )}

      <Separator isActive />
      <WhiteSpace />

      {!!aide && (
        <SimplePushCta
          title={aide.title}
          image={aide.image}
          cta={aide.cta}
          surtitle={aide.surtitle}
          icon={aide.icon}
        />
      )}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const resourcesQuery = stringify({
    populate: ['image'],
    pagination: {},
    sort: ['date:desc'],
    filters: {
      category: {
        $eqi: [
          'Communiqué de presse',
          'Dossier de presse',
          'Étude ponctuelle',
          'Étude ritualisée',
        ],
      },
      pageLocalisation: {
        $containsi: 'S\u2019informer - ressources',
      },
    },
  })

  const news = (await Pages.getPage(
    PATHS.RESOURCES,
    resourcesQuery
  )) as APIResponseData<'api::resource.resource'>[]

  const rsQuery = stringify({
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
    PATHS.RESSOURCES_TEACHERS_PAGE,
    rsQuery
  )) as APIResponseData<'api::ressources-enseignant.ressources-enseignant'>

  return {
    props: {
      resourceREData: news,
      ressourcesEnseignantsListe: data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledListItems = styled(ListItems)``

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
