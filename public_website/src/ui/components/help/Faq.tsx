import React from 'react'
import styled, { css } from 'styled-components'

import faqJsonData from '../../../../faqData.json'
import arrowUrl from '../../image/arrowd.svg'
import { Button } from '../button/Button'
import { Typo } from '../typographies'
import { LinkFaq } from './Link'

type FaqProps = {
  title: string
  cta: { Label: string; URL: string }
  categories: string | undefined // Prop for category IDs (CSV string)
  filteringProperty: string // Prop for boolean property to filter
  limit: number
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

  const filterFaqQuestions = (
    faqJsonData: FaqData,
    categoryIds: string | undefined,
    boolProp: string
  ) => {
    const categoryIdsArray = categoryIds
      ? categoryIds.split(',').map((id) => parseInt(id.trim(), 10))
      : []

    const faqKeys = Object.keys(faqJsonData)

    let filteredQuestions: FaqQuestion[] = []

    faqKeys.forEach((key) => {
      if (categoryIdsArray.includes(parseInt(key, 10)) || !categoryIds) {
        const faqCategoryData = faqJsonData[key]

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
  const filteredQuestions = filterFaqQuestions(
    faqJsonData,
    categories,
    filteringProperty
  )

  return (
    <Root>
      <StyledContentWrapper>
        <StyledContentTextWrapper>
          {title && (
            <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
          )}
          {cta && <Button href={cta.URL}>{cta.Label}</Button>}
        </StyledContentTextWrapper>
        <StyledFaqtWrapper>
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
        </StyledFaqtWrapper>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  overflow: hidden;
`

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto;
    position: relative;
    padding: 0rem 1.5rem 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  `}
`

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 2.5rem;
    max-width: 20rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.75rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    padding-left: 2rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 0;
    }
  `}
`

const StyledFaqtWrapper = styled.div`
  margin-top: 2rem;
`

const StyledAccordion = styled.details`
  ${({ theme }) => css`
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: solid 1px ${theme.colors.black}20;

    summary {
      font-size: ${theme.fonts.sizes['xl']};
      font-weight: ${theme.fonts.weights.bold};
      display: block;
      padding-right 2rem;
      position: relative;
    }

    summary::after {
      content: url('${arrowUrl.src}');
      right: 2rem;
      top: 50%;
      position: absolute;
      transform: translateY(-50%);
      line-height: 0;
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
    }
  `}
`
