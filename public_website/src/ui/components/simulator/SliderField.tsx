import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { default as BaseSlider } from 'rc-slider'
import type { AriaValueFormat } from 'rc-slider/lib/interface'
import styled, { css } from 'styled-components'

import 'rc-slider/assets/index.css'
import { Check } from '../icons/Check'
import { ChevronDown } from '../icons/ChevronDown'
import { Label } from './Label'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CustomSelect, CustomSelectButton, WrapperChevron } from '@/theme/style'
import { parseText } from '@/utils/parseText'

interface SliderFieldProps {
  title: string
  answers: string[]

  answer?: number
  onChange: (answer: number) => void
}

export function SliderField({
  answers,
  onChange,
  title,
  answer,
}: SliderFieldProps) {
  const [isClient, setIsClient] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<number>(-1)
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const [age, setAge] = useState<string>('-15 ans')
  const valueTextFormatter: AriaValueFormat = useCallback(
    (value: number) => {
      if (value <= 14) {
        return answers[0]!
      }

      if (value >= 19) {
        return answers[5]!
      }

      value -= 14

      return answers[value]!
    },
    [answers]
  )

  const handleChange = useCallback(
    (value: number | number[]) => {
      if (typeof value !== 'number') {
        throw new Error('Unexpected slider value type')
      }
      if (value - 14 < 0) {
        if (answers[value]) {
          setAge(answers[value] as string)
          onChange(value)
        }
      }
      if (answers[value - 14]) {
        setAge(answers[value - 14] as string)
        onChange(value - 14)
      }

      setIsOpen(-1)
    },
    [answers, onChange]
  )

  const memoizeUL = useMemo(() => {
    return (
      <ul id="question-field" ref={dropdownRef} className="select-dropdown">
        {answers.map((a: string, i: number) => (
          <span
            aria-selected="false"
            role="option"
            aria-hidden="true"
            tabIndex={-1}
            onClick={(): void => handleChange(i)}
            key={a}>
            <li aria-label={parseText(a).accessibilityLabel}>
              <span
                aria-hidden="true"
                style={{
                  opacity: a === age ? 1 : 0,
                }}>
                <Check />
              </span>
              {parseText(a).processedText}
            </li>
          </span>
        ))}
      </ul>
    )
  }, [age, answers, handleChange])

  const checkIfOpen = useCallback(
    (index: number) => {
      return isOpen === index
    },
    [isOpen]
  )

  const openDropdown = useCallback((index: number) => {
    setIsOpen(index)
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Field>
      <Label id="question-field-label" htmlFor="question-field">
        {title}
      </Label>
      <Slider
        ariaLabelledByForHandle="question-field-label"
        min={14}
        max={19}
        step={1}
        marks={{
          '14': (
            <span aria-label={parseText(answers[0]!).accessibilityLabel}>
              {parseText(answers[0]!).processedText}
            </span>
          ),
          '15': (
            <span aria-label={parseText(answers[1]!).accessibilityLabel}>
              {parseText(answers[1]!).processedText}
            </span>
          ),
          '16': (
            <span aria-label={parseText(answers[2]!).accessibilityLabel}>
              {parseText(answers[2]!).processedText}
            </span>
          ),
          '17': (
            <span aria-label={parseText(answers[3]!).accessibilityLabel}>
              {parseText(answers[3]!).processedText}
            </span>
          ),
          '18': (
            <span aria-label={parseText(answers[4]!).accessibilityLabel}>
              {parseText(answers[4]!).processedText}
            </span>
          ),
          '19': (
            <span aria-label={parseText(answers[5]!).accessibilityLabel}>
              {parseText(answers[5]!).processedText}
            </span>
          ),
        }}
        included
        ariaValueTextFormatterForHandle={valueTextFormatter}
        value={(answer ?? 0) + 14}
        onChange={handleChange}
      />
      <SelectWrapper>
        {isClient && (
          <CustomSelect
            onMouseLeave={(): void => setIsOpen(-1)}
            $isInBreadcrumb>
            <CustomSelectButton
              role="combobox"
              onClick={(): void => {
                openDropdown(0)
              }}
              $isInBreadcrumb
              aria-labelledby="Naviguez"
              aria-label="Naviguez"
              aria-haspopup="listbox"
              aria-expanded={checkIfOpen(0)}
              aria-controls="select-dropdown">
              {age}
              <WrapperChevron $isOpen={checkIfOpen(0)}>
                <ChevronDown />
              </WrapperChevron>
            </CustomSelectButton>
            <BlockRendererWithCondition condition={checkIfOpen(0)}>
              <span id="select-dropdown" role="listbox" aria-label="Liste URL">
                {memoizeUL}
              </span>
            </BlockRendererWithCondition>
          </CustomSelect>
        )}
        <SelectIcon $isOpen={checkIfOpen(0)} />
      </SelectWrapper>
    </Field>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    gap: 1.5rem;
  }
`

const Slider = styled(BaseSlider)`
  padding-bottom: 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: none;
  }

  /* rc-slider styles overrides */

  .rc-slider-mark {
    top: 2.5rem;
  }

  .rc-slider-mark-text {
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: ${({ theme }) => theme.colors.black};

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 50%;
      transform: translateY(-1rem);

      height: 1rem;
      width: 1px;

      background-color: ${({ theme }) => theme.colors.primary};
      opacity: 0.1;
    }
    &:last-of-type {
      width: max-content;
      transform: translateX(-100%) !important;

      &::before {
        left: initial;
        right: 0;
      }
    }
    &:first-of-type {
      width: max-content;
      transform: translateX(0) !important;

      &::before {
        left: 0;
      }
    }
  }
  .rc-slider-dot {
    opacity: 0;
  }

  .rc-slider-rail {
    height: 0.5rem;
  }
  .rc-slider-track {
    background-color: ${({ theme }) => theme.colors.primary};
    height: 0.5rem;
  }
  .rc-slider-handle {
    background-color: ${({ theme }) => theme.colors.primary};
    width: 2rem;
    height: 2rem;
    margin-top: -0.6875rem;
    border: 0.25rem solid ${({ theme }) => theme.colors.white};
    opacity: 1;
    z-index: unset;

    &:focus-visible {
      box-shadow: 0 0 0 0.1875rem ${({ theme }) => theme.colors.primary}88;
    }

    &.rc-slider-handle-dragging {
      box-shadow: 0 0 0 0.3125rem ${({ theme }) => theme.colors.primary}88;
      border-color: ${({ theme }) => theme.colors.white};
    }
  }
`

const SelectWrapper = styled.div`
  position: relative;
  display: none;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: initial;
  }
  div:first-child {
    @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
      display: block;
    }
  }

  [role='combobox'] {
    padding: 1.25rem 1.875rem;
    background-color: ${({ theme }) => theme.colors.lightGray};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    font-size: ${({ theme }) => theme.fonts.sizes.s};
    border-radius: 1.25rem;
    width: 100%;
    min-height: auto;
    box-sizing: border-box;

    span:first-child {
      display: none;
    }
  }
`
const SelectIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  ${({ theme, $isOpen }) => css`
    position: absolute;
    top: 50%;
    right: 1rem;
    transition: all 0.3s ease-in-out;
    ${$isOpen
      ? 'transform:  translateY(-50%) rotate(180deg);'
      : 'translateY(-50%) transform: rotate(0deg);'}

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      right: 2.2rem;
    }
  `}
`
