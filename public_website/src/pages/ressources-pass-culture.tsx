import React, { useEffect, useMemo, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { Filter } from '@/lib/blocks/FilterContainer'
import NoResult from '@/lib/blocks/NoResult'
import { RessourceItems } from '@/lib/blocks/ResourceItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import FilterOption from '@/lib/filters/FilterOption'
import PageLayout from '@/lib/PageLayout'
import { ListRessourcesProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { filterByAttribute } from '@/utils/filterbyAttributes'

const newsQuery = stringify({
  populate: [
    'title',
    'buttonText',
    'filtres',
    'socialMediaSection',
    'socialMediaSection.socialMediaLink',
    'separator',
    'etudes',
    'etudes.image',
    'etudes.cta',
    'seo',
    'seo.metaSocial',
    'seo.metaSocial.image',
  ],
})

const getRessourcesQuery = (category: string[]) => {
  return stringify({
    sort: ['date:desc'],
    populate: ['cta'],
    pagination: {},
    filters: {
      category: {
        $eqi: category,
      },
      pageLocalisation: {
        // $containsi: 'S\u2019informer - ressources',
      },
    },
  })
}

export default function RessourcesPassCulture({
  ressourcesData,
  ressourcesPassCultureListe,
}: ListRessourcesProps) {
  const { seo, title, buttonText, etudes, socialMediaSection, filtres } =
    ressourcesPassCultureListe.attributes

  const cat = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.category))
  )

  const [category, setCategory] = useState<string[]>([])

  const [data, setData] = useState<
    APIResponseData<'api::ressourcepass.ressourcepass'>[]
  >([])
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    setCategory(cat)
    setData(ressourcesData)

    const filtresOption = filterByAttribute(filtres, ressourcesData)
    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const ressourcesQuery = getRessourcesQuery(category)
    const resources = (await Pages.getPage(
      'ressourcespass',
      ressourcesQuery
    )) as APIResponseData<'api::ressourcepass.ressourcepass'>[]

    setData(resources)
  }

  const hasData = useMemo((): boolean => data.length > 0, [data])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>
      <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
        <FilterOption
          setCategory={setCategory}
          originalCategory={category}
          data={filters}
        />
      </ContentWrapper>
      {hasData ? (
        <StyledListItems news={data} buttonText={buttonText} className="" />
      ) : (
        <NoResult />
      )}
      <Separator isActive />
      <WhiteSpace />
      {!!etudes && (
        <SimplePushCta
          title={etudes.title}
          image={etudes.image}
          cta={etudes.cta}
          surtitle={etudes.surtitle}
          icon={etudes.icon}
        />
      )}{' '}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const ressourcesQuery = getRessourcesQuery(['Document', 'Article', 'Étude'])
  const resources = (await Pages.getPage(
    PATHS.RESSOURCES_PASS,
    ressourcesQuery
  )) as APIResponseData<'api::ressourcepass.ressourcepass'>[]

  const ressourcesPage = (await Pages.getPage(
    PATHS.RESSOURCES_PASS_PAGE,
    newsQuery
  )) as APIResponseData<'api::ressources-pass-culture.ressources-pass-culture'>
  return {
    props: {
      ressourcesData: resources,
      ressourcesPassCultureListe: ressourcesPage,
    },
  }
}) satisfies GetStaticProps<ListRessourcesProps>

const StyledListItems = styled(RessourceItems)``

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
