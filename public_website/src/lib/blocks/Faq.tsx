import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import faqJsonData from '../../../faqData.json'
import { LinkFaq } from '../../ui/components/help/Link'
import { Typo } from '../../ui/components/typographies'
import arrowUrl from '../../ui/image/arrowd.svg'
import { CTA } from '@/types/CTA'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

type FaqProps = {
  title: string
  cta: CTA
  /** Category IDs separated by commas */
  categories: string | undefined
  /** Only questions with the given property set to true are displayed. */
  filteringProperty: string
  limit: number
}

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

export function Faq({
  title,
  cta,
  categories,
  filteringProperty,
  limit,
}: FaqProps) {
  /** Extract plain text from html and cut it at 600 characters */
  const cutFaqBody = (body: string) => {
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
    <StyledContentWrapper>
      <StyledContentTextWrapper>
        {title && <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />}
        {cta && <ButtonWithCTA cta={cta} />}
      </StyledContentTextWrapper>
      <StyledFaqWrapper>
        {filteredQuestions.map((faq) => (
          <StyledAccordion key={faq.id}>
            <summary
              dangerouslySetInnerHTML={{
                __html: faq.title.replace(/\[.*?\]/g, ''),
              }}></summary>
            <p
              dangerouslySetInnerHTML={{
                __html: cutFaqBody(faq.body),
              }}></p>
            {faq.url && <LinkFaq href={faq.html_url} text="Voir le detail" />}
          </StyledAccordion>
        ))}
      </StyledFaqWrapper>
      {cta && <MobileCta cta={cta} />}
    </StyledContentWrapper>
  )
}

const StyledContentWrapper = styled(ContentWrapper)`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 12.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
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
    min-width: 18rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.75rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 0;
    }

    a {
      @media (width < ${theme.mediaQueries.mobile}) {
        padding-left: 0;
        display: none;
      }
    }
  `}
`

const StyledFaqWrapper = styled.div``

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
    }

    summary::after {
      content: url('${arrowUrl.src}');
      right: 2rem;
      top: 50%;
      position: absolute;
      transform: translateY(-50%);
      line-height: 0;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    &[open] summary::after {
      transform: rotate(180deg);
    }

    p {
      margin-top: 1rem;
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

    @media (width < ${theme.mediaQueries.mobile}) {
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
  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    display: inline-block;
  }
`
