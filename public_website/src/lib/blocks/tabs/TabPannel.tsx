import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface TabPanelProps {
  tabId: string
  tabIndex: number
  selectedTab: number
  children: ReactNode
}

const TabPanel = (props: TabPanelProps) => {
  const { children, tabId, tabIndex, selectedTab } = props

  return (
    <StyledTabPanelSection
      $isHidden={selectedTab !== tabIndex}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={tabIndex}>
      {children}
    </StyledTabPanelSection>
  )
}

export default TabPanel
const StyledTabPanelSection = styled.section<{
  $isHidden?: boolean
}>`
  margin: 0.5rem;
  cursor: pointer;
  ${(p) => (p.$isHidden ? 'display:none' : 'display:block')}
`
