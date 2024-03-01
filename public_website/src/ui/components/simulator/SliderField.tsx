import React, { useCallback } from 'react'
import { default as BaseSlider } from 'rc-slider'
import type { AriaValueFormat } from 'rc-slider/lib/interface'
import styled from 'styled-components'

import 'rc-slider/assets/index.css'
import { Label } from './Label'
import selectArrow from './select-arrow.svg'

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

      {/* TODO: make sure this is accessible */}
      <Slider
        ariaLabelledByForHandle="question-field-label"
        min={14}
        max={19}
        step={1}
        marks={{
          '14': answers[0],
          '15': answers[1],
          '16': answers[2],
          '17': answers[3],
          '18': answers[4],
          '19': answers[5],
        }}
        included={false}
        ariaValueTextFormatterForHandle={valueTextFormatter}
        value={(answer ?? 0) + 14}
        onChange={handleChange}
      />

      {/* TODO: switch to select input on mobile */}
      <Select
        id="question-field"
        value={answer}
        onChange={(e) => onChange(Number(e.target.value))}>
        {answers.map((a, i) => (
          <option key={a} value={i}>
            {answers[i]}
          </option>
        ))}
      </Select>
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
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.29333359003067017px;
    color: ${({ theme }) => theme.colors.black};

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 50%;
      transform: translateY(-1rem);

      height: 1rem;
      width: 1px;

      background-color: #dad1ec;
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

    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}88;
    }

    &.rc-slider-handle-dragging {
      box-shadow: 0 0 0 5px ${({ theme }) => theme.colors.primary}88;
      border-color: ${({ theme }) => theme.colors.white};
    }
  }
`

const Select = styled.select`
  padding: 1.25rem 1.875rem;

  font-size: 15px;
  font-weight: 700;
  line-height: 30px;

  appearance: none;
  border: none;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  background-image: url(${selectArrow.src});
  background-repeat: no-repeat;
  background-position: right 2rem center;

  display: none;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: initial;
  }
`
