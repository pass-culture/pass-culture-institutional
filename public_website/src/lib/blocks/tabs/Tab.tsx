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
    margin-left: 0.625rem;
    margin-right: 0.625rem;
    padding: 2rem 1rem;
    border: none;
    border-bottom: 0.0625rem solid transparent;
    font-size: ${theme.fonts.sizes['xl']};
    font-weight: ${theme.fonts.weights.bold};
    text-transform: uppercase;
    cursor: pointer;
    color: ${theme.colors.black};
  `}
`
