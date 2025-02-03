import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BaseSlider from 'rc-slider'
import styled, { css } from 'styled-components'

import 'rc-slider/assets/index.css'
import { Check } from '../icons/Check'
import { ChevronDown } from '../icons/ChevronDown'
import { Label } from './Label'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CustomSelect, CustomSelectButton, WrapperChevron } from '@/theme/style'
import { parseText } from '@/utils/parseText'

/**
 * Generic component allowing selection of an option via a slider and a dropdown menu.
 * The minimum slider value is defined by the `minValue` prop (default is 0),
 * and the `options` array defines all available choices.
 */
interface SliderFieldProps {
  title: string
  /** Array of options (example: ['17 years', '18 years', '19 years']) */
  options: string[]
  /**
   * Allows external control of the component.
   * If not defined, an internal value is used (starting at 0, which is the first element of the array).
   */
  selectedIndex?: number
  /**
   * Callback triggered on change.
   * The index within the `options` array is passed as an argument.
   */
  onChange: (selectedIndex: number) => void
}

export function SliderField({
  title,
  options,
  selectedIndex,
  onChange,
}: SliderFieldProps) {
  const [localIndex, setLocalIndex] = useState<number>(selectedIndex ?? 0)
  const currentIndex = selectedIndex !== undefined ? selectedIndex : localIndex

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  const [isClient, setIsClient] = useState<boolean>(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = useCallback(
    (value: number | number[]) => {
      if (typeof value !== 'number') {
        throw new Error('Unexpected slider value type')
      }
      if (value >= 0 && value < options.length) {
        if (selectedIndex === undefined) {
          setLocalIndex(value)
        }
        onChange(value)
      }
      setDropdownOpen(false)
    },
    [options, onChange, selectedIndex]
  )

  const marks = useMemo(() => {
    const computedMarks: { [key: number]: JSX.Element } = {}
    options.forEach((option, index) => {
      computedMarks[index] = (
        <span aria-label={parseText(option).accessibilityLabel}>
          {parseText(option).processedText}
        </span>
      )
    })
    return computedMarks
  }, [options])

  const memoizeUL = useMemo(() => {
    return (
      <ul id="question-field" ref={dropdownRef} className="select-dropdown">
        <Separator />
        {options.map((option, index) => (
          <span
            key={option}
            aria-selected="false"
            role="option"
            aria-hidden="true"
            tabIndex={-1}
            onClick={(): void => handleChange(index)}>
            <li aria-label={parseText(option).accessibilityLabel}>
              <span
                aria-hidden="true"
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                }}>
                <Check />
              </span>
              {parseText(option).processedText}
            </li>
          </span>
        ))}
      </ul>
    )
  }, [currentIndex, options, handleChange])

  const currentLabel = options[currentIndex] ?? ''

  return (
    <Field>
      <Label id="labeled-slider-label" htmlFor="labeled-slider">
        {title}
      </Label>
      <Slider
        ariaLabelledByForHandle="labeled-slider-label"
        step={1}
        marks={marks}
        min={0}
        max={options.length - 1}
        included
        ariaValueTextFormatterForHandle={(value) => options[value] ?? ''}
        value={currentIndex}
        onChange={handleChange}
      />
      <SelectWrapper $isOpen={dropdownOpen}>
        {isClient && (
          <CustomSelect
            onMouseLeave={(): void => setDropdownOpen(false)}
            $isInBreadcrumb>
            <CustomSelectButton
              role="combobox"
              onClick={(): void => setDropdownOpen(true)}
              $isInBreadcrumb
              aria-labelledby="labeled-slider-dropdown-label"
              aria-label="Sélectionnez une option"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-controls="select-dropdown">
              {currentLabel}
              <WrapperChevron $isOpen={dropdownOpen}>
                <ChevronDown />
              </WrapperChevron>
            </CustomSelectButton>
            <BlockRendererWithCondition condition={dropdownOpen}>
              <span
                id="select-dropdown"
                role="listbox"
                aria-label="Liste d'options">
                {memoizeUL}
              </span>
            </BlockRendererWithCondition>
          </CustomSelect>
        )}
        <SelectIcon $isOpen={dropdownOpen} />
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

const Separator = styled.div`
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
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
    background-color: ${({ theme }) => theme.colors.secondary};
    height: 0.5rem;
  }
  .rc-slider-handle {
    background-color: ${({ theme }) => theme.colors.secondary};
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

const SelectWrapper = styled.div<{ $isOpen: boolean }>`
  ${({ theme, $isOpen }) => css`
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
    .select-dropdown {
      width: 100%;
      box-sizing: border-box;
      top: 100%;
      box-shadow: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      font-weight: bold;
    }

    [role='combobox'] {
      padding: 1.25rem 1.875rem;
      background-color: ${theme.colors.lightGray};
      font-weight: ${theme.fonts.weights.bold};
      font-size: ${theme.fonts.sizes.s};
      border-top-left-radius: 1.25rem;
      border-top-right-radius: 1.25rem;
      width: 100%;
      min-height: auto;
      box-sizing: border-box;
      ${$isOpen
        ? 'border-bottom-left-radius: 0;'
        : 'border-bottom-left-radius: 1.25rem;'}
      ${$isOpen
        ? 'border-bottom-right-radius: 0;'
        : 'border-bottom-right-radius: 1.25rem;'}
      span:first-child {
        display: none;
      }
    }
  `}
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
