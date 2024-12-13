import { createContext } from 'react'

import { BreadcrumbDataProps } from '@/types/props'

type BreadcrumbContextData = BreadcrumbDataProps

export const BreadcrumbContext = createContext<BreadcrumbContextData | null>(
  null
)
