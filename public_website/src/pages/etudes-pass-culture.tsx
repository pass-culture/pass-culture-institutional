import React from 'react'
import styled from 'styled-components'

import {
  EtudesPassCultureDocument,
  EtudesPassCultureQuery,
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
  ressourcesData: NonNullable<EtudesPassCultureQuery['resources']>
  etudesPassCultureData: NonNullable<
    EtudesPassCultureQuery['etudesPassCulture']
  >
}

export default function EtudesPassCulture({
  ressourcesData,
  etudesPassCultureData,
}: ListProps) {
  const {
    buttonText,
    // filtres,
    observatoire,
    seo,
    // showFilter,
    socialMediaSection,
    title,
  } = etudesPassCultureData

  // const [category, setCategory] = useState<string[]>([])
  // const [localisation, setLocalisation] = useState<string[]>([])
  // const [secteur, setSecteur] = useState<string[]>([])
  // const [partner, setPartner] = useState<string[]>([])

  // const cat = Array.from(
  //   new Set(ressourcesData.map((item) => item.attributes.category))
  // )
  // const sec = Array.from(
  //   new Set(ressourcesData.map((item) => item.attributes.secteur))
  // )
  // const loc = Array.from(
  //   new Set(ressourcesData.map((item) => item.attributes.localisation))
  // )
  // const part = Array.from(
  //   new Set(ressourcesData.map((item) => item.attributes.partnership))
  // )

  // const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
  //   []
  // )
  // const [filters, setFilters] = useState<Filter[]>([])

  // useEffect(() => {
  //   setCategory(cat)
  //   setLocalisation(loc)
  //   setSecteur(sec)
  //   setPartner(part)

  //   setData(ressourcesData)
  //   const filtresOption = filterByAttribute(filtres, ressourcesData)
  //   if (filtresOption) setFilters(filtresOption)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   showFilter && fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category, localisation, secteur, partner, showFilter])

  // const fetchData = async () => {
  //   const resourcesQuery = stringify({
  //     populate: ['image'],
  //     pagination: {},
  //     sort: ['date:desc'],
  //     filters: {
  //       category: {
  //         $eqi: category,
  //       },

  //       secteur: {
  //         $eqi: secteur,
  //       },
  //       localisation: {
  //         $eqi: localisation,
  //       },
  //       partnership: {
  //         $eqi: partner,
  //       },
  //       pageLocalisation: {
  //         $containsi: 'S\u2019informer - études',
  //       },
  //     },
  //   })

  //   const resources = (await Pages.getPage(
  //     PATHS.RESOURCES,
  //     resourcesQuery
  //   )) as APIResponseData<'api::resource.resource'>[]

  //   setData(resources)
  // }

  // const hasData = data.length > 0

  return (
    <PageLayout
      seo={seo}
      title={title ?? undefined}
      socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      <React.Fragment>
        {/* {showFilter && (
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
        )} */}

        {ressourcesData.length > 0 ? (
          <StyledListItems
            news={ressourcesData.filter((item) => item !== null)}
            type="ressources"
            buttonText={buttonText ?? ''}
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
          requiredTitle={observatoire.requiredTitle}
          requiredImage={observatoire?.requiredImage}
          icon={observatoire?.icon}
          requiredCta={observatoire?.requiredCta}
        />
      )}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<EtudesPassCultureQuery>(EtudesPassCultureDocument, {
      sort: ['date:desc'],
      filters: {
        category: {
          in: [
            'Dossier de presse',
            'Communiqué de presse',
            'Étude ritualisée',
            'Étude ponctuelle',
          ],
        },
        pageLocalisation: {
          containsi: 'S\u2019informer - études',
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.etudesPassCulture) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      etudesPassCultureData: result.data.etudesPassCulture,
      ressourcesData: result.data.resources,
    },
    revalidate: false,
  }
}

const StyledListItems = styled(ListItems)`
  top: 0;
`
const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
