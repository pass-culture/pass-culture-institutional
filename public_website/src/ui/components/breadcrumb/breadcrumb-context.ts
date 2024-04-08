import { createContext } from 'react'

import { HeaderProps } from '../header/Header'

type BreadcrumbContextData = Pick<HeaderProps, 'aboutItems' | 'targetItems'>

export const BreadcrumbContext = createContext<BreadcrumbContextData | null>(
  null
)
