import { createContext } from 'react'

import { HeaderMenuProps } from '@/types/props'

type BreadcrumbContextData = Pick<HeaderMenuProps, 'aboutItems' | 'targetItems'>

export const BreadcrumbContext = createContext<BreadcrumbContextData | null>(
  null
)
