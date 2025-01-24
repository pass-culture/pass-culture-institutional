import React, { useContext } from 'react'
import styled, { css } from 'styled-components'

import { PlanDuSiteDocument, PlanDuSiteQuery } from '@/generated/graphql'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { BreadcrumbContext } from '@/ui/components/breadcrumb/breadcrumb-context'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import MenuSection from '@/ui/components/sitemap/MenuSection'

type PlanDuSiteProps = {
  mapSiteData: PlanDuSiteQuery['pages']
}

const PlanDuSite = (props: PlanDuSiteProps) => {
  const data = useContext(BreadcrumbContext)
  const seo = props?.mapSiteData?.[0]?.seo ?? null
  const AndroidUrl = data?.targetItems?.[0]?.megaMenu?.bannerAndroidUrl
  const IosUrl = data?.targetItems?.[0]?.megaMenu?.bannerIosUrl

  return (
    <PageLayout seo={seo} title="Plan du site" socialMediaSection={undefined}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>
      <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
        <SitemapSection aria-labelledby="target-section">
          <SitemapHeading id="target-section">Nos publics</SitemapHeading>
          {data?.targetItems.map((item) => (
            <MenuSection key={item.id} item={item} />
          ))}
        </SitemapSection>
        <SitemapSection aria-labelledby="about-section">
          <SitemapHeading id="about-section">À propos</SitemapHeading>
          {data?.aboutItems.map((item) => (
            <MenuSection key={item.id} item={item} />
          ))}
        </SitemapSection>
        <SitemapSection aria-labelledby="footer-section">
          <SitemapHeading id="footer-section">
            Informations légales
          </SitemapHeading>
          <SitemapList>
            {data?.footerItems.map((link) => (
              <li key={link.id}>
                <SitemapLink href={link.URL} aria-label={link.Label}>
                  {link.Label.trim()}
                </SitemapLink>
              </li>
            ))}
          </SitemapList>
        </SitemapSection>
        <SitemapSection aria-labelledby="nos-applications">
          <SitemapHeading id="nos-applications">
            Nos applications
          </SitemapHeading>
          <SitemapList>
            {AndroidUrl && (
              <li>
                <SitemapLink
                  href={AndroidUrl}
                  aria-label="Télécharger l'application sur Android">
                  Android
                </SitemapLink>
              </li>
            )}
            {IosUrl && (
              <li>
                <SitemapLink
                  href={IosUrl}
                  aria-label="Télécharger l'application sur iOS">
                  iOS
                </SitemapLink>
              </li>
            )}
          </SitemapList>
        </SitemapSection>
      </ContentWrapper>
    </PageLayout>
  )
}

export default PlanDuSite

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
const SitemapSection = styled.section`
  margin-bottom: 2rem;
`

const SitemapHeading = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    font-weight: 600;
  `}
`
const SitemapLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: underline;
    line-height: 1.8;
    &:hover,
    &:focus {
      text-decoration: underline;
      color: ${theme.colors.primary};
    }
  `}
`
const SitemapList = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding-left: 1.5rem;
    margin: 0;

    li {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 0.8em;
        width: 5px;
        height: 5px;
        background-color: ${theme.colors.primary};
        border-radius: 50%;
      }
    }
  `}
`

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<PlanDuSiteQuery>(PlanDuSiteDocument, {
      filters: {
        Path: {
          eqi: 'plan-du-site',
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.pages) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      mapSiteData: result.data.pages,
    },
    revalidate: false,
  }
}
