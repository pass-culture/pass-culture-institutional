import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { Button } from '@/ui/components/button/Button'
import { ArrowDown } from '@/ui/components/icons/ArrowDown'
import { Cross } from '@/ui/components/icons/Cross'
import { Plus } from '@/ui/components/icons/Plus'
import { Tick } from '@/ui/components/icons/Tick'

export type Filter = {
  filtre: string
  value: string[]
}

type FilterChangeHandler = (name: string, value: string[]) => void

type FiltersProps = {
  className?: string
  filtres?: Filter[]
  onFilterChange?: FilterChangeHandler
}

type FilterValues = { [key: string]: string[] }
type FilterClicked = { [key: string]: number }

export function FilterContainer({
  className,
  filtres,
  onFilterChange,
}: FiltersProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [numberOfFilters, setNumberOfFilters] = useState<number>(0)

  //USESTATE FOR EACH FILTER
  const initialState: FilterValues = {}
  const numberOfFilterss: FilterClicked = {}

  filtres?.forEach((filtre) => {
    initialState[filtre.filtre] = ['']
    numberOfFilterss[filtre.filtre] = 0
  })
  const [filterValues, setFilterValues] = useState<FilterValues>(initialState)
  const [clickedFilters, setClickedFilters] =
    useState<FilterClicked>(numberOfFilterss)

  const newFilterValues: FilterValues = {}
  useEffect(() => {
    filtres?.forEach((filtre) => {
      newFilterValues[filtre.filtre] = ['']
    })
    setFilterValues(newFilterValues)
  }, [filtres])

  //UPDATE THE SELECTED FILTERS
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    checkValue(name, value)
  }
  //UPDATE THE SELECTED FILTERS
  const handleDetailChange = (filter: string, value: string) => {
    checkValue(filter, value)
  }

  //CHECK IF THE VALUE IS ALREADY IN THE ARRAY
  const checkValue = (name: string, value: string) => {
    // Dynamically access the state variable based on the filter name
    const filterState = filterValues[name]
    const newFilterValues = { ...filterValues }

    // Check if the value is '',  and reset the filter values accordingly
    if (value === '') {
      // Set the filter state to contain only ''
      newFilterValues[name] = ['']
    } else {
      // Check if the value is already present in the state for the current filter
      if (filterState?.includes(value)) {
        //  If value is present i remove it
        newFilterValues[name] = filterState.filter((item) => item !== value)
      } else {
        // if value is not present i add it

        if (filterState && filterState[0] !== '') {
          newFilterValues[name] = [...filterState, value]
        } else if (filterState && filterState[0] === '') {
          //remove the empty value
          newFilterValues[name] = [value]
        }
      }
    }

    // Update the state with the new values
    setFilterValues(newFilterValues)
    if (onFilterChange && newFilterValues) {
      onFilterChange(name, newFilterValues[name] ?? [])
      const totalLength = Object.values(newFilterValues).reduce((sum, arr) => {
        const nonEmptyValues = arr.filter((value) => value !== '')
        return sum + nonEmptyValues.length
      }, 0)

      const updatedClickedFilters = { ...clickedFilters }
      updatedClickedFilters[name] = (newFilterValues[name] ?? []).filter(
        (item) => item !== ''
      ).length
      setClickedFilters(updatedClickedFilters)
      setNumberOfFilters(totalLength)
    }
  }

  return (
    <Root className={className}>
      <StyledMobileFilterLabel>
        <p>Filtres</p>
        <StyledRoundDiv>{numberOfFilters}</StyledRoundDiv>
      </StyledMobileFilterLabel>
      {filtres?.map((filtre) => (
        <div key={filtre.filtre}>
          <StyledSelect
            name={filtre.filtre}
            aria-label={filtre.filtre}
            onChange={handleFilterChange}>
            <option value="">{filtre.filtre}</option>
            <option value="">Tout</option>
            {filtre.value.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </StyledSelect>

          {filterValues[filtre.filtre]?.map((value) => {
            if (value !== '') {
              return (
                <StyledSelectButton
                  key={value}
                  onClick={() => {
                    handleDetailChange(filtre.filtre, value)
                  }}>
                  {value} <Cross />
                </StyledSelectButton>
              )
            }
            return null
          })}
        </div>
      ))}

      <StyledButton
        onClick={() => {
          setIsVisible(!isVisible)
        }}>
        <Plus />
      </StyledButton>

      <StyledMobileSelectWrapper
        style={{ display: isVisible ? 'flex' : 'none' }}>
        <StyledMobileContainer>
          <StyledMobileSelectHeader>
            <p>Filtres</p>

            <StyledButton
              onClick={() => {
                setIsVisible(!isVisible)
              }}>
              <Plus />
            </StyledButton>
          </StyledMobileSelectHeader>
          <StyleSelectContent>
            {filtres?.map((filtre) => (
              <details key={filtre.filtre} open={false}>
                <summary>
                  {filtre.filtre}
                  <div className="wrapper">
                    <StyledRoundDiv>
                      {clickedFilters[filtre.filtre]}
                    </StyledRoundDiv>
                    <ArrowDown />
                  </div>
                </summary>
                <button
                  className={
                    filterValues[filtre.filtre]?.includes('') ? 'active' : ''
                  }
                  onClick={() => handleDetailChange(filtre.filtre, '')}>
                  <Tick />
                  Tout
                </button>
                {filtre.value.map((value) => (
                  <button
                    className={
                      filterValues[filtre.filtre]?.includes(value)
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleDetailChange(filtre.filtre, value)}
                    key={value}>
                    <Tick />
                    {value}
                  </button>
                ))}
              </details>
            ))}
          </StyleSelectContent>
        </StyledMobileContainer>
      </StyledMobileSelectWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    padding: 1rem 1.5rem;
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    background-color: ${theme.colors.lightBlue};
    border-radius: 0.625rem;
    margin-top: 4rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      justify-content: space-between;
    }
  `}
`

const StyledSelect = styled.select`
  ${({ theme }) => css`
    padding: 0 2rem 0 2rem;
    margin-right: 2rem;

    min-height: 50px;

    display: flex;
    align-items: center;

    border: none;
    border-left: solid 1px #00000020;

    background-color: transparent;
    font-weight: ${theme.fonts.weights.bold};
    text-transform: uppercase;

    &::after {
      color: red;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`
const StyledButton = styled(Button)`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 0;

      min-height: 50px;

      display: flex;
      align-items: center;
      background: transparent;
    }
  `}
`

const StyledMobileSelectWrapper = styled.div`
  ${({ theme }) => css`
    display: none;
    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #00000080;
      z-index: 10;
      // display: flex;
      align-items: flex-end;
      display: none;
    }
  `}
`
const StyledMobileContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-height: 80%;
    min-height: 80%;

    background-color: ${theme.colors.lightBlue};
    border-radius: 0.625rem 0.625rem 0 0;

    display: flex;
    flex-direction: column;
  `}
`
const StyledMobileSelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.625rem 0.625rem 0 0;
  border-bottom: solid 1px #00000020;
  min-height: 80px;
  padding: 0 2rem;

  svg {
    transform: rotate(45deg);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`
const StyleSelectContent = styled.div`
  ${({ theme }) => css`
    padding: 2rem 2rem;
    height: 100%;
    flex-grow: 1;
    overflow-y: scroll;
    details {
      display: flex;
      flex-direction: column;

      button {
        margin: 1.5rem 0;
        font-weight: ${theme.fonts.weights.medium};
        display: flex;
        align-items: center;
        gap: 1rem;
        svg {
          visibility: hidden;
        }
      }
      .active {
        font-weight: ${theme.fonts.weights.bold};
        color: ${theme.colors.secondary};

        svg {
          visibility: visible;
        }
      }
      svg {
        transform: rotate(180deg);
      }
    }

    summary {
      font-weight: ${theme.fonts.weights.bold};
      text-transform: uppercase;
      margin-bottom: 1rem;

      display: flex;
      align-items: center;
      gap: 1rem;

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-grow: 1;
      }
    }

    details[open] {
      svg {
        transform: rotate(0deg);
      }
    }
  `}
`

const StyledMobileFilterLabel = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-right: 5rem;
    padding-left: 1rem;
    gap: 1rem;

    p {
      height: fit-content;
    }

    div {
      display: none;
      @media (width < ${theme.mediaQueries.mobile}) {
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        font-weight: ${theme.fonts.weights.medium};
        padding: 0.5rem;
        border-radius: 50%;

        height: 1rem;
        width: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `}
`

const StyledRoundDiv = styled.div`
  ${({ theme }) => css`
    display: none;
    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.white};
      font-weight: ${theme.fonts.weights.medium};
      padding: 0.5rem;
      border-radius: 50%;

      height: 1rem;
      width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`
const StyledSelectButton = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    padding: 0.5rem 1rem;

    display: flex;
    align-items: center;
    gap: 1rem;

    border-radius: 1.25rem;
    margin-top: 1rem;
    margin-left: 1rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`
