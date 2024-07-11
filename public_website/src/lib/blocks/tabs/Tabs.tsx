import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import Tab from './Tab'
import TabPanel from './TabPannel'
import { TabImageTextProps, TabPushGreyProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

const Tabs = (props: TabImageTextProps | TabPushGreyProps) => {
  const { tab, children } = props
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const handleClick = (index: number): void => {
    setSelectedTab(index)
  }

  const handleNextTab = (
    firstTabInRound: number,
    nextTab: number,
    lastTabInRound: number
  ) => {
    const tabToSelect =
      selectedTab === lastTabInRound ? firstTabInRound : nextTab
    setSelectedTab(tabToSelect)
  }
  const handleKeyPress = (event: { key: string }): void => {
    const tabCount = Object.keys(tab).length

    if (event.key === 'ArrowLeft') {
      const last = tabCount
      const next = selectedTab - 1
      handleNextTab(last, next, 1)
    }
    if (event.key === 'ArrowRight') {
      const first = 1
      const next = selectedTab + 1
      handleNextTab(first, next, tabCount)
    }
  }
  const renderChildrenWithProps = (
    child: ReactNode,
    props: (Partial<unknown> & React.Attributes) | undefined
  ) => {
    return React.cloneElement(child as React.ReactElement, props)
  }
  const tabPanels = useMemo(() => {
    return tab?.map((item, index: number) => (
      <TabPanel
        key={item.id}
        tabId={`TabPanel_${index}`}
        tabIndex={index}
        selectedTab={selectedTab}>
        {renderChildrenWithProps(children, { ...item.block })}
      </TabPanel>
    ))
  }, [tab, children, selectedTab])

  return (
    <React.Fragment>
      <ContentWrapper>
        <StyledTabUl
          role="tablist"
          className="tablist switcher"
          aria-label="Cat tabs"
          onKeyDown={handleKeyPress}>
          {tab?.map((item, index: number) => {
            return (
              <Tab
                key={item.id}
                tabPanelId="firstTabPanel"
                index={index}
                handleChange={handleClick}
                selectedTab={selectedTab}
                title={item.title}
              />
            )
          })}
        </StyledTabUl>
      </ContentWrapper>
      {tabPanels}
    </React.Fragment>
  )
}

export default Tabs

const StyledTabUl = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
`
