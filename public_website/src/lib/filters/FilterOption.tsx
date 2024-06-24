import React, { Dispatch, SetStateAction } from 'react'

import { Filter, FilterContainer } from '../blocks/FilterContainer'
import { setFilter } from '@/utils/filterOptions'

const FilterOption = (props: {
  setCategory: Dispatch<SetStateAction<string[]>>
  originalCategory: string[]
  setLocalisation: Dispatch<SetStateAction<string[]>>
  originalLocalisation: string[]
  data: Filter[] | undefined
}) => {
  const {
    setCategory,
    originalCategory,
    setLocalisation,
    originalLocalisation,
    data,
  } = props

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setFilter(setCategory, originalCategory, value)
        break
      case 'Localisation':
        setFilter(setLocalisation, originalLocalisation, value)
        break
      default:
        break
    }
  }

  return <FilterContainer filtres={data} onFilterChange={handleFilterChange} />
}

export default FilterOption
