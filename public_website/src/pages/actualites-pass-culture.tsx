import React from 'react'
import styled from 'styled-components'

import {
  ActualitesPassCultureDocument,
  ActualitesPassCultureQuery,
} from '@/generated/graphql'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

interface ListProps {
  newsActuPassData: NonNullable<ActualitesPassCultureQuery['newsList']>
  listeActualitesPassCulture: NonNullable<
    ActualitesPassCultureQuery['actualitesPassCulture']
  >
}

export default function ListeActualitesPassCulture({
  newsActuPassData,
  listeActualitesPassCulture,
}: ListProps) {
  const {
    aide,
    buttonText,
    // filtres,
    seo,
    // showFilter,
    socialMediaSection,
    title,
  } = listeActualitesPassCulture

  // const cat = Array.from(
  //   new Set(newsActuPassData.map((item) => item.attributes.category))
  // )

  // const loc = Array.from(
  //   new Set(newsActuPassData.map((item) => item.attributes.localisation))
  // )
  // const [category, setCategory] = useState<string[]>([])
  // const [localisation, setLocalisation] = useState<string[]>([])
  // const [originalCategory, setOriginalCategory] = useState<string[]>([])
  // const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])

  // const [filters, setFilters] = useState<Filter[]>([])
  // const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  // useEffect(() => {
  //   setCategory(cat)
  //   setLocalisation(loc)
  //   setOriginalLocalisation(loc)
  //   setOriginalCategory(cat)

  //   setData(newsActuPassData)
  //   const filtresOption = filterByAttribute(filtres, newsActuPassData)
  //   if (filtresOption) setFilters(filtresOption)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const fetchData = async () => {
  //   const newsQuery = setQuery(category, localisation)
  //   const news = (await getPage(
  //     'news-list',
  //     newsQuery
  //   )) as APIResponseData<'api::news.news'>[]

  //   setData(news)
  // }
  // useEffect(() => {
  //   showFilter && fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category, localisation, showFilter])

  // const hasData = newsActuPassData.length > 0

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
            originalCategory={originalCategory}
            originalLocalisation={originalLocalisation}
            data={filters}
          />
        </ContentWrapper>
      )} */}

      {newsActuPassData ? (
        <StyledListItems
          news={newsActuPassData.filter((item) => item !== null)}
          type="actualite"
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
    .query<ActualitesPassCultureQuery>(ActualitesPassCultureDocument, {
      sort: ['date:desc'],
      filters: {
        category: {
          in: ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
        },
        pageLocalisation: {
          containsi: 'S\u2019informer',
        },
      },
    })
    .toPromise()

  if (
    result.error ||
    !result.data ||
    !result.data.actualitesPassCulture ||
    !result.data.newsList
  ) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      newsActuPassData: result.data.newsList,
      listeActualitesPassCulture: result.data.actualitesPassCulture,
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

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
