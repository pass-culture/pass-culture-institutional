import React from 'react'
import styled from 'styled-components'

import {
  RessourcesPassDocument,
  RessourcesPassQuery,
} from '@/generated/graphql'
import NoResult from '@/lib/blocks/NoResult'
import { RessourceItems } from '@/lib/blocks/ResourceItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

type RessourcesPassCultureProps = {
  ressourcesData: NonNullable<RessourcesPassQuery['ressourcespass']>
  ressourcesPassCultureListe: NonNullable<
    RessourcesPassQuery['ressourcesPassCulture']
  >
}

export default function RessourcesPassCulture({
  ressourcesData,
  ressourcesPassCultureListe,
}: RessourcesPassCultureProps) {
  const {
    buttonText,
    etudes,
    // filtres,
    seo,
    // showFilter,
    socialMediaSection,
    title,
  } = ressourcesPassCultureListe

  // const cat = Array.from(new Set(ressourcesData.map((item) => item?.category)))

  // const [category, setCategory] = useState<string[]>([])

  // const [data, setData] = useState<
  //   APIResponseData<'api::ressourcepass.ressourcepass'>[]
  // >([])
  // const [filters, setFilters] = useState<Filter[]>([])

  // useEffect(() => {
  //   setCategory(cat)
  //   setData(ressourcesData)

  //   const filtresOption = filterByAttribute(filtres, ressourcesData)
  //   if (filtresOption) setFilters(filtresOption)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const fetchData = async () => {
  //   const ressourcesQuery = getRessourcesQuery(category)
  //   const resources = (await Pages.getPage(
  //     'ressourcespass',
  //     ressourcesQuery
  //   )) as APIResponseData<'api::ressourcepass.ressourcepass'>[]

  //   setData(resources)
  // }

  // const hasData = useMemo((): boolean => data.length > 0, [data])

  // useEffect(() => {
  //   showFilter && fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category, showFilter])

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
            data={filters}
          />
        </ContentWrapper>
      )} */}
      {ressourcesData.length > 0 ? (
        <StyledListItems
          news={ressourcesData.filter((item) => item !== null)}
          buttonText={buttonText ?? undefined}
          className=""
        />
      ) : (
        <NoResult />
      )}
      <Separator isActive />
      <WhiteSpace />
      {!!etudes && (
        <SimplePushCta
          requiredTitle={etudes.requiredTitle}
          surtitle={etudes.surtitle}
          requiredImage={etudes.requiredImage}
          requiredCta={etudes.requiredCta}
          icon={etudes.icon}
        />
      )}{' '}
      <Separator isActive={false} />
    </PageLayout>
  )
}

// export const getStaticProps = (async () => {
//   const ressourcesQuery = getRessourcesQuery(['Document', 'Article', 'Étude'])
//   const resources = (await Pages.getPage(
//     PATHS.RESSOURCES_PASS,
//     ressourcesQuery
//   )) as APIResponseData<'api::ressourcepass.ressourcepass'>[]

//   const ressourcesPage = (await Pages.getPage(
//     PATHS.RESSOURCES_PASS_PAGE,
//     newsQuery
//   )) as APIResponseData<'api::ressources-pass-culture.ressources-pass-culture'>
//   return {
//     props: {
//       ressourcesData: resources,
//       ressourcesPassCultureListe: ressourcesPage,
//     },
//   }
// }) satisfies GetStaticProps<ListRessourcesProps>

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<RessourcesPassQuery>(RessourcesPassDocument, {
      sort: ['date:desc'],
      filters: {
        category: {
          in: ['Document', 'Article', 'Étude'],
        },
      },
    })
    .toPromise()

  if (
    result.error ||
    !result.data ||
    !result.data.ressourcesPassCulture ||
    !result.data.ressourcespass
  ) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }
  return {
    props: {
      ressourcesData: result.data.ressourcespass,
      ressourcesPassCultureListe: result.data.ressourcesPassCulture,
    },
    revalidate: false,
  }
}

const StyledListItems = styled(RessourceItems)``

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
