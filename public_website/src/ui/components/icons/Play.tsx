import React from 'react'

import { Icon } from './Icon'

export function Play({ className }: { className?: string }) {
  return (
    <Icon
      className={className}
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="44" cy="44" r="44" fill="white" />
      <path
        d="M33.8457 57.3859V32.2591C33.8457 30.7139 35.5234 29.7524 36.8567 30.5335L58.0161 42.9293C59.3259 43.6967 59.3369 45.5861 58.0362 46.3687L36.8768 59.0997C35.5438 59.9017 33.8457 58.9416 33.8457 57.3859Z"
        fill="#320096"
      />
    </Icon>
  )
}
