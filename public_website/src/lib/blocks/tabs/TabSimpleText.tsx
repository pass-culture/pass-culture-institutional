import React, { useState } from 'react'
import styled from 'styled-components'

import { ImageText } from '../ImageText'
import Tab from './Tab'
import TabPanel from './TabPannel'
import { TabSimpleTextProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

const TabSimpleText = (props: TabSimpleTextProps) => {
  const { tab } = props
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
    // tabValues[tabToSelect].ref.current.focus()
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
      {tab?.map((item, index: number) => {
        return (
          <TabPanel
            key={item.id}
            tabId={`TabPanel_${index}`}
            tabIndex={index}
            selectedTab={selectedTab}>
            <ImageText {...item?.block} />
          </TabPanel>
        )
      })}
    </React.Fragment>
  )
}

export default TabSimpleText

const StyledTabUl = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
`
