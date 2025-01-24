import React from 'react'
import styled from 'styled-components'

import {
  ActualitesJeunesParentsDocument,
  ActualitesJeunesParentsQuery,
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
  newsData: NonNullable<ActualitesJeunesParentsQuery['newsList']>
  listejeune: NonNullable<ActualitesJeunesParentsQuery['listeJeune']>
}

export default function ListeJeune({ newsData, listejeune }: ListProps) {
  const {
    seo,
    title,
    buttonText,
    aide,
    socialMediaSection,
    // filtres,
    // showFilter,
  } = listejeune

  // const cat = Array.from(
  //   new Set(newsData.map((item) => item.attributes.category))
  // )

  // const loc = Array.from(
  //   new Set(newsData.map((item) => item.attributes.localisation))
  // )
  // const [category, setCategory] = useState<string[]>([])
  // const [originalCategory, setOriginalCategory] = useState<string[]>([])
  // const [localisation, setLocalisation] = useState<string[]>([])
  // const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])

  // const [filters, setFilters] = useState<Filter[]>([])
  // const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  // useEffect(() => {
  //   setCategory(cat)
  //   setLocalisation(loc)
  //   setOriginalCategory(cat)
  //   setOriginalLocalisation(loc)
  //   setData(newsData)
  //   const filtresOption = filterByAttribute(filtres, newsData)
  //   if (filtresOption) setFilters(filtresOption)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const fetchData = async () => {
  //   const newsQuery = setQuery(category, localisation)

  //   const news = (await Pages.getPage(
  //     PATHS.NEWS,
  //     newsQuery
  //   )) as APIResponseData<'api::news.news'>[]

  //   setData(news)
  // }

  // useEffect(() => {
  //   showFilter && fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category, localisation, showFilter])

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
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

      {newsData.length > 0 ? (
        <StyledListItems
          type="actualite"
          news={newsData.filter((item) => item !== null)}
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
    .query<ActualitesJeunesParentsQuery>(ActualitesJeunesParentsDocument, {
      sort: ['date:desc'],
      filters: {
        category: {
          in: ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
        },
        pageLocalisation: {
          containsi: 'Jeunes et parents',
        },
      },
    })
    .toPromise()

  if (
    result.error ||
    !result.data ||
    !result.data.listeJeune ||
    !result.data.newsList
  ) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      newsData: result.data.newsList,
      listejeune: result.data.listeJeune,
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
