import { createContext } from 'react'

import {
  ComponentCommonLink,
  ComponentHeaderNavigationItems,
} from '@/generated/graphql'

type BreadcrumbContextData = {
  targetItems: ComponentHeaderNavigationItems[]
  aboutItems: ComponentHeaderNavigationItems[]
  footerItems: ComponentCommonLink[]
}

export const BreadcrumbContext = createContext<BreadcrumbContextData | null>(
  null
)
