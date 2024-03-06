import React, { useCallback } from 'react'
import { default as BaseSlider } from 'rc-slider'
import type { AriaValueFormat } from 'rc-slider/lib/interface'
import styled from 'styled-components'

import 'rc-slider/assets/index.css'
import { ChevronDown } from '../icons/ChevronDown'
import { Label } from './Label'

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
      onChange(value - 14)
    },
    [onChange]
  )

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
          '14': <span dangerouslySetInnerHTML={{ __html: answers[0]! }} />,
          '15': <span dangerouslySetInnerHTML={{ __html: answers[1]! }} />,
          '16': <span dangerouslySetInnerHTML={{ __html: answers[2]! }} />,
          '17': <span dangerouslySetInnerHTML={{ __html: answers[3]! }} />,
          '18': <span dangerouslySetInnerHTML={{ __html: answers[4]! }} />,
          '19': <span dangerouslySetInnerHTML={{ __html: answers[5]! }} />,
        }}
        included={false}
        ariaValueTextFormatterForHandle={valueTextFormatter}
        value={(answer ?? 0) + 14}
        onChange={handleChange}
      />
      <SelectWrapper>
        <Select
          id="question-field"
          value={answer}
          onChange={(e) => onChange(Number(e.target.value))}>
          {answers.map((a, i) => (
            <option
              key={a}
              value={i}
              dangerouslySetInnerHTML={{ __html: a! }}
            />
          ))}
        </Select>
        <SelectIcon />
      </SelectWrapper>
    </Field>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    gap: 1.5rem;
  }
`

const Slider = styled(BaseSlider)`
  padding-bottom: 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
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

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: initial;
  }
`

const Select = styled.select`
  padding: 1.25rem 1.875rem;

  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  line-height: 2;

  appearance: none;
  border: none;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: 100%;
`

const SelectIcon = styled(ChevronDown)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
`
