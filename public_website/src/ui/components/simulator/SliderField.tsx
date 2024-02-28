import React, { useCallback } from 'react'
import { default as BaseSlider } from 'rc-slider'
import type { AriaValueFormat } from 'rc-slider/lib/interface'
import styled from 'styled-components'

import 'rc-slider/assets/index.css'
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
      <Label htmlFor="question-field">{title}</Label>

      {/* TODO: make sure this is accessible */}
      <Slider
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
  /* rc-slider styles overrides */
  .rc-slider-mark-text:last-of-type {
    width: max-content;
    transform: translateX(-100%) !important;
  }

  /* TODO: adjust slider styles */
`
