import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { getPage } from '@/domain/pages/pages.actions'
import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import FilterOption from '@/lib/filters/FilterOption'
import { Seo } from '@/lib/seo/seo'
import { StyledSocialMedia } from '@/theme/style'
import { PushCTAProps, SocialMediaProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import Title from '@/ui/components/title/Title'
import { filterByAttribute } from '@/utils/filterbyAttributes'
import { separatorIsActive } from '@/utils/separatorIsActive'

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
        $containsi: 'S’informer',
      },
    },
  })
}

export default function ListeActualitesPassCulture({
  newsActuPassData,
  listeActualitesPassCulture,
}: ListProps) {
  const {
    seo,
    title,
    buttonText,
    separator,
    aide,
    socialMediaSection,
    filtres,
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
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation])

  const hasData = data.length > 0

  return (
    <React.Fragment>
      {!!seo && <Seo metaData={seo} />}
      {!!title && <Title title={title} />}

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
        <StyledListItems news={data} type="actualite" buttonText={buttonText} />
      ) : (
        <NoResult />
      )}

      <Separator isActive={separatorIsActive(separator)} />
      <SimplePushCta {...(aide as PushCTAProps)} />
      {!!socialMediaSection && (
        <StyledSocialMedia {...(socialMediaSection as SocialMediaProps)} />
      )}
    </React.Fragment>
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
      newsActuPassData: news,
      listeActualitesPassCulture: page,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledListItems = styled(ListItems)`
  //  margin-top: 3rem;
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
