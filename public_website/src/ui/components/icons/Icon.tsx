import React, { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  label?: string
  children: React.ReactNode
}

export function Icon({ label, children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden={!label}
      aria-label={label}
      role={label ? 'img' : undefined} //NOSONAR (typescript:typescript:S6819) `role="img"` is valid on `<svg>` element
      {...props}>
      {children}
    </svg>
  )
}
