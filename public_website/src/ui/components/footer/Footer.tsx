import React from 'react'
import styled, { css } from 'styled-components'

import { AppBanner } from '../app-banner/AppBanner'
import { FrenchRepublic } from '../icons/FrenchRepublic'
import { PassCulture } from '../icons/PassCulture'
import { FooterList } from './FooterList'
import { FooterMobileList } from './FooterMobileList'
import { useOnClickAnalytics } from '@/hooks/useOnClickAnalytics'
import { FooterProps } from '@/types/props'
import { Link } from '@/ui/components/Link'

export function Footer(props: FooterProps) {
  const {
    PlayStoreUrl,
    AppStoreUrl,
    bannerText,
    LegalLinks,
    Lists,
    bannerDefaultUrl = '',
  } = props

  const { onClickAnalytics } = useOnClickAnalytics()

  return (
    <StyledFooter id="footer">
      <StyledContentContainer>
        <StyledTopSection>
          <StyledLogos>
            <Link href="https://pass.culture.fr/">
              <PassCulture />
            </Link>
            <Link href="https://www.gouvernement.fr">
              <FrenchRepublic />
            </Link>
            <AppBanner
              title={bannerText}
              androidUrl={AppStoreUrl}
              iosUrl={PlayStoreUrl}
              defaultUrl={bannerDefaultUrl}
              onClick={(): void =>
                onClickAnalytics({
                  eventName: 'downloadApp',
                  eventOrigin: 'footer',
                })
              }
            />
          </StyledLogos>

          <StyledLists>
            {Lists?.map((list) => (
              <React.Fragment key={list.id}>
                <FooterList title={list.Title} listItems={list.Links} />
                <FooterMobileList title={list.Title} listItems={list.Links} />
              </React.Fragment>
            ))}
          </StyledLists>
          <StyledLegalLinks>
            {LegalLinks?.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.URL}>{link.Label}</Link>
                </li>
              )
            })}
          </StyledLegalLinks>
        </StyledTopSection>
      </StyledContentContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.375rem 0px;
    margin-top: var(--module-margin);
  `}
`

const StyledContentContainer = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto;
    padding: 5rem 2rem 2.875rem 2rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 2rem 1.5rem 2.875rem 1.5rem;
    }
  `}
`

const StyledTopSection = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 25rem 1fr;
    align-items: start;
    gap: 6.25rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  `}
`

const StyledLogos = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    align-items: stretch;
    justify-items: stretch;
    gap: 3.125rem 3.75rem;

    a:nth-child(2) img {
      mix-blend-mode: multiply;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 2rem;
    }
  `}
`

const StyledLists = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 4rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      gap: 0;
      grid-template-columns: 1fr;
    }
  `}
`

const StyledLegalLinks = styled.ul`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    grid-column: 2 / span 1;
    flex-wrap: wrap;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    color: ${theme.colors.black};
    opacity: 0.7;

    a:hover {
      text-decoration: underline;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      --legal-links-gap: 0.5rem;

      grid-column: auto;
      gap: var(--legal-links-gap);

      li {
        flex-basis: calc(50% - (var(--legal-links-gap) / 2));
      }
    }
  `}
`
