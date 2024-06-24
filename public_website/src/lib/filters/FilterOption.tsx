import React, { Dispatch, SetStateAction } from 'react'

import { Filter, FilterContainer } from '../blocks/FilterContainer'
import { setFilter } from '@/utils/filterOptions'

const FilterOption = (props: {
  setCategory?: Dispatch<SetStateAction<string[]>>
  originalCategory?: string[]
  setLocalisation?: Dispatch<SetStateAction<string[]>>
  originalLocalisation: string[]
  setSecteur?: Dispatch<SetStateAction<string[]>>
  originalSecteur?: string[]
  data: Filter[] | undefined
}) => {
  const {
    setCategory,
    originalCategory,
    setLocalisation,
    originalLocalisation,
    setSecteur,
    originalSecteur,
    data,
  } = props

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        if (setCategory && originalCategory)
          setFilter(setCategory, originalCategory, value)
        break
      case 'Localisation':
        if (setLocalisation && originalLocalisation)
          setFilter(setLocalisation, originalLocalisation, value)
        break
      case "Secteur d'activités":
        if (setSecteur && originalSecteur)
          setFilter(setSecteur, originalSecteur, value)
        break
      default:
        break
    }
  }

  return <FilterContainer filtres={data} onFilterChange={handleFilterChange} />
}

export default FilterOption
