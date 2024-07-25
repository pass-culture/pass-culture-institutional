import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import FilterOption from '@/lib/filters/FilterOption'
import PageLayout from '@/lib/PageLayout'
import { PushCTAProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { filterByAttribute } from '@/utils/filterbyAttributes'
import { separatorIsActive } from '@/utils/separatorIsActive'

interface ListProps {
  newsData: APIResponseData<'api::news.news'>[]
  listejeune: APIResponseData<'api::liste-jeune.liste-jeune'>
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
        $containsi: 'Jeunes et parents',
      },
    },
  })
}

export default function ListeJeune({ newsData, listejeune }: ListProps) {
  const {
    seo,
    title,
    buttonText,
    separator,
    aide,
    socialMediaSection,
    filtres,
  } = listejeune.attributes

  const cat = Array.from(
    new Set(newsData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(newsData.map((item) => item.attributes.localisation))
  )
  const [category, setCategory] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalCategory(cat)
    setOriginalLocalisation(loc)
    setData(newsData)
    const filtresOption = filterByAttribute(filtres, newsData)
    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const newsQuery = setQuery(category, localisation)

    const news = (await Pages.getPage(
      PATHS.NEWS,
      newsQuery
    )) as APIResponseData<'api::news.news'>[]

    setData(news)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation])

  const hasData = data.length > 0

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>
      <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
        <FilterOption
          setCategory={setCategory}
          setLocalisation={setLocalisation}
          originalCategory={originalCategory}
          originalLocalisation={originalLocalisation}
          data={filters}
        />
      </ContentWrapper>
      {hasData ? (
        <StyledListItems type="actualite" news={data} buttonText={buttonText} />
      ) : (
        <NoResult />
      )}
      <Separator isActive={separatorIsActive(separator)} />
      <SimplePushCta {...(aide as PushCTAProps)} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
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

  const newsQuery = setQuery(
    ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
    []
  )

  const news = (await Pages.getPage(
    PATHS.NEWS,
    newsQuery
  )) as APIResponseData<'api::news.news'>[]

  const data = (await Pages.getPage(
    PATHS.LISTE_JEUNES,
    query
  )) as APIResponseData<'api::liste-jeune.liste-jeune'>

  return {
    props: {
      newsData: news,
      listejeune: data,
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
