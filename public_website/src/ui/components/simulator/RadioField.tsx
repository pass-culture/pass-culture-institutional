import React from 'react'
import styled from 'styled-components'

import { SimulatorQuestion } from './data'
import { Label } from './Label'

interface RadioFieldProps {
  question: SimulatorQuestion
  answer?: number
  onChange: (answer: number) => void
}

export function RadioField(props: RadioFieldProps) {
  return (
    <Fieldset>
      <Label as="legend">{props.question.title}</Label>

      <Choices>
        {props.question.answers.map((a, i) => (
          <Choice key={a.title}>
            <input
              className="visually-hidden"
              type="radio"
              name="answer"
              value={i}
              id={'answer-' + i}
              checked={props.answer === i}
              onChange={(e) => props.onChange(Number(e.target.value))}
            />
            <RadioLabel htmlFor={'answer-' + i}>
              {/* TODO: add outline */}
              <EmojiContainer>🇫🇷</EmojiContainer>
              {a.title}
            </RadioLabel>
          </Choice>
        ))}
      </Choices>
    </Fieldset>
  )
}

const Fieldset = styled.fieldset`
  ${Label} {
    margin-bottom: 2.5rem;

    @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
      margin-bottom: 1.5rem;
    }
  }
`

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`

const EmojiContainer = styled.span`
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #dbd6e9;
`

const RadioLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.625rem 1.25rem;
  border-radius: 1.25rem;
  background: #f7f5fb;
  border: 1px solid transparent;

  input:checked + & {
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};

    ${EmojiContainer} {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const Choice = styled.div``
