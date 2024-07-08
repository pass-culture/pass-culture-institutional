import React from 'react'
import styled, { css } from 'styled-components'

interface TabProps {
  title: string
  selectedTab: number
  index: number
  tabPanelId: string
  handleChange: (index: number) => void
}

const Tab = (props: TabProps) => {
  const { title, selectedTab, index, tabPanelId, handleChange } = props
  const handleClick = (): void => handleChange(index)
  return (
    <StyledTabLi role="presentation">
      <StyledTabButton
        role="tab"
        aria-selected={selectedTab === index}
        aria-controls={tabPanelId}
        tabIndex={selectedTab === index ? 0 : -1}
        onClick={handleClick}>
        {title}
      </StyledTabButton>
    </StyledTabLi>
  )
}

export default Tab

const StyledTabLi = styled.li`
  ${({ theme }) => css`
    list-style: none;
    & > [aria-selected='true'] {
      border-bottom-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
    }
  `}
`
const StyledTabButton = styled.button`
  ${({ theme }) => css`
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    border-bottom: 0.0625rem solid transparent;
    font-size: ${theme.fonts.sizes['xl']};
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  `}
`
