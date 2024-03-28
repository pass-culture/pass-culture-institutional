import React from 'react'

interface HeaderProps {
  Title: string
  Text?: string
  Surtitle?: string
}

export function Headertest(props: HeaderProps) {
  return (
    <div data-testid="header">
      Header Title: {props.Title}
      Text: {props.Text}
      Surtitle: {props.Surtitle}
    </div>
  )
}
