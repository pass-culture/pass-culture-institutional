import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import faqJsonData from '../../../faqData.json'
import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { FaqProps } from '@/types/props'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { LinkFaq } from '@/ui/components/help/Link'
import { Typo } from '@/ui/components/typographies'
import arrowUrl from '@/ui/image/arrowd.svg'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

/** Filter questions based on the wanted categories and flag */
function filterFaqQuestions(
  categoryIds: string | undefined,
  boolProp: string,
  limit: number
) {
  const categoryIdsArray = categoryIds
    ? categoryIds.split(',').map((id) => parseInt(id.trim(), 10))
    : []

  const faqKeys = Object.keys(faqJsonData)

  let filteredQuestions: FaqQuestion[] = []

  faqKeys.forEach((key) => {
    if (categoryIdsArray.includes(parseInt(key, 10)) || !categoryIds) {
      const faqCategoryData = (faqJsonData as FaqData)[key]

      const filteredData = faqCategoryData?.filter(
        (faq: FaqQuestion) => faq[boolProp]
      )
      if (filteredData) {
        filteredQuestions = filteredQuestions.concat(filteredData)
      }
    }
  })

  return filteredQuestions.slice(0, limit)
}

export function Faq(props: FaqProps) {
  const { title, cta, categories, filteringProperty, limit } = props

  /** Extract plain text from html and cut it at 600 characters */
  const cutFaqBody = (body: string): string => {
    const plainText = body.replace(/<[^>]*>/g, '')
    if (plainText.length > 200) {
      return plainText.substring(0, 600) + '...'
    } else {
      return plainText
    }
  }

  const filteredQuestions = useMemo(
    () => filterFaqQuestions(categories, filteringProperty, limit),
    [categories, filteringProperty, limit]
  )

  return (
    <ContentWrapper>
      <StyledContentWrapper>
        <StyledContentTextWrapper>
          <StyledHeading>{title}</StyledHeading>
          <ButtonWithCTA cta={cta} />
        </StyledContentTextWrapper>
        <div>
          {filteredQuestions?.map((faq) => {
            const title = faq.title.replace(/\[.*?\]/g, '')
            const body = cutFaqBody(faq.body)
            const {
              accessibilityLabel: summaryAccessibilityLabel,
              processedText: summaryTextWithMarkup,
            } = parseText(title)
            const {
              accessibilityLabel: textAccessibilityLabel,
              processedText: textTextWithMarkup,
            } = parseText(body)

            return (
              <StyledAccordion key={faq.title}>
                <summary aria-label={summaryAccessibilityLabel}>
                  {summaryTextWithMarkup}
                </summary>
                <p aria-label={textAccessibilityLabel}>{textTextWithMarkup}</p>
                <BlockRendererWithCondition condition={isRenderable(faq.url)}>
                  <LinkFaq href={faq.html_url} text="Voir le détail" />
                </BlockRendererWithCondition>
              </StyledAccordion>
            )
          })}
        </div>

        {cta && <MobileCta cta={cta} />}
      </StyledContentWrapper>
    </ContentWrapper>
  )
}

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 12.5rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      grid-template-columns: 1fr;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  `}
`

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 2.5rem;
    min-width: 21rem;
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      margin-bottom: 1.75rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      padding-left: 0;
    }

    a {
      @media (width < ${theme.mediaQueries.largeDesktop}) {
        padding-left: 0;
        display: none;
      }
    }
  `}
`

const StyledAccordion = styled.details`
  ${({ theme }) => css`
    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }
    padding-bottom: 3rem;
    border-bottom: solid 1px ${theme.colors.black}20;

    summary {
      font-size: ${theme.fonts.sizes['xl']};
      font-weight: ${theme.fonts.weights.bold};
      display: block;
      position: relative;
      padding-right: 4rem;
      cursor: pointer;
    }

    summary::after {
      content: url('${arrowUrl.src}');
      right: 2rem;
      top: 50%;
      position: absolute;
      line-height: 0;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    &[open] summary::after {
      transform: rotate(180deg);
    }

    p {
      margin-top: 1.0625rem;
      line-height: 2.125rem;
    }

    button {
      display: flex;
      width: 100%;
      justify-content: space-between;

      &:focus-visible {
        outline: 0px auto -webkit-focus-ring-color !important;
      }
    }

    svg {
      transform: rotateZ(270deg);
    }

    section {
      margin-bottom: 2rem;
    }

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      text-align: left;

      padding-bottom: 2rem;

      &:not(:last-of-type) {
        margin-bottom: 2rem;
      }
    }
  `}
`

const MobileCta = styled(ButtonWithCTA)`
  display: none;
  @media (width < ${(p) => p.theme.mediaQueries.largeDesktop}) {
    display: inline-block;
  }
`
