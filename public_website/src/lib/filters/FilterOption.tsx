import React, { Dispatch, SetStateAction } from 'react'

import { Filter, FilterContainer } from '../blocks/FilterContainer'
import { Options } from '@/utils/filterbyAttributes'
import { setFilter } from '@/utils/filterOptions'

const FilterOption = (props: {
  setCategory?: Dispatch<SetStateAction<string[]>>
  originalCategory?: string[]
  setLocalisation?: Dispatch<SetStateAction<string[]>>
  originalLocalisation?: string[]
  setSecteur?: Dispatch<SetStateAction<string[]>>
  originalSecteur?: string[]
  setPartner?: Dispatch<SetStateAction<string[]>>
  originalPartner?: string[]
  data: Filter[] | undefined
}) => {
  const {
    setCategory,
    originalCategory,
    setLocalisation,
    originalLocalisation,
    setSecteur,
    originalSecteur,
    setPartner,
    originalPartner,
    data,
  } = props

  const handleFilterChange = (name: string, value: string[]): void => {
    switch (name) {
      case Options.Category:
        if (setCategory && originalCategory)
          setFilter(setCategory, originalCategory, value)
        break
      case Options.Localisation:
        if (setLocalisation && originalLocalisation)
          setFilter(setLocalisation, originalLocalisation, value)
        break
      case Options.Secteur:
        if (setSecteur && originalSecteur)
          setFilter(setSecteur, originalSecteur, value)
        break
      case Options.Partenariat:
        if (setPartner && originalPartner)
          setFilter(setPartner, originalPartner, value)
        break
      default:
        break
    }
  }

  return <FilterContainer filtres={data} onFilterChange={handleFilterChange} />
}

// ts-prune-ignore-next
export default FilterOption
