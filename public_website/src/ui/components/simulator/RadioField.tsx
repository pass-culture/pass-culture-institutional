import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { OutlinedText } from '../OutlinedText'
import { Label } from './Label'

interface RadioFieldProps {
  title: string
  answers: { answer: string; emoji?: string | null }[]

  answer?: number
  onChange: (answer: number) => void
}

export function RadioField(props: RadioFieldProps) {
  const fieldsetRef = useRef<HTMLFieldSetElement>(null)

  // On Safari (17.4), the fieldset height is glitched. This forces
  // the recalculation of the height. Setting it "normally" using stylesheets doesnt work.
  useEffect(() => {
    setTimeout(() => {
      fieldsetRef.current!.style.height = 'min-content'
    }, 1)
  }, [])

  return (
    <Fieldset ref={fieldsetRef}>
      <Label as="legend">{props.title}</Label>

      <Choices>
        {props.answers.map(({ answer, emoji }, i) => (
          <div key={answer}>
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
              <EmojiContainer>
                <OutlinedText aria-hidden="true">{emoji}</OutlinedText>
              </EmojiContainer>
              {answer}
            </RadioLabel>
          </div>
        ))}
      </Choices>
    </Fieldset>
  )
}

const Fieldset = styled.fieldset`
  ${Label} {
    width: 100%;
    margin-bottom: 2.5rem;

    @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
      margin-bottom: 1.5rem;
    }
  }
`

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const EmojiContainer = styled.span`
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary}1A; // 10% opacity
`

const RadioLabel = styled.label`
  font-weight: ${({ theme }) => theme.fonts.sizes.m};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.625rem 1.25rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.lightGray};
  border: 1px solid transparent;

  input:checked + & {
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};

    ${EmojiContainer} {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  input:focus-visible + & {
    outline: 2px solid
      var(--outline-color, ${({ theme }) => theme.colors.primary});
    outline-offset: 2px;
  }
`
