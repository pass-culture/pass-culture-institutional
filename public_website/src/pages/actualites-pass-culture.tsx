import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { getPage } from '@/domain/pages/pages.actions'
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
import type { PushCTAProps } from '@/types/props'
import type { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { fetchLayoutData } from '@/utils/fetchCMS'
import { filterByAttribute } from '@/utils/filterbyAttributes'

interface ListProps {
  newsActuPassData: APIResponseData<'api::news.news'>[]
  listeActualitesPassCulture: APIResponseData<'api::actualites-pass-culture.actualites-pass-culture'>
}

const setQuery = (category: string[], localisation: string[]): string => {
  return stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {},
    filters: {
      category: {
        $eqi: category,
      },
      localisation: {
        $eqi: localisation,
      },
      pageLocalisation: {
        $containsi: 'S\u2019informer',
      },
    },
  })
}

export default function ListeActualitesPassCulture({
  newsActuPassData,
  listeActualitesPassCulture,
}: ListProps) {
  const {
    aide,
    buttonText,
    filtres,
    seo,
    showFilter,
    socialMediaSection,
    title,
  } = listeActualitesPassCulture.attributes

  const cat = Array.from(
    new Set(newsActuPassData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(newsActuPassData.map((item) => item.attributes.localisation))
  )
  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalLocalisation(loc)
    setOriginalCategory(cat)

    setData(newsActuPassData)
    const filtresOption = filterByAttribute(filtres, newsActuPassData)
    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const newsQuery = setQuery(category, localisation)
    const news = (await getPage(
      'news-list',
      newsQuery
    )) as APIResponseData<'api::news.news'>[]

    setData(news)
  }
  useEffect(() => {
    showFilter && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, showFilter])

  const hasData = data.length > 0

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
            originalCategory={originalCategory}
            originalLocalisation={originalLocalisation}
            data={filters}
          />
        </ContentWrapper>
      )}

      {hasData ? (
        <StyledListItems news={data} type="actualite" buttonText={buttonText} />
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
  const newsQuery = setQuery(
    ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
    []
  )

  const news = (await getPage(
    PATHS.NEWS,
    newsQuery
  )) as APIResponseData<'api::news.news'>[]

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

  const page = (await Pages.getPage(
    PATHS.ACTU_PASS,
    query
  )) as APIResponseData<'api::actualites-pass-culture.actualites-pass-culture'>

  return {
    props: {
      ...(await fetchLayoutData()),
      newsActuPassData: news,
      listeActualitesPassCulture: page,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledListItems = styled(ListItems)`
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
