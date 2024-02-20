import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'

interface QuestionProps {
  onSubmit: (response: number) => void
}

export function Question(props: QuestionProps) {
  const [response, setResponse] = useState(0)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit(response)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="age-field">Quel âge as-tu ?</Label>
        {/* TODO: slider https://slider-react-component.vercel.app/demo/marks */}
        <select
          id="age-field"
          value={response}
          onChange={(e) => setResponse(Number(e.target.value))}>
          <option value={0}>- de 15 ans</option>
          <option value={1}>15 ans</option>
          <option value={2}>16 ans</option>
          <option value={3}>17 ans</option>
          <option value={4}>18 ans</option>
          <option value={5}>+ de 18 ans</option>
        </select>
      </Field>
      <SubmitContainer>
        <Button>Suivant</Button>
      </SubmitContainer>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
  align-items: stretch;
  padding: 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: 0 2rem;
    gap: 1.5rem;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    gap: 1.5rem;
  }
`

const Label = styled.label`
  display: block;
  font-size: 26px;
  font-weight: 700;

  border-bottom: 1px solid #94008c33;
  padding-bottom: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding-bottom: 1.5rem;
  }
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: end;
`
