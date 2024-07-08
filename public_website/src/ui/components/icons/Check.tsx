import React, { HTMLAttributes } from 'react'

import { Icon } from './Icon'

export function Check(props: HTMLAttributes<SVGElement>) {
  return (
    <Icon
      {...props}
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7L5.5 11.5L14 1"
        stroke="#320096"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}
