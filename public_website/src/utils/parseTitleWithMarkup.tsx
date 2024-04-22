import React from 'react'

export const parseTitleWithMarkup = (
  text: string
): { textWithMarkup: JSX.Element[]; accessibilityLabel: string } => {
  const parts = text.split(/\*\*/)
  const accessibilityLabel = parts.join('')

  const textWithMarkup = parts.map((part, index) => {
    if (index % 2 === 1) {
      return <mark key={index}>{part}</mark>
    } else {
      return <span key={index}>{part}</span>
    }
  })

  return { textWithMarkup, accessibilityLabel }
}
